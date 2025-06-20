//function for generating a new verification  token for safety

export const generateToken = () => {
  //make sure to return it
  return Math.floor(100000 + Math.random() * 900000).toString();
};
