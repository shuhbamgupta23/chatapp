import userModal from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModal.findOne({ email });
    console.log(existingUser, "userController");
    if (!existingUser) {
      res.status(404).json({ message: "user do not exist" });
      return;
    }
    let isPasswordCorrect;
    if (password == existingUser.password) {
      isPasswordCorrect = true;
    }
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    res.status(200).json({ result: existingUser });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
      return;
    }
    if (password != confirmPassword) {
      res.status(400).json({ message: "password does not match" });
      return;
    }
    const result = await userModal.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    res.status(200).json({ result: result });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const allUser = async (req, res) => {
  try {
    let alluser = await userModal.find({});
    res.status(200).json({ result: alluser });
  } catch (e) {
    res
      .status(500)
      .json({ message: "something bad happened while fetching all users" });
  }
};

export const getFriend = async (req, res) => {
  let searchName = req.params.searchName;

  try {
    let user = await userModal.findOne({ name: searchName });
    res.status(200).json({ result: user });
  } catch (e) {
    res.status(500).json({ message: "Search friend failed" });
  }
};
