import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AvatarInitialsProps {
  path?: string;
  w?: string;
  h?: string;
}

export const AvatarInitials = styled.div<AvatarInitialsProps>`
  cursor: pointer;
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  background: ${({ theme }) => theme.colors.senary};
  color: #fff;
  border-radius: ${({ w }) => (w === '100px' ? '50px' : '25px')};
  font-size: ${({ w }) => (w === '100px' ? '1.85rem' : '0.75rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme, path }) =>
    path === '/admin' || path === '/my-orders' || path === '/settings'
      ? `2px solid ${theme.header.link.avatarHover}`
      : '2px solid #fff'};
  :hover {
    border: 2px solid ${({ theme }) => theme.header.link.avatarHover};
  }
`;

export const StyledAvatar = styled(Image)<{ path: string }>`
  width: 2.8125rem;
  height: 2.8125rem;
  cursor: pointer;
  object-fit: cover;
  border: ${({ theme, path }) =>
    path === '/admin' || path === '/my-orders' || path === '/settings'
      ? `2px solid ${theme.header.link.avatarHover}`
      : `2px solid ${theme.header.cart}`};
  margin: 0 0.5rem;

  :hover {
    border: 2px solid ${({ theme }) => theme.header.link.avatarHover};
    background: ${({ theme }) => theme.header.link.avatarHover};
  }
`;

export const AvatarContainer = styled.div<{
  path: string;
  isvisible?: boolean;
}>`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  background: ${({ isvisible, theme, path }) =>
    isvisible || ['admin'].includes(path.split('/')[1])
      ? theme.header.link.hoverText
      : ''};
  box-shadow: ${({ theme, isvisible }) =>
    isvisible ? `0 -10px 0 -5px ${theme.header.link.underline} inset` : ''};
  :hover {
    box-shadow: ${({ theme }) =>
      `0 -10px 0 -5px ${theme.header.link.underline} inset`};
    background: ${({ theme }) => theme.header.link.hoverText};
  }
`;

export const AvatarHeaderLinks = styled(Link)`
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

export const LoginContainer = styled.div<{ active?: string; open?: boolean }>`
  cursor: pointer;
  height: 68px;
  a {
    position: relative;
    height: 100%;
    transition: 300ms;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1rem;
    padding: 0 0.5rem;
    box-shadow: ${({ theme, active }) =>
      active === 'true'
        ? `0 -10px 0 -5px ${theme.header.link.underline} inset`
        : ''};
    background: ${({ theme, active }) =>
      active === 'true' ? theme.header.link.hoverText : ''};
    span {
      color: #fff;
    }
    :hover {
      box-shadow: ${({ theme }) =>
        `0 -10px 0 -5px ${theme.header.link.underline} inset`};
      color: #fff;
      text-decoration: none;
      background: ${({ theme }) => theme.header.link.bg};
    }
  }
  &.mobile-cart {
    display: block;
    margin-right: ${({ open }) => (open ? '54px' : '')};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    &.mobile-cart {
      display: none;
    }
  }
`;

interface ItemsProps {
  active?: boolean;
  isMobile?: boolean;
}

export const Items = styled.span<ItemsProps>`
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  position: absolute;
  top: 22px;
  left: ${({ isMobile }) => (isMobile ? '' : '55px')};
  right: ${({ isMobile }) => (isMobile ? '79px' : '')};
  z-index: 9;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: red !important;
  width: 22.5px;
  height: 22.5px;
  border-radius: 50%;

  div {
    position: absolute;
    right: -14px;
    top: 1px;
    width: 50px;
    font-size: 14px;
  }
`;

export const LogoutContainer = styled.div`
  width: 100%;
  border-top: ${({ theme }) => `1px solid  ${theme.separator}`};
`;

export const LogoutBtn = styled(Button)`
  margin-top: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.inverse};
  border: 1px solid ${({ theme }) => theme.separator};
  :hover {
    background-color: ${({ theme }) => theme.colors.senary};
  }
`;
