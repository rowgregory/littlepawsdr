import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.input.bg};
  padding: 40px 12px 20px;
`;

export const LinkContainer = styled.div<{ active?: string }>`
  padding: 16px 0 16px 16px;
  background: ${({ active, theme }) =>
    active === 'true' ? '#f9f9f9' : theme.bg};
  transition: 300ms;
  div {
    color: ${({ active, theme }) =>
      active === 'true' ? theme.colors.quinary : '#c4c4c4'};
  }
  svg {
    path {
      fill: ${({ active, theme }) =>
        active === 'true' ? theme.colors.quinary : '#c4c4c4'};
    }
    g {
      path,
      circle {
        fill: ${({ active, theme }) =>
          active === 'true' ? theme.colors.quinary : '#c4c4c4'};
      }
      g {
        path {
          fill: ${({ active, theme }) =>
            active === 'true' ? theme.colors.quinary : '#c4c4c4'};
        }
      }
    }
  }

  :hover {
    background: #f9f9f9;
    div {
      color: ${({ theme }) => theme.colors.quinary};
    }
    svg {
      path {
        fill: ${({ theme }) => theme.colors.quinary};
      }
      g {
        path {
          fill: ${({ theme }) => theme.colors.quinary};
        }
        g {
          path {
            fill: ${({ theme }) => theme.colors.quinary};
          }
        }
      }
    }
  }
`;

export const SideBarLink = styled(Link)<{ active?: string }>`
  font-size: 13px;
  font-weight: 400;
  :hover {
    text-decoration: none;
  }
`;

export const SideBarAccordionBtn = styled.div`
  font-size: 13px;
  font-weight: 400;
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`;
