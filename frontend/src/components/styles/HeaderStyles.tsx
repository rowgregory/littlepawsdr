import { Button, Image, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AvatarInitialsProps {
  isactive?: string;
  path?: string;
  w?: string;
  h?: string;
}

export const AvatarInitials = styled.div<AvatarInitialsProps>`
  cursor: pointer;
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  background: ${({ theme }) => theme.colors.green04};
  color: #fff;
  border-radius: ${({ w }) => (w === '100px' ? '50px' : '25px')};
  font-size: ${({ w }) => (w === '100px' ? '1.85rem' : '0.75rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ isactive, theme, path }) =>
    isactive === 'true' ||
    path === '/admin' ||
    path === '/my-orders' ||
    path === '/settings'
      ? `2px solid ${theme.header.link.avatarHover}`
      : '2px solid #fff'};
  :hover {
    border: 2px solid ${({ theme }) => theme.header.link.avatarHover};
  }
`;

export const NavLink = styled(Nav.Link)`
  font-size: 1rem;
`;

export const StyledAvatar = styled(Image)<{ isactive?: string; path?: string }>`
  width: 2.8125rem;
  height: 2.8125rem;
  cursor: pointer;
  object-fit: cover;
  border: ${({ isactive, theme, path }) =>
    isactive === 'true' ||
    path === '/admin' ||
    path === '/my-orders' ||
    path === '/settings'
      ? `2px solid ${theme.header.link.avatarHover}`
      : `2px solid ${theme.header.cart}`};
  :hover {
    border: 2px solid ${({ theme }) => theme.header.link.avatarHover};
  }
`;

export const Cart = styled(Link)<{ active?: any }>`
  position: relative;
  cursor: pointer;
  transition: 300ms;
  margin-right: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-right: 1.5rem;
  }
  svg {
    path {
      fill: ${({ active, theme }) =>
        active === 'true'
          ? theme.header.link.hoverText
          : theme.header.link.text};
    }
  }
  :hover {
    svg {
      path {
        fill: ${({ theme }) => theme.header.link.hoverText};
      }
    }
  }
`;

export const Items = styled.span<{ active?: boolean; isMobile?: boolean }>`
  color: ${({ theme }) => theme.white};
  font-size: 1.2rem;
  position: absolute;
  top: -4px;
  left: ${({ isMobile }) => (isMobile ? '' : '23px')};
  right: ${({ isMobile }) => (isMobile ? '79px' : '')};
  z-index: 9;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: ${({ theme, active }) => theme.colors.red};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    top: -14px;
  }
  div {
    position: absolute;
    left: 10.3px;
    top: 2px;

    sup {
      position: absolute;
      top: 7px;
      left: 9px;
    }
  }
`;

export const LoginContainer = styled.div`
  cursor: pointer;
  transition: 300ms;

  svg {
    path {
      fill: ${({ theme }) => theme.header.link.text};
    }
  }
  :hover {
    svg {
      path {
        fill: ${({ theme }) => theme.header.link.hoverText};
      }
    }
  }
`;

export const DropDownLinks = styled(LinkContainer)`
  color: ${({ theme }) => theme.header.link.dropDown.text};
  padding: 0;
  :hover {
    background: none;
    color: ${({ theme }) => theme.header.link.dropDown.text};
    text-decoration: underline;
  }
`;

export const DropdownParagraph = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  &.dogParagraph {
    color: ${({ theme }) => theme.header.link.dropDown.text};
    letter-spacing: 0.05rem;
    line-height: 22px;
    font-family: 'Duru Sans', sans-serif;
    font-size: 0.75rem;
    padding-bottom: 1rem;
    border-bottom: 0.5px solid #ededed;
    .dogEmphasis {
      font-weight: bold;
    }
  }
`;

export const DropDownContainer = styled.div<{ height?: number }>`
  position: absolute;
  z-index: 200;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.header.link.dropDown.bg};
  overflow: hidden;
  transition: height var(--speed) ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  height: ${({ height }) => `${height}px`};
  &.all-other-slides {
    left: 0;
  }
  &.avatar-slide {
    width: 300px;
    top: 62px;
    right: 0rem;
  }
`;

export const HealthCheckListCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 1rem;
  padding: 1.25rem;
  margin-bottom: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-bottom: 2rem;
    margin-top: 0;
  }
`;

export const AvatarHeaderLinks = styled(Link)<{ active: string }>`
  :hover {
    background: ${({ theme }) => theme.colors.secondary};

    text-decoration: none;
    div {
      color: #fff !important;
      svg {
        fill: #fff;
        g {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
`;

export const HeaderLink = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? `0 -10px 0 -5px  #fff inset` : '')};
`;

export const DropdownTitle = styled.div<{ active?: boolean }>`
  font-size: 0.95rem;
  color: ${({ theme, active }) => (active ? '#fff' : '#ebebeb')};
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
`;

export const StyledDropdropParagraphLink = styled(Link)`
  color: ${({ theme }) => theme.header.link.dropDown.text};
  text-decoration: underline;
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const LogoutContainer = styled.div`
  width: 100%;
  height: 60px;
  border-top: 0.25px solid rgba(200, 200, 200, 0.2);
  border-bottom: 0.25px solid rgba(200, 200, 200, 0.2);
`;

export const LogoutBtn = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.header.link.dropDown.text};
  :hover {
    background-color: ${({ theme }) => theme.colors.grey03};
  }
`;
