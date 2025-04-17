import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import Logo from '../common/Logo';
import { topHeaderLinks } from '../data/navbar-data';
import TopHeaderInfoBox from './TopHeaderInfoBox';
import { useLocation, useNavigate } from 'react-router-dom';

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const { cartItemsAmount } = useAppSelector((state: RootState) => state.cart);
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);

  return (
    <div className='w-full bg-[#1a1f28] px-3'>
      <div
        className={`max-w-screen-2xl relative mx-auto w-full pt-1 lg:pt-4 pb-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between ${
          shouldExclude ? 'hidden' : 'block'
        }`}
      >
        <Logo className='w-40 md:w-28 lg:w-32 lg:-ml-3 mb-3.5 lg:mb-0' />
        <div className='hidden md:flex items-center md:mb-3 lg:mb-0 gap-x-12'>
          {topHeaderLinks(auth, dispatch, navigate, cartItemsAmount).map((obj, i) => (
            <TopHeaderInfoBox key={i} obj={obj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
