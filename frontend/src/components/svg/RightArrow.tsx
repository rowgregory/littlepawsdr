import { Link } from 'react-router-dom';

const RightArrow = ({ text, url }: any) => {
  return (
    <Link to={url} className='cursor-pointer flex hover:no-underline group duration-200'>
      <p className='mr-2 text-sm font-Matter-Light group-hover:text-teal-500 duration-200 group-hover:tracking-wider'>{text}</p>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 476.213 476.213'
        className='flex'
        width='20px'
        height='20px'
      >
        <polygon
          className='fill-gray-600 group-hover:fill-teal-500 duration-200'
          points='476.213,238.105 400,161.893 400,223.106 0,223.106 0,253.106 400,253.106 400,314.32 '
        />
      </svg>
    </Link>
  );
};

export default RightArrow;
