import { Button, Form, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const TableBody = styled.tbody`
  tr {
    cursor: normal;
    :nth-child(odd) {
      background: ${({ theme }) => theme.table.odd};
    }
    :nth-child(even) {
      background: ${({ theme }) => theme.table.even};
    }

    td {
      border: none;
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
      vertical-align: inherit;
      cursor: normal;
      &.dashboard {
        padding: 1.5rem 0.75rem;

        @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
          padding: 1.5rem;
        }
      }
    }
  }
`;

export const TableHead = styled.thead<{ bg?: string }>`
  tr {
    background: ${({ theme, bg }) => (bg ? bg : theme.colors.primary)};
    &.topSellingProducts {
      height: 3.125rem;
      text-indent: 0.75rem;
      @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
        text-indent: 1.5rem;
      }
    }

    th {
      color: ${({ theme }) => theme.white};
      border-bottom: ${({ theme }) => `1px solid ${theme.separator}`};
    }
  }
`;

export const TableRow = styled.tr`
  td {
    border-top: 1px solid ${({ theme }) => theme.separator} !important;
    vertical-align: inherit;
    color: ${({ theme }) => theme.text};
  }
`;

export const TableImg = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  width: 2.875rem;
  height: 2.875rem;
`;

export const SearchBar = styled(Form.Group)`
  width: 20rem;
`;

export const CreateBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  font-family: 'Duru', sans-serif;
  margin-bottom: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  transition: 300ms;
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background: ${({ theme }) => theme.colors.primary};
    filter: brightness(0.8);
  }
  :focus {
    box-shadow: none;
  }
`;

export const StyledEditBtn = styled(Button)`
  background: transparent;
  border-radius: 50%;
  border: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: ${({ theme }) => theme.colors.primary};
  }
  :hover,
  :active,
  :focus {
    background: ${({ theme }) => theme.separator} !important;
    border: none !important;
    box-shadow: none !important;
  }
`;
