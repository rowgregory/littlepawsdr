import LeftArrow from '../../components/svg/LeftArrow';
import { useParams } from 'react-router-dom';
import { useGetBlogQuery } from '../../redux/services/blogApi';
import { Fragment } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetBlogQuery(id);
  const blog = data?.blog;

  return (
    <Fragment>
      <div className='mb-3 bg-slate-100 mt-[65px]'>
        <div className='relative mx-auto'>
          <img className='h-96 object-contain w-full' src={blog?.image} alt='LPDR - blog' />
        </div>
      </div>
      <div className='max-w-screen-md w-full mx-auto px-3 mb-24'>
        <LeftArrow text='Back to blogs' url='/blog' />
        <div className='grid grid-cols-12 gap-5 mt-5'>
          <div className='col-span-12 md:col-span-3 flex flex-col'>
            <img
              className='mb-2 object-cover aspect-square max-h-40'
              src={blog?.user?.avatar}
              alt='blog-author'
            />
            <p className='font-Matter-Light text-xs'>Written by: {blog?.user?.name}</p>
          </div>
          <div className='col-span-12 md:col-span-9 flex flex-col'>
            <p className='text-2xl font-Matter-Medium'>{blog?.title}</p>
            <p className='text-xs italic font-Matter-Light mb-4'>{formatDateWithTimezone(blog?.updatedAt)}</p>
            <p className='font-Matter-Light whitespace-pre-line'>{blog?.article}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetails;
