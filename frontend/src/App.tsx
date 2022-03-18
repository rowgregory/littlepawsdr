import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Routes } from './routes';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { themes } from './utils/theme';
import { useDispatch, useSelector } from 'react-redux';

const ScrollToTop = () => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

const App = () => {
  const dispatch = useDispatch();

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
  }, [dispatch, savedUserTheme]);

  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        <Suspense fallback={<></>}>
          <Routes />
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;
