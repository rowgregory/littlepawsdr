import jwt from 'jsonwebtoken';

export const generateToken = (id, expiresIn) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
