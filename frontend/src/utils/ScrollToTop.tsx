import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UpArrow from '../components/svg/UpArrow';

const Container = styled.div<{ show?: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')} !important;
  position: fixed;
  bottom: 50px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.quinary};
  z-index: 500;
  box-shadow: 0px 6px 10px 0px rgb(0 0 0 / 14%),
    0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%);
  cursor: pointer;
  transition: 300ms;
  svg {
    margin: auto;
  }
`;

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const listener = () => {
      const w = window.innerWidth,
        h = window.scrollY;

      if (w > 768 && h > 700) {
        setShow(true);
      } else if (w < 768 && h > 400) {
        setShow(true);
      } else setShow(false);
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <Container show={show} onClick={() => window.scrollTo(0, 0)}>
      <UpArrow />
    </Container>
  );
};

export default ScrollToTop;
