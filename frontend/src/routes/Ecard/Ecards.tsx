import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { pastelColorRandomizer } from '../../utils/pastelColorRandomizer';
import { useGetEcardCategoriesQuery } from '../../redux/services/ecardApi';
import { Link } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useEffect, useState } from 'react';

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
    <div className='w-full p-[16px] md:p-6 '>
      <div className='w-full max-w-5xl mx-auto'>
        <div className='w-full mt-20 mb-12 flex justify-center items-center bg-gray-100 rounded-lg p-[16px] md:p-6'>
          <div className='max-w-'>
            <p className='text-balance text-gray-800 text-2xl text-center md:text-3xl mb-3.5'>
              Share ecard happiness, aid dachshunds in need
            </p>
            <p className='text-center font-Matter-Light'>
              Browse Little Paws Dachshund Rescue's full collection of online ecards. Select and
              customize the perfect one to easily send to all of your friends and family via email.
            </p>
          </div>
        </div>
        <div className='w-full mx-auto'>
          <div className='w-100 d-flex justify-content-between mt-3 mb-5'>
            <LeftArrow text='Home' url='/' text2='Merch' url2='/merch' />
            <RightArrow text='Welcome Wieners' url='/welcome-wieners' />
          </div>
          <h3 className='text-3xl mb-6 text-gray-700 font-Matter-Medium'>Choose an occasion</h3>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-6'>
            {categories?.map((category: any, i: number) => (
              <Link
                className='col-span-1 w-full h-24 lg:h-60 p-6 flex items-center justify-center flex-col cursor-pointer text-2xl font-Matter-Medium duration-200 hover:brightness-95 hover:no-underline hover:text-gray-800 text-gray-800'
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
    </div>
  );
};

export default Ecards;
