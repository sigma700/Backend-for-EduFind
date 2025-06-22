//middleware for checking if the user is logged in so that they can be able to access certain routes

//Point blank if the user is logged in then it means that the cookie exists ..
//what is being done here is that we check the token from the cookie and verify it .
//Next we just take the decoded or verified token and associate it with the userId which we later send to the requset body so that we can use
//the get method whike making the request.
//when all this is done we create the middleware so that the check can be done before we can proceed to any other routes

import jwt from "jsonwebtoken";
export const checkIsLogged = async (req, res, next) => {
  //next means it runs the next function
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Are you logged in ?",
    });
  }

  //now we have to decode the actual token coming from our cookies

  try {
    const decoded = jwt.verify(token, process.env.WEBTOKEN);

    //CHECKK IF IT WAS NOT DECODED\
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "The json web token could not be decoded !",
      });
    }

    console.log(decoded);
    //after decoding the toke now we need to strore it into the userId in the request so that we can get them back
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unable to autholrize the user !",
    });
  }
};
