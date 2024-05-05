import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const CardTheme = styled(Form.Check) <{ selected?: boolean }>`
  border: ${({ selected, theme }) => (selected ? `3px solid ${theme.colors.secondary}` : '3px solid transparent')};
  padding: 0.2rem;
  margin-right: 0;
  :hover {
    border: 3px solid ${({ theme }) => theme.colors.secondary};
  }
`;


export const slideright = keyframes`
0% {  transform: translateX(0px)}
100% {  transform: translateX(-10px) }
`;

export const StyledGoBackLink = styled.div`
display: flex;
align-items: center;
font-size: 14px;
padding-top: 16px;
padding-bottom: 8px;
a {
  color: #121212;
}
:hover {
  i {
    text-decoration: none;
    animation: ${slideright} 200ms ease-out forwards;
  }
}
`

export const GoBackLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <StyledGoBackLink>
      <i className='fa-solid fa-angles-left mr-2'></i>
      <Link to={to}>{text}</Link>
    </StyledGoBackLink>
  );
};