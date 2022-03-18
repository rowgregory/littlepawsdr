import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'AdminUser',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isVolunteer: true,
    avatar:
      'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png',
    confirmed: true,
  },
  // {
  //   name: 'Devon Hunt',
  //   email: 'devon@example.com',
  //   password: bcrypt.hashSync('123456', 10),
  //   isAdmin: false,
  //   isVolunteer: false,
  //   avatar:
  //     'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png',
  //   confirmed: true,
  // },
  // {
  //   name: 'Gregory Row',
  //   email: 'row@example.com',
  //   password: bcrypt.hashSync('123456', 10),
  //   isAdmin: true,
  //   isVolunteer: false,
  //   avatar:
  //     'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png',
  //   confirmed: true,
  // },
];

export default users;
