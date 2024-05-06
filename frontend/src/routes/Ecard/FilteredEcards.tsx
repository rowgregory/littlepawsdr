import { Link, useParams } from 'react-router-dom';
import { useGetEcardsByCategoryQuery } from '../../redux/services/ecardApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment, useEffect } from 'react';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Padded } from '../../components/assets';
import { scrollToTop } from '../../utils/scrollToTop';
import LeftArrow from '../../components/svg/LeftArrow';

interface FilteredEcardProps {
  _id: string;
  category: string;
  createdAt: string;
  image: string;
  isEcard: boolean;
  name: string;
  price: number;
  updatedAt: string;
}

const FilteredEcards = () => {
  const { category } = useParams();
  const { data, isLoading } = useGetEcardsByCategoryQuery(category);
  const ecards = data?.ecards;

  useEffect(() => {
    scrollToTop();
  }, []);

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
            className='h-48 md:h-60 bg-repeat flex items-center top-[65px] border-b-[7px] bg-teal-300 border-[#9863a8] mb-12'
          >
            <h1 className='max-w-screen-xl w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff] mx-auto'>
              {category}
            </h1>
          </div>
          <div className='w-full mx-auto max-w-screen-xl px-3 pb-8'>
            <LeftArrow text='Ecards' url='/ecards' />
          </div>
          <div className='grid grid-cols-12 gap-7 w-full mx-auto max-w-screen-xl px-3'>
            {ecards?.map((ecard: FilteredEcardProps) => (
              <Link
                to={`/ecards/personalize/${ecard._id}`}
                key={ecard?._id}
                className='col-span-12 md:col-span-4 lg:col-span-3 flex flex-col cursor-pointer'
              >
                <img
                  className='object-cover aspect-video bg-gray-100'
                  src={ecard?.image}
                  alt={ecard?.name}
                />
                <div className='flex justify-between my-2'>
                  <p className='font-Matter-Medium text-teal-500'>
                    <i className='fas fa-camera mr-1'></i> Personalize
                  </p>
                  <p className='font-Matter-Medium text-teal-500'>${ecard?.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FilteredEcards;
