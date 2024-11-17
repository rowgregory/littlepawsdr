import merchAndEcardsCategoriesData from '../data/merch-and-ecards/merch-and-ecards-categories-data';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { setCloseFilterDrawer, setFilterCategory } from '../../redux/features/merchAndEcardSlice';
import { Fragment, useCallback, useRef } from 'react';
import BlackPageOverlay from '../common/BlackPageOverlay';
import useOutsideDetect from '../../hooks/useOutsideDetect';

const FilterDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null);
  const { toggleFilterDrawer, category } = useSelector((state: RootState) => state.merchAndEcards);

  const handleClose = useCallback(() => {
    if (toggleFilterDrawer) {
      dispatch(setCloseFilterDrawer());
    }
  }, [dispatch, toggleFilterDrawer]);

  useOutsideDetect(overlayRef, handleClose);

  const handleFilter = (category: string) => {
    if (category === 'Clear Filter') {
      dispatch(setFilterCategory(''));
    } else {
      dispatch(setFilterCategory(category));
    }
    handleClose();
  };

  return (
    <Fragment>
      <BlackPageOverlay open={toggleFilterDrawer} />
      <div
        ref={overlayRef}
        className={`${
          toggleFilterDrawer
            ? 'left-0 w-screen sm:left-2 sm:w-[380px]'
            : `left-[-135vw] w-screen sm:w-[380px] sm:left-[-380px]`
        } py-6 overflow-y-scroll h-screen sm:h-[calc(100vh-16px)] md:rounded-3xl fixed z-[60] top-0 sm:top-2 bottom:0 sm:bottom-2 bg-white transition-all duration-300 no-scrollbar`}
      >
        <i
          className='fas fa-times text-zinc-700 absolute top-4 right-4 cursor-pointer'
          onClick={handleClose}
        ></i>
        <div className='p-7'>
          <p className='font-Matter-Medium mb-6 text-xl'>Product categories</p>
          <div className='flex flex-col gap-y-2.5'>
            {merchAndEcardsCategoriesData.map((type, i) => (
              <div
                key={i}
                onClick={() => handleFilter(type)}
                className={`${
                  type === category ? 'text-teal-400' : ''
                } hover:text-teal-400 cursor-pointer font-Matter-Regular text-[14px]`}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterDrawer;
