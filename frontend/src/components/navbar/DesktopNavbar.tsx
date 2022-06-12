import React from 'react';
import Logo from '../../components/assets/logo_2.png';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import BurgerXClose from '../svg/BurgerXClose';
import RightSideNavbar from './RightSideNavbar';
import { useSelector } from 'react-redux';
import { Text } from '../styles/Styles';
import { Items, LoginContainer } from '../styles/NavbarStyles';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.header.bg};
  height: 68px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: auto;
  }
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.header.bg};
  margin: 0 auto;
  max-width: 1836px;
  padding: 0 0.25rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0.25rem 0.75rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 48px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  justify-content: flex-start;
  transition: 300ms;
  img {
    objectfit: cover;
    height: 60px;
    filter: brightness(1.3);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: fit-content;
    img {
      margin-left: -10px;
      max-height: 125px;
    }
  }
`;

const DesktopNavbar = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}) => {
  const { pathname: p } = useLocation();
  const cart = useSelector((state: { cart: { cartItems: [] } }) => state.cart);
  const { cartItems } = cart;
  const toggleMenu = () => setOpenMenu(!openMenu);
  const items = cartItems?.reduce((acc: any, item: any) => acc + item.qty, 0);

  return (
    <Container>
      <Wrapper>
        <LogoContainer to='/'>
          <Image
            src={Logo}
            alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
          />
        </LogoContainer>
        <LoginContainer
          open={openMenu}
          className='mobile-cart'
          active={(p.split('/')[1] === 'cart').toString()}
        >
          <Link to='/cart' style={{ width: items > 0 ? '80px' : '' }}>
            {items > 0 ? (
              <Text fontSize='1rem' color='#fff'>
                <span className='mr-1'>CART</span>
                <Items
                  active={p === '/cart'}
                  className='d-flex justify-content-center align-items-center'
                >
                  <div>{items}</div>
                </Items>
              </Text>
            ) : (
              <Text fontSize='1rem' color='#fff'>
                <span>CART</span>
              </Text>
            )}
          </Link>
        </LoginContainer>
        <BurgerXClose open={openMenu} toggle={toggleMenu} />
        <RightSideNavbar />
      </Wrapper>
    </Container>
  );
};

export default DesktopNavbar;
