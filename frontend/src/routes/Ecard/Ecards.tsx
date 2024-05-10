import { useGetEcardsQuery } from '../../redux/services/ecardApi';
import { Link } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment, useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Padded } from '../../components/assets';

const Ecards = () => {
  const { data, isLoading } = useGetEcardsQuery();
  const categories = data?.categories;
  const ecards = data?.ecards;
  const [sliceSize, setSliceSize] = useState(3);
  const [currentCategory, setCurrentCategory] = useState('');

  const filterEcards = ecards?.filter((ecard: any) => {
    return ecard?.category.includes(currentCategory);
  });

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full'>
          <div
            style={{
              backgroundImage: `url(${Padded})`,
            }}
            className='h-48 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              Little Paws Ecards
            </h1>
          </div>
          <div className='grid grid-cols-12 gap-5 w-full mx-auto max-w-screen-xl px-3 mb-12'>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
              <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
                Share ecard happiness, aid dachshunds in need
              </p>
              <p className='mb-3 mt-2 text-lg font-Matter-Light w-full'>
                Browse Little Paws Dachshund Rescue's full collection of online ecards. Select and
                customize the perfect one to easily send to all of your friends and family via
                email.
              </p>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span-3'>
              <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square md:-mt-24 bg-white sticky top-[65px]'>
                <div>
                  <p className='font-Matter-Medium text-2xl mb-4'>Support the Mission</p>
                  <p className='font-Matter-Light text-lg mb-5'>
                    Empower Dachshund Rescue and Create Lasting Change!
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
          <div className='flex flex-wrap w-full mx-auto max-w-screen-xl px-3 gap-1.5'>
            <button
              onClick={() => {
                setCurrentCategory('');
                setSliceSize(ecards?.length);
              }}
              className={`${sliceSize === filterEcards?.length ? 'text-teal-500 border-teal-500' : ''
                } w-fit px-4 py-2 flex items-center justify-center flex-col cursor-pointer text-sm font-Matter-Light duration-200 hover:no-underline hover:text-teal-500 hover:border-teal-500 text-gray-800 text-center border-[1px] border-gray-200 rounded-3xl`}
            >
              View all
            </button>
            {categories?.map((category: any, i: number) => (
              <button
                onClick={() => setCurrentCategory(category)}
                className={`w-fit px-4 py-2 flex items-center justify-center flex-col cursor-pointer text-sm font-Matter-Light duration-200 hover:no-underline hover:text-teal-500 hover:border-teal-500 text-gray-800 text-center border-[1px] border-gray-300 rounded-3xl ${category === currentCategory ? 'text-teal-500 border-teal-500' : ''
                  } `}
                key={i}
              >
                {category}
              </button>
            ))}
            <div className='grid grid-cols-12 gap-7 mt-10'>
              {filterEcards
                ?.slice(0, currentCategory === '' ? sliceSize : filterEcards?.length)
                ?.map((ecard: any, i: number) => (
                  <Link
                    to={`/ecards/personalize/${ecard?._id}`}
                    key={i}
                    className='col-span-6 md:col-span-4 lg:col-span-3 w-full flex flex-col hover:shadow-lg duration-200 cursor-pointer animate-fadeIn relative hover:no-underline'
                  >
                    <p className='absolute flex items-center w-10 h-10 justify-center bg-black/70 rounded-full text-white font-Matter-Medium top-2 right-2 z-10'>
                      ${ecard?.price}
                    </p>
                    <img
                      src={ecard?.image}
                      alt={ecard?.name}
                      className='w-full h-full object-cover'
                    />
                    <p className='font-Matter-Bold px-2 py-2 text-center text-lg'>{ecard?.name}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Ecards;
