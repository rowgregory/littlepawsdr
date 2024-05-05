import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RainbowHigh from '../../components/assets/rainbow-high.jpeg';
import { RootState } from '../../redux/toolkitStore';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { Link } from 'react-router-dom';
import { NoImgDog } from '../../components/assets';

const RainbowBridge = () => {
  const [displayCount, setDisplayCount] = useState(50);
  const [text, setText] = useState('');
  const dachshund = useSelector((state: RootState) => state.dachshund);

  const [getDachshunds, { isLoading }] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  useEffect(() => {
    getDachshunds({ status: 'Passed Away' });
  }, [getDachshunds]);


  const loadMore = () => {
    setDisplayCount(displayCount + 50);
  };

  const filteredDachshunds = dachshund?.dachshunds?.filter((dachshund: any) =>
    dachshund?.attributes?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const displayedData = filteredDachshunds?.slice(0, displayCount);

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='mt-[65px] max-w-[2000px] mx-auto'>
      <div
        style={{ backgroundImage: `url(${RainbowHigh})` }}
        className='h-48 md:h-80 xl:h-[430px] bg-cover bg-no-repeat flex items-center px-16 object-contain mx-auto'
      >
        <h1 className='text-4xl md:text-6xl font-Matter-Medium text-[#fff]'>Rainbow Bridge</h1>
      </div>
      <div className='w-full h-1.5 bg-teal-500'></div>
      <p className='z-10 font-Matter-Light text-[10px] text-right mt-[-20px] text-[#fff] mix-blend-difference'>
        Photo by Hannes Netzell
      </p>
      <div className='max-w-screen-xl w-full mx-auto mb-20 px-3'>
        <div className='w-full max-w-screen-md'>
          <p className='text-4xl mt-24 font-Matter-Medium mb-3 mx-auto'>
            The Little Paws family cherishes each and every dog that joins our rescue.
          </p>
          <p className='mb-3 mt-2 text-lg font-Matter-Light text-balance w-full md:w-2/3'>
            We find comfort that they were all loved and well cared for in their foster and forever
            homes. We will miss you forever, and see you at the rainbow bridge. 🌈
          </p>
        </div>
        <div className='w-full max-w-md flex items-center font-Matter-Light border border-grey-200 rounded-lg bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-lg ml-2'
            placeholder='Search'
          />
        </div>
        <div className='border-[1px] border-gray-100 rounded-lg p-[16px] sm:p-5 sm:px-4 bg-gray-50 mt-10'>
          <div className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {displayedData?.map((dachshund: any) => (
              <Link
                to={`/about/type/${dachshund.id}`}
                key={dachshund.id}
                className='rounded-lg flex flex-col justify-center h-full relative hover:no-underline'
              >
                <img
                  className='object-cover w-full aspect-square rounded-tl-lg rounded-tr-lg'
                  src={dachshund?.attributes?.photos[0] ?? NoImgDog}
                  alt='successful-adoption'

                />
                <div className='rounded-br-lg rounded-bl-lg bg-teal-500 text-[#fff] mx-auto w-full p-1 text-center flex justify-center flex-col'>
                  <p className='text-lg font-Matter-Medium text-[#fff]'>
                    {dachshund?.attributes?.name?.split('(')[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {displayCount < dachshund?.dachshunds?.length && (
          <button
            className='w-full border-[1px] border-teal-400 rounded mt-6 py-2 font-Matter-Medium text-teal-500 duration-200 hover:bg-teal-500 hover:text-[#fff]'
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default RainbowBridge;
