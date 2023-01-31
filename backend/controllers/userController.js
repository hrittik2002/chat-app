import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateJwtToken } from "../config/generateJwtToken.js";
import { encryptPassword, matchPassword } from "../config/securePassword.js";

/** 
 * Register a new user
 * **/
export const registerUser = asyncHandler(async (req, res) => {
  // extract credentials from request body
  const { name, email, password, pic } = req.body;

  // if name or email or password is missing throw an error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the Fields");
  }

  // if user already exists on our database the throw error
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user object 
  const user = new User({
    name,
    email,
    password : await encryptPassword(password),
    pic,
  });

  // save the user object to the database
  try {
    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateJwtToken(user._id),
    });
  } catch (err) {
    console.log("Failed to create user");
    res.status(400).json(err);
  }
});

/**
 * Login a new user
 */
export const loginUser = asyncHandler(async(req , res) =>{
    // extract credentials from request body
    const { email, password } = req.body;

    // find the user in the database by using email
    const user = await User.findOne({ email });

    // if user exists and entered password is correct the give +ve response
    if(user && (await matchPassword(password , user.password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateJwtToken(user._id),
        });
    }
    else{
        res.status(404);
        throw new Error("Invalid Email or Password")
    }
})