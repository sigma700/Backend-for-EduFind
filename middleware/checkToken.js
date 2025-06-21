//middleware for checking if the user is logged in so that they can be able to access certain routes

export const checkIsLogged = async (req, res, next) => {
  //next means it runs the next function
  const { token } = req.cookies.token;
};
