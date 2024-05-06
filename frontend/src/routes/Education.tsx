import { Link } from 'react-router-dom';
import { useGetEducationTipsQuery } from '../redux/services/educationTipApi';
import RightArrow from '../components/svg/RightArrow';
import GreenRotatingTransparentCircle from '../components/Loaders/GreenRotatingTransparentCircle';
import VerticalLogo from '../components/common/VerticalLogo';
import { EscheresqueDark } from '../components/assets';

const Education = () => {
  const { data, isLoading } = useGetEducationTipsQuery();
  const educationTips = data?.educationTips;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
      <VerticalLogo />
      <div className='mx-auto w-full'>
        <div
          style={{
            backgroundImage: `url(${EscheresqueDark})`,
          }}
          className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
        >
          <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
            Education Tips
          </h1>
        </div>
        <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
          <div className='col-span-12 md:col-span-8 lg:col-span-9'>
            <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
              Welcome to our hub of dachshund-related articles, where every wag and whim is
              celebrated!
            </p>
            <p className='mb-3 mt-2 text-lg font-Matter-Light text-balance w-full md:w-2/3'>
              Whether you're a seasoned dachshund enthusiast or a new admirer, there's something for
              everyone to explore and enjoy. Join us on this journey as we celebrate the unique bond
              between humans and their dachshunds, one story at a time.
            </p>
          </div>
          <div className='col-span-12 md:col-span-4 lg:col-span-3'>
            <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white'>
              <div>
                <p className='font-Matter-Medium text-2xl mb-4'>Ignite Change</p>
                <p className='font-Matter-Light text-lg mb-5'>
                  Your Generosity Can Rescue and Restore Hope
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
          {educationTips?.map((obj: any, i: number) => (
            <div
              className='rounded-lg shadow-md col-span-12 sm:col-span-6 md:col-span-4 w-full h-full cursor-pointer group flex justify-between flex-col hover:shadow-lg duration-200 overflow-hidden'
              key={i}
              onClick={() => window.open(obj.externalLink, '_blank')}
            >
              <img
                src={obj.image}
                alt='LPDR Education tip'
                className='object-contain bg-gray-100 aspect-video rounded-tl-lg rounded-tr-lg'
              />
              <div className='px-4 py-3 flex justify-between flex-col h-full relative z-10 overflow-hidden'>
                <p className='font-Matter-Bold uppercase duration-200 group-hover:text-teal-500 group-hover:tracking-wider'>
                  {obj.title}
                </p>
                <RightArrow text='Read' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
