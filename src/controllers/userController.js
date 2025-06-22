//here we will do all the logic for users and also deal with authentication
// import CryptoJS from "crypto-js";
import {
  sendResEmail,
  sendResetSuccess,
  sendVerMail,
  welcoMail,
} from "../../resend/email.js";
import { genJwToken } from "../../utils/genJwToken.js";
import { generateToken } from "../../utils/genToken.js";
import { User } from "../database/models/user.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //or else it just creates a new user

    const hashedPassword = await bcrypt.hash(password, 12); // hashing out the password for the sake of safety using bcrypt
    const verToken = generateToken();
    console.log(verToken);

    //creating a new user into our database in case they do not already exist

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: verToken,

      //   isVerified,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 1000,
    });

    // await User.save();

    //generating a JWT token
    genJwToken(res, newUser._id);
    //sending the verification token using the email
    await sendVerMail(newUser.email, verToken);

    res.status(201).json({
      success: true,
      message: "A new user was successfully created !",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed an error occured when creating the user",
    });
    console.log(error);
  }
};

//email verification function thus is our duty and due mandate to work on and makes sure that ouc code is functyi

export const verifEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const targetUser = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    //actual validation logic goes here

    if (!targetUser) {
      return res.status(400).json({
        success: false,
        message: "Oops failed the code is wrong or expired !",
      });
    }

    targetUser.isVerified = true;
    targetUser.verificationToken = undefined; //let it dissapear after the user is verified
    targetUser.verificationTokenExpiresAt = undefined;

    await targetUser.save(); // this part makes sure that it is chanded in the database
    //sending the user the email if they are verified this will actually have a function tiec into it intsead of having it all in the same page for code cleansing

    await welcoMail(targetUser.email, targetUser.name);

    res.status(200).json({
      success: true,
      message: "Verified user welcome ",
      data: targetUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to verify the user",
    });

    console.log(error);

    throw new Error("Could not get verified  please try again");
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message:
          "It looks like you dont have an account go to the sign in page and create one !",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    //to check if the user is verified as the step before had made it happen
    const isUserVerified = user.isVerified;

    if (!isUserVerified) {
      return res.status(401).json({
        success: false,
        message: "You are not verified !",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to log in ",
    });
    console.log(error);
  }
};
//function to allow the user to logout when they are already logged in !
export const logOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
};

//for forgot password :
//the user has to send their email adress to us so that we can help them reset their password after they click forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User could not be found !");
    }

    //now we will have to create a new reset password token to allow the user to set up the new password

    const resetPasswordToken = nanoid(64); //used nanoid intead of crypto
    user.resetPasswordToken = resetPasswordToken;
    //giving the expiration date to allow it not to last for ever
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordExpriresAt = resetPasswordExpiresAt;

    await user.save();

    //sending the reset email to the user by means of resend just using the same template as that one for the welocme page

    await sendResEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${{ resetPasswordToken }}`
    );
    res.status(200).json({
      success: true,
      message: "The reset email was successfully sent !",
      data: user,
    });

    await user.save();
  } catch (error) {
    console.log("An error occured with sending the email :", error);
    res.status(400).json({
      success: false,
      message: "An error occured the user could not reset the password !",
    });
  }
};

//function for actually creating the new password

export const restPass = async (req, res) => {
  const { token } = req.params; //since we get the token from the url params
  const { password } = req.body;

  try {
    //find the user by their personal resetToken
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpriresAt: { $gt: Date.now() },
    });

    if (!user) {
      console.log("The token might have expired or incorrect !");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token !",
      });
    }
    //hash back the password that they have passed onto us back into the database

    const newHashedPass = await bcrypt.hash(password, 10);

    user.password = newHashedPass;
    user.resetPasswordToken = undefined; //dissapear after all this is done
    user.resetPasswordExpriresAt = undefined;
    //make sure to save the user into the database with the new changed values

    await user.save();

    //send them the success meassage via an email

    await sendResetSuccess(user.email);

    res.status(200).json({
      success: true,
      message: "Password was reset successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not reset the password as requested !",
    });
    console.log(error.message);
  }
};

//this is the one called after the next() function has been called in the middleware function
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User could not be found or may be logged out !",
      });
    }
    res.status(200).json({
      success: true,
      message: "Here is the authenticated user !",
      data: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to authenticate the user !",
    });

    console.log(error.message);
  }
};
