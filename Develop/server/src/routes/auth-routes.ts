import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log(`🔐 Attempting login for: ${username}`);
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log(`❌ User not found: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`✅ Found user:`, user.username);
    console.log(`🧪 Comparing password with hash:`, user.password);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log(`❌ Password mismatch for: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`✅ Password matched. Generating token...`);

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (err) {
    console.error('🔥 Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;