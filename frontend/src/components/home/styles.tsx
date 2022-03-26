import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SectionContainer = styled.div`
  margin: 0 12px 100px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0 48px 84px;
  }
`;

export const SectionTitle = styled(Link)`
  font-family: 'Ubuntu', sans-serif;
  color: ${({ theme }) => theme.inverse};
  font-size: 1.5rem;
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
  width: 100%;
  bottom: 20px;
  border-radius: 12px;
  margin: 0 12px 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 20px;
    height: 340px;
    max-width: 475px;
  }

  .support {
    position: absolute;
    bottom: 120px;
    font-size: 2rem;
    line-height: 30px;
    left: 20px;
    color: #fff;
    font-weight: bold;
    letter-spacing: -3px;
    font-family: 'Ubuntu', sans-serif;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      line-height: 65px;
      font-size: 72px;
    }
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
