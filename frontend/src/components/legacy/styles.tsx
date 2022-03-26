import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const Cart = styled(Link)<{ active?: any }>`
  position: relative;
  cursor: pointer;
  transition: 300ms;
  margin-right: 0;
  height: 68px;
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
  background: ${({ theme }) => theme.header.link.bg};
  svg {
    path {
      fill: #fff;
    }
  }
  :hover {
    background: ${({ theme }) => theme.header.link.hoverText};
  }
`;

export const StyledDropdropParagraphLink = styled(Link)`
  color: ${({ theme }) => theme.header.link.dropDown.text};
  text-decoration: underline;
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
