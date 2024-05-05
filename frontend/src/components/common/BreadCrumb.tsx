import { Link } from 'react-router-dom';

export const HomeBreadCrumb = () => {
  return (
    <div className='flex items-center my-3 max-w-[1340px] w-full px-[20px] mx-auto md:px-[24px] lg:px-8'>
      <Link to='/'>
        <i className='fa-solid fa-home text-teal-500'></i>
      </Link>
    </div>
  );
};

const BreadCrumb = ({ link, text }: any) => (
  <div className='flex items-center my-3 max-w-[1340px] w-full px-[20px] mx-auto md:px-[24px] lg:px-8'>
    <Link to='/'>
      <i className='fa-solid fa-home text-teal-500'></i>
    </Link>
    <p className='mx-1'>/</p>
    <Link to={link} className='duration-200 hover:no-underline hover:text-teal-500'>
      {text}
    </Link>
  </div>
);

export default BreadCrumb;
