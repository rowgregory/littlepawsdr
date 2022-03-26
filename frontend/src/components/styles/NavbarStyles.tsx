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

export const StyledAvatar = styled(Image)<{ path?: string }>`
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

export const AvatarContainer = styled.div<{ isvisible?: boolean }>`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  background: ${({ isvisible, theme }) =>
    isvisible ? theme.header.link.hoverText : ''};
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

export const LogoutContainer = styled.div`
  width: 100%;
  border-top: ${({ theme }) => `1px solid  ${theme.separator}`};
`;

export const LogoutBtn = styled(Button)`
  margin-top: 0.5rem;
  background: transparent;
  color: #fff;
  border: 1px solid ${({ theme }) => theme.separator};
  :hover {
    background-color: ${({ theme }) => theme.colors.grey03};
  }
`;
