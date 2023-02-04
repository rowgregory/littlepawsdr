import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
  height: 100vh;
  position: fixed;
  z-index: 6000;
  top: 0;
  background: ${({ theme }) => theme.overlay.bg};
  transition: 0.4s;
  box-shadow: 29px 0 53px rgb(0 0 0 / 10%);
`;
export const Menu = styled.div`
  list-style: none;
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 5rem;
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  height: 50px;
  width: 1px;
  background: ${({ theme }) => theme.text};
  margin: 0 30px 0 20px;
`;

export const StyledLink = styled(Link)<{ highlight: any }>`
  transition: 300ms;
  color: ${({ highlight, theme }) =>
    highlight === 'true' ? theme.colors.quinary : theme.text};
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.41rem;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.quinary};
  }
`;
export const StyledTitle = styled.div<{ textcolor?: any }>`
  transition: 300ms;
  color: ${({ textcolor, theme }) =>
    textcolor === 'true' ? theme.colors.quinary : theme.text};
  font-family: 'EB Garamond', serif;
  font-size: 48px;
  margin-left: 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 85px;
    margin-left: 24px;
  }
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.quinary};
  }
`;

export const AccordionWrapper = styled.div`
  padding: 4px;
  margin-top: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 40px 60px;
  }
`;
export const AccordionCollapse = styled(Accordion.Collapse)`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-left: 65px;
  }
`;

export const Circle = styled.div<{ highlight?: any }>`
  background: ${({ theme, highlight }) =>
    highlight === 'true' ? '#9761aa' : '#fff'};
  height: 4px;
  width: 4px;
  border-radius: 50%;
  margin-right: 24px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-right: 16px;
  }
`;

export const LinkContainer = styled.div`
  margin-left: 55px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-left: 0px;
  }
`;
