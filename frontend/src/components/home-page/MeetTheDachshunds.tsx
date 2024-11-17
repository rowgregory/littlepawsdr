import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { RootState } from '../../redux/toolkitStore';
import AvailableDachshundCard from '../common/AvailableDachshundCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const MeetTheDachshunds = () => {
  const dachshund = useSelector((state: RootState) => state.dachshund);
  const [getDachshunds] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  useEffect(() => {
    getDachshunds({ status: 'Available' });
  }, [getDachshunds]);

  const subtitleRef = useRef(null) as any;
  const animateSubtitle = useIntersectionObserver(subtitleRef);
  const titleRef = useRef(null) as any;
  const animateTitle = useIntersectionObserver(titleRef);

  return (
    <div className='px-3'>
      <div className='max-w-screen-xl w-full mx-auto mt-32 mb-40'>
        <p
          ref={subtitleRef}
          className={`${
            animateSubtitle ? 'translate-left-left-x' : 'translate-x-[-150px] opacity-0'
          } text-teal-400 text-xl font-QBold mb-5`}
        >
          Meet The Dachshunds
        </p>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-16'>
          <p
            ref={titleRef}
            className={`${
              animateTitle ? 'translate-left-left-x' : 'translate-x-[-150px] opacity-0'
            } text-5xl text-[#484848] font-QBold mb-4 md:mb-0`}
          >
            Patiently Waiting For Adoption
          </p>
          <Link
            to='/dachshunds'
            className='bg-teal-400 text-white font-QBook py-4 px-9 rounded-lg w-fit hover:shadow-lg hover:bg-teal-500 duration-300'
          >
            View All
          </Link>
        </div>
        <div className='grid grid-cols-12 gap-y-12 sm:gap-12'>
          {dachshund?.dachshunds
            ?.map((obj, i) => <AvailableDachshundCard key={i} obj={obj} />)
            .filter((_: any, i: number) => i < 4)}
        </div>
      </div>
    </div>
  );
};

export default MeetTheDachshunds;
