import { useEffect } from 'react';

export const useOutsideDetect = (
  ref: any,
  setActiveMenu: any,
  setIsVisible?: any,
  type?: string
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        if (type === 'USER_DROP_DOWN') {
          setActiveMenu('main');
          setIsVisible && setIsVisible(false);
        } else {
          setActiveMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [ref, setActiveMenu, setIsVisible, type]);
};
