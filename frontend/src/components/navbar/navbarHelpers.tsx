import { useAppDispatch } from '../../redux/toolkitStore';
import { useEffect } from 'react';
import { toggleBgColor } from '../../redux/features/navbar/navbarSlice';

const useSetShowNavbarBackground = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 25) dispatch(toggleBgColor({ bgColor: true }));
      else dispatch(toggleBgColor(false));
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [dispatch]);
};

const navbarBtnStyles = `bg-gray-300 text-slate-200 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer duration-300 hover:bg-gray-400 hover:no-underline`;

export { useSetShowNavbarBackground, navbarBtnStyles };
