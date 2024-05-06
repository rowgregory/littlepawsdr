import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import { useGetBlogsQuery } from '../../redux/services/blogApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { LightWool } from '../../components/assets';

export const reduceArticleLengthIfTooBig = (article: string) => {
  const articleCharLength = article.replace(/[^a-zA-Z]/g, '').length;
  if (articleCharLength > 300) return `${article.substring(0, 100)}... read more`;
  return `${article}... read more`;
};

const Blog = () => {
  const { data, isLoading } = useGetBlogsQuery();
  const blogs = data?.blogs;

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full'>
          <div
            style={{
              backgroundImage: `url(${LightWool})`,
            }}
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              Little Paws Blog
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                Dive into our blog, where we share heartwarming stories, expert tips, and adorable
                moments celebrating all things dachshunds
              </p>
              <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                Discover our blog, dedicated to dachshunds, offering heartwarming stories, expert
                advice, training insights, health tips, and a celebration of the bond between owners
                and their beloved pets
              </p>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Be a Lifesaver</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Every Donation Counts, Every Dachshund Matters
                  </p>
                </div>
                <Link
                  to='/donate'
                  className='w-full text-center rounded-md text-white bg-[#9863a8] font-Museo-Slab-700 py-3 text-2xl hover:no-underline hover:shadow-lg duration-200'
                >
                  DONATE
                </Link>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-7 w-full mx-auto max-w-screen-xl px-3'>
            {blogs?.map((blog: any, i: number) => (
              <Link
                className='col-span-12 sm:col-span-6 md:col-span-4 cursor-pointer relative duration-200 hover:no-underline'
                to={`/blog/${blog?._id}`}
                key={i}
              >
                <div className='flex mb-6 duration-200 shadow-md p-3'>
                  <img
                    src={blog?.image}
                    alt='Blog'
                    className='object-cover aspect-square max-w-36 w-full h-full'
                  />

                  <div className='pr-2 pb-2 pl-6 w-full'>
                    <p className='italic font-Matter-Light'>{localizeDate(blog?.createdAt)}</p>
                    <h2 className='text-2xl font-Matter-Medium text-teal-500'>{blog?.title}</h2>
                    <p className='mb-3 text-xs'>By {blog?.user?.name}</p>
                    <p className='font-Matter-Regular'>
                      {reduceArticleLengthIfTooBig(blog?.article)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Blog;
