import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTheme = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const savedUserTheme = userInfoLogin?.theme;

  const getSyncMode = () => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = mq.matches;
    return isDarkMode ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(
    savedUserTheme === 'sync'
      ? getSyncMode()
      : savedUserTheme === 'light'
      ? 'light'
      : savedUserTheme === 'dark'
      ? 'dark'
      : getSyncMode()
  );

  useEffect(() => {
    if (savedUserTheme === 'dark') {
      setTheme('dark');
    } else if (savedUserTheme === 'light') {
      setTheme('light');
    } else if (savedUserTheme === 'sync') {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const theme = e.matches ? 'dark' : 'light';
          setTheme(theme);
        });
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (prefersDark) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    } else {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const theme = e.matches ? 'dark' : 'light';
          setTheme(theme);
        });
    }
  }, [savedUserTheme]);

  return 'light';
};

export default useTheme;
