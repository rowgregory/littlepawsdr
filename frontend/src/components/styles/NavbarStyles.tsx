import { Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
interface AvatarInitialsProps {
  path?: string;
  w?: string;
  h?: string;
  isvisible?: any;
}

export const AvatarInitials = styled.div<AvatarInitialsProps>`
  text-transform: uppercase;
  cursor: pointer;
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  background: ${({ theme }) => theme.header.link.avatarbg};
  border-radius: 50%;
  font-size: ${({ w }) => (w === '100px' ? '1.85rem' : '1rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  filter: ${({ isvisible }) => (isvisible === 'true' ? 'brightness(1.3)' : '')};
  transition: 300ms;
  :hover {
    filter: brightness(1.3);
  }
  &.settings {
    cursor: auto;
    :hover {
      filter: brightness(1);
    }
  }
`;

export const FAIcons = styled.div<{ active?: string; open?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  a,
  div {
    transition: 300ms;
    background: ${({ theme }) => theme.header.link.avatarbg};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    .fa-user,
    .fa-shopping-cart,
    .fa-bars,
    .fa-dollar {
      font-size: 1rem;
    }

    i {
      color: ${({ theme }) => theme.inverse};
    }
    :hover {
      color: #fff;
      filter: brightness(1.3);
    }
  }
`;

export const LogoutContainer = styled.div`
  width: 100%;
  border-top: ${({ theme }) => `1px solid  ${theme.separator}`};
`;

export const SlyledToolTip = styled(Tooltip)`
  div {
    &.tooltip-inner {
      background-color: ${({ theme }) => theme.header.link.avatarText};
      color: ${({ theme }) => theme.input.bg};
    }
    &.arrow {
      ::before {
        border-bottom-color: ${({ theme }) => theme.header.link.avatarText};
      }
    }
  }
`;
