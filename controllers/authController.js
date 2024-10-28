import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({username, password: hashedPassword});
    res.status(201).json({message: 'User created successfully', user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({where: { username }});

  if (!user) {
    return res.status(400).json({message: 'User not found'});
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({message: 'Invalid Password'});
  }

  const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET,{
    expiresIn: '1h'
  });

  return res.json({message: 'Login success',token});
};

export { register, login };
