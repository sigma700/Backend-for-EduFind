import jwt from "jsonwebtoken";

//function for generating the webtoken from JWT

export const genJwToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.WEBTOKEN, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};
