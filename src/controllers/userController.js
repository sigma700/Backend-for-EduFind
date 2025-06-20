//here we will do all the logic for users and also deal with authentication
import CryptoJS from "crypto-js";
import { sendVerMail, welcoMail } from "../../resend/email.js";
import { genJwToken } from "../../utils/genJwToken.js";
import { generateToken } from "../../utils/genToken.js";
import { User } from "../database/models/user.js";
import bcrypt from "bcrypt";

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
    targetUser.verificationToken = undefined;
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

export const logOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
};

//for forgot password :

export const resetPass = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found !",
      });
      console.log("User not found");
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpriresAt = Date.now() + 24 * 60 * 60 * 1000; //it expires after one hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpriresAt = resetPasswordExpriresAt;

    await user.save();
  } catch (error) {}
};
