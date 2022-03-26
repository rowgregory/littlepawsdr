import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BannerImg from '../../components/assets/home_dog_11.jpeg';
import { Image } from 'react-bootstrap';

const BannerLink = styled(Link)`
  color: ${({ theme }) => theme.inverseText};
  background: ${({ theme }) => theme.inverse};
  border-radius: 30px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Duru Sans';
  cursor: pointer;
  transition: 300ms;
  text-decoration: none;
  width: fit-content;
  &.donate {
    margin-right: 0.5rem;
  }
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

const BannerImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    max-height: 45rem;
    min-height: 39rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`;

const Banner = () => {
  return (
    <>
      <BannerImage src={BannerImg} alt='Little Paws Dachshund Rescue' />
      <BtnContainer>
        <BannerLink
          to={{ pathname: '/donate', state: '100' }}
          className='donate'
        >
          Donate
        </BannerLink>
        <BannerLink to='/about/sanctuary' className='sponsor'>
          Sponsor A Sanctuary
        </BannerLink>
      </BtnContainer>
    </>
  );
};

export default Banner;
