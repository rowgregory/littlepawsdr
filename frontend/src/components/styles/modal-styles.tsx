import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const Content = styled.div<{ shake?: any }>`
  background: ${({ theme }) => theme.bg};
  padding: 16px;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
`;

export const Header = styled(Modal.Header)`
  background: ${({ theme }) => theme.bg};
  padding: 48px 32px 32px 32px;
  border: 0;
  position: relative;
`;

export const Title = styled(Modal.Title)`
  color: #3b3b3c;
  font-size: 16px;
  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Body = styled(Modal.Body)`
  color: #3b3b3c;
  font-size: 14px;
  padding: 16px 32px 0;
`;

export const Footer = styled(Modal.Footer)`
  color: #3b3b3c;
  padding: 16px;
  border: 0;
`;

export const LeftBtn = styled.button`
  padding: 8px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme }) => theme.colors.quinary};
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  background: transparent;
  :hover {
    transition: 300ms;
    border: 1.5px solid ${({ theme }) => theme.colors.quinary};
    background: ${({ theme }) => theme.colors.quinary};
    color: #fff !important;
    a {
      text-decoration: none;
    }
  }
`;

export const RightBtn = styled.button`
  padding: 8px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.quinary};
  background: ${({ theme }) => theme.colors.quinary};
  color: #fff;
  cursor: pointer;
  transition: 300ms;
  border-radius: 0;
  :hover {
    filter: brightness(0.9);
    border: 1.5px solid ${({ theme }) => theme.colors.quinary};
    color: #fff;
  }
`;