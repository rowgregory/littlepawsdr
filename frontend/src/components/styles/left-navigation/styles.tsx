import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
  padding-top: 52px;
  min-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  z-index: 6000;
  top: 0;
  background: #33495e;
  transition: 0.4s;
  box-shadow: 29px 0 53px rgb(0 0 0 / 10%);
  left: ${({ open }) => (open ? '0px' : '-110vw')};
  width: ${({ open }) => (open ? '100vw' : '')};

  @media screen and (min-width: 400px) {
    left: ${({ open }) => (open ? '0px' : '-400px')};
    width: ${({ open }) => (open ? '400px' : '')};
    max-width: 400px;
    width: 100%;
  }

  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CloseSideBarBtn = styled.i`
  position: absolute;
  top: 20px;
  right: 10px;
  color: #cbd7db;
  cursor: pointer;
`;

export const SearchBarWrapper = styled.div`
  border-bottom: 0.5px solid #cbd7db;
  display: flex;
  margin-block: 28px;
  margin-inline: 22px;
  align-items: center;
  position: relative;
  i {
    color: #cbd7db;
  }
`;

export const Search = styled.input`
  background: transparent !important;
  height: 45px !important;
  border: none !important;
  color: #cbd7db !important;
  width: 100%;
  caret-color: ${({ theme }) => theme.colors.secondary};
  ::placeholder {
    color: #556a7f;
  }
  :focus {
    outline: none;
  }

  &:focus,
  &:active {
    &:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      box-shadow: 0 0 0px 1000px transparent inset !important;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: #cbd7db;
    }
  }
`;

export const ClearFilterData = styled.i<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  right: 0;
  color: #cbd7db;
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #213242;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  left: -8px;
  top: 7px;
  div {
    color: #748489;
  }
`;

export const ResultsContainer = styled.div<{ showresults: boolean }>`
  display: ${({ showresults }) => (showresults ? 'block' : 'none')};
  padding-inline: 22px;
  padding-top: 12px;
`;

export const ResultCategory = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  color: #f5f5f5;
  margin-bottom: 12px;
  a {
    transition: 300ms;
    color: #cbd7db;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    letter-spacing: 0.025rem;
    width: 100%;
    display: flex;
    align-items: center;
    padding-inline: 22px;
    padding-block: 14px;
    background: #213242;
    margin-bottom: 4px;
    :hover {
      background: #1b2a39;
    }
  }
`;

export const Menu = styled.div`
  list-style: none;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTitle = styled.div<{ highlight?: any }>`
  transition: 300ms;
  color: #cbd7db;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  letter-spacing: 0.1rem;
  display: grid;
  grid-template-columns: 0.25fr 3fr 0.1fr;
  align-items: center;
  text-align: left;
  gap: 8px;
  padding-inline: 22px;
  padding-block: 14px;
  text-transform: uppercase;
  :hover,
  :focus {
    color: #cbd7db;
    text-decoration: none;
    background: #213242;
  }
`;

export const DropDownLinkContainer = styled.div`
  border-top: 4px solid #15222e;
`;

export const LinkContainer = styled.div`
  padding-left: 36px;
  background: #213242;
  display: flex;
  align-items: center;

  :hover {
    background: #1b2a39;
  }
`;

export const StyledLink = styled(Link)<{ highlight: any }>`
  transition: 300ms;
  color: #cbd7db;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  letter-spacing: 0.025rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding-inline: 22px;
  padding-block: 14px;
  :hover,
  :focus {
    color: #cbd7db;
    text-decoration: none;
  }
`;
export const SingleLink = styled(Link)<{ highlight: any }>`
  transition: 300ms;
  color: #cbd7db;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  letter-spacing: 0.1rem;
  display: grid;
  grid-template-columns: 0.25fr 3fr;
  align-items: center;
  text-align: left;
  padding-inline: 22px;
  gap: 8px;
  padding-block: 14px;
  text-transform: uppercase;
  background: ${({ highlight }) => (highlight === 'true' ? '#213242' : '')};
  :hover,
  :focus {
    color: #cbd7db;
    text-decoration: none;
    background: #213242;
  }
`;
