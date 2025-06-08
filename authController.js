import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { sendEmail } from '../utils/sendEmail.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const token = nanoid(32);

  const newUser = new User({ username, email, password: hash, verificationToken: token });
  await newUser.save();

  await sendEmail(email, token);

  res.status(201).json({ message: "Verification email sent" });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Invalid email" });
  if (!user.isVerified) return res.status(403).json({ message: "Email not verified" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  res.status(200).json({ message: "Login successful", userId: user._id });
};
