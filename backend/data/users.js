import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Gregory Row',
    email: 'it.little.paws@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isVolunteer: true,
    avatar: '',
    confirmed: true,
  },
];

export default users;
