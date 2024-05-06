import LeftArrow from '../../components/svg/LeftArrow';
import BottomInfo from '../../components/dachshund-details/BottomInfo';
import { useParams } from 'react-router-dom';
import { NoImgDog } from '../../components/assets';
import { Carousel, Image } from 'react-bootstrap';
import { dachshundDetailsGridData } from '../../utils/dachchsundDetailsGridData';
import { Link } from 'react-router-dom';
import { rescueGroupsApi } from '../../redux/services/rescueGroupsApi';
import { useEffect } from 'react';
import { scrollToTop } from '../../utils/scrollToTop';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';

interface Status {
  text: string;
  url: string;
}

const DachshundDetails = () => {
  const { id } = useParams() as any;
  const { useGetDachshundByIdQuery } = rescueGroupsApi;
  const { data, isLoading } = useGetDachshundByIdQuery(id);
  const dachshund = data && data?.data[0];

  useEffect(() => {
    scrollToTop();
  }, []);

  const dogStatusId: string = dachshund?.relationships?.statuses?.data[0]?.id;

  const statusMap: Record<string, Status> = {
    '17': { text: 'dogs on hold', url: '/about/hold' },
    '3': { text: 'successful adoptions', url: '/about/successful-adoptions' },
    '7': { text: 'rainbow bridge', url: '/about/rainbow-bridge' },
    '15': { text: 'sanctuary dogs', url: '/about/sanctuary' },
  };

  const defaultStatus: Status = { text: 'available dogs', url: '/available' };

  const selectedStatus: Status = statusMap[dogStatusId] || defaultStatus;

  const { text: leftArrowText, url: leftArrowUrl } = selectedStatus;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='max-w-screen-lg w-full mx-auto mt-28 px-3.5 lg:px-0'>
      <LeftArrow text={`Back to ${leftArrowText}`} url={leftArrowUrl} />
      <div className='grid grid-cols-12 gap-6 mt-4'>
        <div className='col-span-12 sm:col-span-6 md:col-span-8 w-full'>
          {dachshund?.attributes?.photos?.length === 0 ? (
            <Image
              className='aspect-square max-w-[425px] w-full object-cover'
              src={NoImgDog}
              alt={`Sorry, there currently is no image of ${dachshund?.attributes?.name}`}
            />
          ) : (
            <Carousel
              className='bg-white border-[1px] border-gray-100 rounded-md w-full h-full aspect-sqaure'
              pause='hover'
            >
              {dachshund?.attributes?.photos?.map((photo: string, i: number) => (
                <Carousel.Item key={i} interval={4000}>
                  <Image src={photo} alt={`${photo}-${i}`} className='aspect-square' />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div className='col-span-12 sm:col-span-6 md:col-span-4'>
          <p className='text-3xl font-Matter-Bold'>{dachshund?.attributes?.name}</p>
          <p className='mb-6 font-Matter-Regular'>
            {dachshund?.attributes?.ageGroup} {dachshund?.attributes?.sex}{' '}
            {dachshund?.attributes?.breedString}
          </p>
          {dogStatusId === '1' && (
            <Link
              className='text-[#fff] border-none text-3xl w-full flex justify-center items-center border-[2.5px] bg-teal-400 rounded-md py-2.5 duration-300 cursor-pointer hover:bg-teal-500 hover:text-white hover:no-underline font-Matter-Bold tracking-wider'
              to='/adopt'
              type='button'
            >
              ADOPT
            </Link>
          )}
        </div>
      </div>
      <div className='my-12 w-full h-[0.5px] bg-gray-200'></div>
      <div className='flex flex-col mt-8 mb-ml-16 gap-4 md:gap-12 md:flex-row'>
        <div className='flex flex-col  w-full lg:w-1/2'>
          <p className='font-Matter-Bold text-2xl mb-10'>About {dachshund?.attributes?.name}</p>
          <p
            className='mb-12 font-Matter-Regular'
            dangerouslySetInnerHTML={{
              __html: dachshund?.attributes?.descriptionHtml,
            }}
          ></p>
        </div>
        <div className='flex flex-col w-full lg:w-1/2'>
          <p className='font-Matter-Bold text-2xl mb-10'>Details</p>
          <div className='grid grid-cols-3 gap-6'>
            {dachshundDetailsGridData(data?.data).map((obj: any, i: number) => (
              <div className='d-flex flex-column' key={i}>
                <p className='text-sm font-Matter-Regular'>{obj.title}</p>
                <p className='text-sm font-Matter-Medium'>{obj.textKey}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomInfo />
    </div>
  );
};

export default DachshundDetails;
