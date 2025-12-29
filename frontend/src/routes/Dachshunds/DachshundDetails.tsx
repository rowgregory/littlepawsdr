import BottomInfo from '../../components/dachshund/BottomInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { NoImgDog } from '../../components/assets';
import { dachshundDetailsGridData } from '../../utils/dachchsundDetailsGridData';
import { Link } from 'react-router-dom';
import { useGetDachshundByIdQuery } from '../../redux/services/rescueGroupsApi';
import useSingleItemCarousel from '../../hooks/useSingleItemCarousel';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import SingleItemCarousel from '../../components/common/SingleItemCarousel';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const DachshundDetails = () => {
  const { id } = useParams() as any;
  const navigate = useNavigate();

  const { isLoading } = useGetDachshundByIdQuery(id, { refetchOnMountOrArgChange: true });
  const { dachshund, dogStatusId } = useAppSelector((state: RootState) => state.dachshund);

  const { next, previous, currentIndex, totalItems, setCurrentIndex } = useSingleItemCarousel(
    dachshund?.attributes.photos || []
  );

  if (isLoading) {
    return (
      <div className='w-full my-20 flex justify-center'>
        <div className='dot-spinner'></div>
      </div>
    );
  }

  return (
    <div className='max-w-screen-lg w-full mx-auto my-32 px-4'>
      <button onClick={() => navigate(-1)} className='font-QBook flex items-center gap-x-2 mb-3'>
        <ChevronLeft className='text-teal-400 w-4 h-4' />
        Back
      </button>

      <section className='relative h-full flex items-center justify-center mb-16'>
        <div
          onClick={previous}
          className='absolute z-10 left-4 md:-left-10 top-1/2 cursor-pointer transform -translate-y-1/2 flex items-center justify-center bg-white/60 rounded-xl w-10 h-10'
        >
          <ChevronLeft className='text-teal-400' />
        </div>
        <SingleItemCarousel
          items={dachshund?.attributes.photos || [NoImgDog]}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          totalItems={totalItems}
        />
        <div
          onClick={next}
          className='absolute z-10 right-4 md:-right-10 top-1/2 cursor-pointer transform -translate-y-1/2 flex items-center justify-center bg-white/60 rounded-xl w-10 h-10'
        >
          <ChevronRight className='text-teal-400' />
        </div>
      </section>
      <section className='flex flex-col sm:flex-row gap-12 max-w-screen-md mx-auto mb-16'>
        <div>
          <div className='border-[1px] border-gray-200 rounded-md w-10 h-10 flex items-center justify-center'>
            <Heart className='w-3 h-3 text-teal-400' />
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex md:items-center flex-col md:flex-row md:justify-between mb-8'>
            <h1 className='text-4xl text-charcoal font-QBold mb-3 md:mb-0'>
              {dachshund?.attributes?.name}
            </h1>
            {dogStatusId === '1' && (
              <Link
                className='text-white font-QBook w-fit bg-teal-400 rounded-md py-3 px-7 duration-300 cursor-pointer hover:bg-teal-500'
                to='/adopt'
                type='button'
              >
                Adopt
              </Link>
            )}
          </div>
          <div className='grid grid-cols-3 md:grid-cols-4 gap-6'>
            {dachshundDetailsGridData(dachshund?.attributes).map((obj: any, i: number) => (
              <div className='flex flex-col' key={i}>
                <p className='text-sm font-QLight mb-1'>{obj.title}</p>
                <p className='text-sm font-QBook'>{obj.textKey}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='max-w-screen-md mx-auto w-full'>
        <h1 className='text-2xl text-charcoal font-QBold mb-5'>
          {dachshund?.attributes?.ageGroup} {dachshund?.attributes?.sex}{' '}
          {dachshund?.attributes?.breedString}
        </h1>
        <p
          className='font-QLight'
          dangerouslySetInnerHTML={{
            __html: dachshund?.attributes?.descriptionHtml || '',
          }}
        ></p>
      </section>
      <section className='max-w-screen-md mx-auto w-full'>
        <h1 className='text-charcoal font-QBold text-2xl mb-5'>
          Adoption Fees, Transportation, and Health Certificate Costs
        </h1>
        <BottomInfo />
      </section>
    </div>
  );
};

export default DachshundDetails;
