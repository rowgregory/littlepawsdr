import jwt from 'jsonwebtoken';

export const generateToken = (user, expiresIn) =>
  jwt.sign(
    user ? { id: user.id, name: user?.name, email: user?.email } : {},
    process.env.JWT_SECRET,
    { expiresIn }
  );
