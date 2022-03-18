import { Button, Form, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const TableHead = styled.thead<{ bg?: string }>`
  tr {
    background: ${({ theme, bg }) => (bg ? bg : theme.colors.tertiary)};
    &.topSellingProducts {
      background: ${({ theme }) => theme.colors.tertiary};
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
  width: 50px;
  height: 50px;
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
  height: 50px;
  width: 50px;
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
