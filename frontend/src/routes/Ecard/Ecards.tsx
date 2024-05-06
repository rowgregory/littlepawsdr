import { pastelColorRandomizer } from '../../utils/pastelColorRandomizer';
import { useGetEcardCategoriesQuery } from '../../redux/services/ecardApi';
import { Link } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment, useEffect, useState } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Padded } from '../../components/assets';

const Ecards = () => {
  const { data, isLoading } = useGetEcardCategoriesQuery();
  const categories = data?.categories;
  const [categoryColors, setCategoryColors] = useState([]);

  useEffect(() => {
    const colors = categories?.map(() => pastelColorRandomizer());
    setCategoryColors(colors);
  }, [categories]);

  if (isLoading) return <GreenRotatingTransparentCircle />;

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
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8]'
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
          <div className='grid grid-cols-12 md:gap-7 w-full mx-auto max-w-screen-xl px-3'>
            {categories?.map((category: any, i: number) => (
              <Link
                className='col-span-12 md:col-span-3 w-full p-6 flex items-center justify-center flex-col cursor-pointer text-2xl sm:text-xl lg:text-2xl font-Matter-Medium duration-200 md:aspect-square hover:brightness-95 hover:no-underline hover:text-gray-800 text-gray-800'
                to={`/ecards/${category}`}
                key={i}
                style={{ background: categoryColors && categoryColors[i] }}
              >
                {category}
              </Link>
            ))}

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Ecards;
