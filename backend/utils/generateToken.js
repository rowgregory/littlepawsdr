import jwt from 'jsonwebtoken';

export const generateToken = (user, expiresIn) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn }
  );
// export const generateToken = (id, expiresIn) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
