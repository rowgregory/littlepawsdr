import { Link, useParams } from 'react-router-dom';
import { useGetEcardsByCategoryQuery } from '../../redux/services/ecardApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useEffect } from 'react';

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) return <GreenRotatingTransparentCircle />

  return (
    <div className='my-32 max-w-screen-lg w-full mx-auto px-auto px-[16px] lg:px-0'>
      <Link className='text-xs font-Matter-Light text-blue-800' to='/ecards'>
        See all Ecards
      </Link>
      <h4 className='mt-3 mb-4 font-Matter-Medium text-xl'>{category}</h4>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {data?.ecards?.map((ecard: FilteredEcardProps) => (
          <Link
            to={`/ecards/personalize/${ecard._id}`}
            key={ecard?._id}
            className='col-span-1 flex flex-col cursor-pointer'
          >
            <img
              className='object-cover aspect-[16/11] bg-gray-100'
              src={ecard?.image}
              alt={ecard?.name}
            />
            <div className='flex justify-between my-2'>
              <p className='font-Matter-Medium text-blue-800'>
                <i className='fas fa-camera mr-1'></i> Personalize
              </p>
              <p className='font-Matter-Medium text-blue-800'>${ecard?.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredEcards;
