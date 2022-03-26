import { useEffect } from 'react';

export const useOutsideDetect = (
  ref: any,
  setIsVisible: (isVisible: boolean) => void,
  setActiveMenu: (activeMenu: string) => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setIsVisible(false);
        setActiveMenu('main');
      }
    };

    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [ref, setActiveMenu, setIsVisible]);
};
