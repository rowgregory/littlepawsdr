import { Link } from 'react-router-dom';
import { localizeDate } from '../../utils/localizeDate';
import NoBlogs from '../../components/svg/NoBlogs';
import BlogHigh from '../../components/assets/blog-high.jpg';
import BlogLow from '../../components/assets/blog-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { useGetBlogsQuery } from '../../redux/services/blogApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';

export const reduceArticleLengthIfTooBig = (article: string) => {
  const articleCharLength = article.replace(/[^a-zA-Z]/g, '').length;
  if (articleCharLength > 300) return `${article.substring(0, 400)}... read more`;
  return `${article}... read more`;
};

const Blog = () => {
  const { data, isLoading } = useGetBlogsQuery();
  const blogs = data?.blogs;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <>
      <Hero
        low={BlogLow}
        high={BlogHigh}
        title='Blog'
        link={`https://pixabay.com/users/marlyneart-15261801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4977599`}
        photographer='Martine Auvray'
      />
      <div className='max-w-screen-lg w-full mx-auto px-16'>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Events' url2='/events' />
          <RightArrow text='Education Tips' url='/education' />
        </div>
        <p className='mb-12 mt-14 text-3xl font-Matter-Medium text-center'>
          Little Paws blog with the latest updates
        </p>
      </div>
      <div className='max-w-screen-md w-full mx-auto pb-16'>
        {blogs?.length === 0 || blogs === undefined ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-4'>
              <NoBlogs color='#ccc' />
            </div>
            <p className='font-Matter-Regular'>
              Sorry, no blogs available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          blogs?.map((blog: any, i: number) => (
            <Link
              className='cursor-pointer relative duration-200 hover:no-underline'
              to={`/about/blog/${blog?._id}`}
              key={i}
            >
              <div className='flex mb-6 duration-200 bg-[#fff p-3]'>
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
          ))
        )}
      </div>
    </>
  );
};

export default Blog;
