import mongoose from "mongoose";
import user from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token AFTER user created
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ data: newUser, token });

  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong..");
  }
};


// LOGIN
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ data: existingUser, token });

  } catch (error) {
    res.status(500).json("something went wrong..");
  }
};


// GET ALL USERS
export const getallusers = async (req, res) => {
  try {
    const alluser = await user.find();
    res.status(200).json({ data: alluser });
  } catch (error) {
    res.status(500).json("something went wrong..");
  }
};


// UPDATE PROFILE
export const updateprofile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body.editForm;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "User unavailable" });
  }

  try {
    const updatedProfile = await user.findByIdAndUpdate(
      _id,
      { $set: { name, about, tags } },
      { new: true }
    );

    res.status(200).json({ data: updatedProfile });

  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong..");
  }
};

//transfer points

export const transferPoints = async (req, res) => {
  try {

    const { senderId, receiverId, amount } = req.body;

    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot transfer points to yourself",
      });
    }

    const sender = await user.findById(senderId);
    const receiver = await user.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (sender.points <= 10) {
      return res.status(400).json({
        message: "You must have more than 10 points to transfer",
      });
    }

    if (sender.points < amount) {
      return res.status(400).json({
        message: "Not enough points",
      });
    }

    // deduct from sender
    sender.points -= amount;

    // add to receiver
    receiver.points += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: "Points transferred successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};