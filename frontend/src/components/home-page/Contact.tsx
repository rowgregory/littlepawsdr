import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className='h-fit py-16 bg-[#f2f2ee] relative flex flex-col items-center justify-center'>
      <div className='contact-bg'></div>
      <h1 className='text-3xl text-[#414141] mb-5 font-QBold text-center'>
        Surrender a Dachshund in Need
      </h1>
      <h2 className='text-5xl text-teal-400 mb-5 font-QBold text-center'>
        Let&apos;s Help Dachshunds Together
      </h2>
      <p className='text-[#414141] text-center mb-6 font-QBook max-w-xl'>
        If you&apos;re unable to care for your dachshund, we&apos;re here to help. Little Paws
        Dachshund Rescue offers a safe, loving solution for dachshunds in need, ensuring they find a
        caring home.
      </p>
      <Link
        to='/dachshunds/surrender'
        className='bg-teal-400 text-white py-4 px-9 rounded-lg font-QBold uppercase w-fit relative z-30 hover:shadow-lg hover:bg-teal-500 duration-300'
      >
        Surrender
      </Link>
    </div>
  );
};

export default Contact;
