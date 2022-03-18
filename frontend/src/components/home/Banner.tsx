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

const Banner = () => {
  return (
    <>
      <Image
        src={BannerImg}
        width='100%'
        alt='Little Paws Dachshund Rescue'
        style={{
          minHeight: '39rem',
          maxHeight: '45rem',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px',
          }}
        >
          <BannerLink
            to={{ pathname: '/donate', state: '100' }}
            className='donate'
          >
            Donate
          </BannerLink>
          <BannerLink to='/about/sanctuary' className='sponsor'>
            Sponsor A Sanctuary
          </BannerLink>
        </div>
      </div>
    </>
  );
};

export default Banner;
