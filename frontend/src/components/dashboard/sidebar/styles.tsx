import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.input.bg};
  padding: 40px 0 20px;
  position: fixed;
  width: 100%;
  max-width: 270px;
  display: flex;
  flex-direction: column;
`;

export const LinkContainer = styled.div<{ active?: string }>`
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 4px;
  align-items: center;
  padding: 8px;
  background: ${({ active, theme }) =>
    active === 'true' ? '#f6f9fe' : theme.bg};
  transition: 300ms;
  div {
    i {
      color: ${({ active, theme }) =>
    active === 'true' ? theme.colors.quinary : '#c4c4c4'};
    }
  }

  :hover {
    background: #f6f9fe;
    text-decoration: none;
  }
`;

export const SideBarLink = styled(Link) <{ active?: string }>`
  font-weight: 300;
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 5fr;
  gap: 4px;
  align-items: center;
  padding: 8px;
  background: ${({ active, theme }) =>
    active === 'true' ? '#f6f9fe' : theme.bg};
  transition: 300ms;
  div {
    &.text {
      font-size: 13px !important;
    }
    i {
      color: ${({ active, theme }) =>
    active === 'true' ? theme.colors.quinary : '#c4c4c4'};
    }
  }

  :hover {
    background: #f6f9fe;
    text-decoration: none;
  }
`;

export const SideBarAccordionBtn = styled.div`
   cursor: pointer;
`;

export const SideBarAccordionLink = styled(Link)`
  font-size: 13px;
  font-weight: 400;
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`;
