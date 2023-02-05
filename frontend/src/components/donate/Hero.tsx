import React from 'react';
import { Image } from 'react-bootstrap';
import DonateDog from '../../components/assets/donate_dog02.jpeg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { Text } from '../../components/styles/Styles';
import { useLocation } from 'react-router-dom';

const Hero = () => {
  const location = useLocation() as any;

  return (
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={DonateDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Donate
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@alonsoreyes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Alonso Reyes
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2={
              location?.pathname === '/donate/shop-to-help'
                ? 'Ecards'
                : location?.pathname === '/donate/venmo'
                ? 'Shop To Help'
                : location?.pathname === '/donate/check'
                ? 'Venmo'
                : location?.pathname === '/donate/long-dog'
                ? 'Check'
                : 'Rainbow Bridge'
            }
            url2={
              location?.pathname === '/donate/shop-to-help'
                ? '/e-cards'
                : location?.pathname === '/donate/venmo'
                ? '/donate/shop-to-help'
                : location?.pathname === '/donate/check'
                ? '/donate/venmo'
                : location?.pathname === '/donate/long-dog'
                ? '/donate/check'
                : '/about/rainbow-bridge'
            }
          />
          <RightArrow
            text={
              location?.pathname === '/donate/shop-to-help'
                ? 'Venmo'
                : location?.pathname === '/donate/venmo'
                ? 'Check'
                : location?.pathname === '/donate/check'
                ? 'Long Dog'
                : location?.pathname === '/donate/long-dog'
                ? 'Adoption Application'
                : 'Ecards'
            }
            url={
              location?.pathname === '/donate/shop-to-help'
                ? '/donate/venmo'
                : location?.pathname === '/donate/venmo'
                ? '/donate/check'
                : location?.pathname === '/donate/check'
                ? '/donate/long-dog'
                : location?.pathname === '/donate/long-dog'
                ? '/adopt/application'
                : '/e-cards'
            }
          />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          className='d-flex justify-content-center'
        >
          Interested in supporting Little Paws Dachshund Rescue?
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Right now, we are in need of monetary donations. Happy endings for our
          dachshunds in need can only happen with your support. Please allow us
          to continue to say “YES WE CAN” to those calls asking for assistance
          with a dachshund left behind at an animal shelter, or a dog who has
          been neglected and abused and deserves a warm bed and a kind hand to
          rub his or her tummy.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          There are two easy ways to give monetary donations, electronically or
          check*:
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          *Little Paws Dachshund Rescue is federal tax exemption 501(c)(3)
          public charity.
        </Text>
      </div>
    </>
  );
};

export default Hero;
