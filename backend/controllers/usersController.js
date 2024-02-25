const User = require("../models/User");
const bcrypt = require("bcryptjs");

//-----------Registration-----------
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validate
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please all fields are required");
    }
    //check if email is taken or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already Exists");
    }

    //hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    //add the date the trail will end
    newUser.trialExpires = new Date(
      new Date().getTime() + newUser.trialActive * 24 * 60 * 60 * 1000
    );

    res.json({
      status: true,
      message: "Registration was successfull",
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
//-----------Login------------------
//-----------Logout-----------------
//-----------Profile----------------
//-----------Check user auth status---

module.exports = {
  register,
};
