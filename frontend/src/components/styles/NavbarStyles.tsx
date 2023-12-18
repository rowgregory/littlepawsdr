import { Image, Tooltip } from 'react-bootstrap';
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
  font-size: ${({ w }) => (w === '75px' ? '24px' : '1rem')};
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

export const FAIcons = styled.div<{
  active?: string;
  open?: boolean;
}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  a,
  div {
    transition: 300ms;
    background: ${({ theme }) => theme.header?.link.avatarbg};
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

  @media screen and (max-width: 300px) {
    &.hide {
      display: none;
    }
  }
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

export const StyledAvatar = styled(Image)<{ isvisible?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  filter: ${({ isvisible }) => (isvisible === 'true' ? 'brightness(1.3)' : '')};
  transition: 300ms;
  :hover {
    filter: brightness(1.3);
  }
`;

interface ItemsProps {
  active?: boolean;
  isMobile?: boolean;
}

export const Items = styled.span<ItemsProps>`
  color: ${({ theme }) => theme.white};
  font-size: 12.8px;
  position: absolute;
  top: -4px;
  left: 26px;
  z-index: 9;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  div {
    position: absolute;
    right: -14px;
    top: 1px;
    width: 50px;
    font-size: 14px;
  }
`;

export const DropDownContainer = styled.div<{ p?: string }>`
  z-index: 500;
  position: absolute;
  top: 65px;
  right: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 500ms ease;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  max-width: 350px;
  width: 100%;
  border-radius: 30px;
  background: #f5f6fc;
`;

export const Container = styled.nav`
  display: flex;
  align-items: center;
  padding-inline: 16px;
`;

export const StyledImage = styled(Image)<{ show: any; p: string }>`
  height: 77px;
  object-fit: cover;
  margin-top: -9px;
  object-fit: cover;
`;
