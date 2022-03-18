import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SectionContainer = styled.div`
  margin: 0 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0 48px 96px;
  }
`;

export const SectionTitle = styled.div`
  font-family: 'Ubuntu', sans-serif;
  color: ${({ theme }) => theme.inverse};
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

export const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.inverseText};
  background: ${({ theme }) => theme.inverse};
  border-radius: 30px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Duru Sans';
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  left: 20px;
  transition: 300ms;
  :hover {
    transform: translateY(-3px);
    text-decoration: none;
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  :active {
    transform: translateY(3px);
  }
`;

export const ParallaxContent = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 340px;
  width: 475px;
  bottom: 20px;
  left: 20px;
  border-radius: 12px;

  .support {
    position: absolute;
    bottom: 120px;
    left: 20px;
    font-size: 72px;
    color: #fff;
    font-weight: bold;
    letter-spacing: -3px;
    line-height: 65px;
    font-family: 'Ubuntu', sans-serif;
  }
  .browse {
    position: absolute;
    left: 20px;
    bottom: 75px;
    font-family: 'Ubuntu', sans-serif;
    color: #fff;
  }
  .shop {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: #fff;
    background: #111;
    padding: 0.5rem 1rem;
    border-radius: 30px;
  }
`;
