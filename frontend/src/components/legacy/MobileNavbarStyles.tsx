import { Button, Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

export const MobileNav = styled(Navbar)`
  display: block;
  background-color: ${({ theme }) => theme.header.bg};
`;

export const MenuWrap = styled.div`
  position: absolute;
  top: 7px;
  right: 0;
  z-index: 20 !important;
  display: block;
`;
export const Toggler = styled.input<{ hasClickedHamburger: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0;
  :checked + .hamburger {
    div {
      transform: rotate(135deg);
      :before,
      :after {
        top: 0;
        transform: rotate(90deg);
      }
    }
  }
  :checked {
    :hover + .hamburger {
      div {
        transform: rotate(225deg);
      }
    }
  }
  :checked ~ .menu {
    visibility: ${({ hasClickedHamburger }) =>
      hasClickedHamburger ? 'visible' : 'hidden'};
  }
  :checked ~ .menu {
    div {
      transform: scale(1);
      transition-duration: var(--menu-speed);
    }
  }
  :checked ~ .menu {
    div {
      div {
        opacity: 1;
        transition: opacity 0.4s ease;
      }
    }
  }
`;
export const Hamburger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 60px;
  height: 60px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.header.donationBG};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    :before,
    :after {
      content: '';
      position: absolute;
      z-index: 1;
      top: -10px;
      width: 100%;
      height: 2px;
      background: inherit;
    }
    :after {
      top: 10px;
    }
  }
`;

export const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background: var(--overlay-color);
    border-radius: 50%;
    width: 240vw;
    height: 240vw;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    transform: scale(0);
    transition: all 0.4s ease;
    div {
      width: 100%;
      opacity: 1;
      transition: opacity 0.4s ease;
      ul {
        margin-bottom: 0;
        position: absolute;
        padding: 4rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        div {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 2rem 0 0;
          height: fit-content;
          div {
            padding: 0;
            margin: auto 0;
          }
        }
      }
    }
  }
`;

export const UserAvatar = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledLink = styled(Link)<{ active?: any }>`
  margin-left: 1rem;
  color: ${({ active }) => (active === 'true' ? '#22c2b7' : '#9a82b1')};
  border-bottom: 1px solid #9a82b1;
  width: calc(100% - 1rem);
  padding: 5px 0;
  text-transform: uppercase;
  font-size: 1rem;
  &.link-Sign {
    // Removes border from sign in link
    border: none !important;
  }
  :hover {
    outline: none !important;
    text-decoration: none !important;
    color: #22c2b7 !important;
  }
`;
export const StyledTitleLink = styled(Link)<{
  active?: any;
  needspadding?: any;
}>`
  color: ${({ active }) => (active === 'true' ? '#22c2b7' : '#9a82b1')};
  border-bottom: 1px solid #9a82b1;
  text-transform: uppercase;
  font-size: 1rem;
  width: 100%;
  padding: ${({ needspadding }) => (needspadding === 'true' ? '5px 0' : '')};
`;

export const MobileAvatarInitials = styled.div`
  width: 100px !important;
  height: 100px !important;
  border-radius: 50% !important;
  background: #9a82b1 !important;
  font-size: 1.85rem;
  color: #fff;
  display: flex;
  align-items: center !important;
`;

export const HeaderRightSide = styled.div`
  width: 203px !important;
  display: flex;
  flex-direction: column;
`;

export const HorizontalRow = styled.hr`
  background: #9a82b1;
  width: 100%;
`;

export const NavbarContainer = styled.div<{ title?: string }>`
  padding-top: ${({ title }) => (title === 'Sign in' ? '0' : '')};
  margin-bottom: ${({ title }) => (title === 'Sign in' ? '5rem' : '')};
`;

export const SignInLink = styled(Link)`
  text-transform: uppercase;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #9a82b1;
  text-align: center;
  padding: 6px 16px;
`;

export const CategoryTitles = styled(Text)`
  text-transform: uppercase;
  color: #fff;
  display: flex;
  justify-content: flex-start !important;
`;

export const LogoutBtn = styled(Button)`
  margin-bottom: 7rem;
  border: 1px solid #9a82b1;
  background: transparent;
  :focus,
  :active,
  :hover {
    background: transparent !important;
  }
`;
