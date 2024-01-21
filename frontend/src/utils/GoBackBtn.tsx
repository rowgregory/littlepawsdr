import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link) <{ color?: string }>`
  cursor: pointer;
  color: ${({ color }) => (color ? color : '')};
  background: ${({ theme }) => theme.header.link.avatarbg};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  position: relative;
  margin-bottom: 4px;
  :hover {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`;

const GoBackBtn = ({ to, color }: { to: string; color: string }) => {
  return (
    <div className='d-flex flex-column'>
      <StyledLink to={to} color={color}>
        <i className='fa-solid fa-arrow-left-long'></i>
      </StyledLink>
    </div>
  );
};

export default GoBackBtn;
