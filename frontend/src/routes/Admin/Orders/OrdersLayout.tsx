import styled from 'styled-components';
import { Container, SearchInput } from '../../../components/styles/admin/Styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../../actions/orderActions';
import Orders from './Orders';
import ProductOrderList from './ProductOrderList';
import EcardOrderList from './EcardOrderList';
import WelcomeWienerOrderList from './WelcomeWienerOrderList';
import { Text } from '../../../components/styles/Styles';
import OrderKey from '../../../components/admin/orders/OrderKey';
import JumpingRumpLoader from '../../../components/Loaders/JumpingRopLoader';

const GridItem = styled.div`
  background: #fff;
  height: 100%;
  padding: 6px 12px;
  display: flex;
  align-items: center;

  &.box-1 {
    grid-area: 1 / 1 / 1 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 1 / 1 / 1;
    }
  }
  &.box-2 {
    grid-area: 2 / 1 / 3 / 1;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 2 / 2 / 2;
    }
  }
  &.box-3 {
    background: linear-gradient(129deg, rgba(167, 216, 47, 1) 66%, rgba(237, 216, 48, 1) 100%);
    grid-area: 3 / 1 / 4 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 3 / 3 / 3;
    }
  }
  &.box-4 {
    grid-area: 4 / 1 / 5 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 2 / 1 / 3 / 3;
    }
  }
  &.box-5 {
    align-items: start;
    padding: 0;
    grid-area: 5 / 1 / 6 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 3 / 1 / 4 / 4;
    }
  }
`;

const Filter = styled.button<{ active: string }>`
  background: #fff;
  box-shadow: ${({ active }) => (active === 'true' ? 'none' : '0px 1px 2px rgba(0, 0, 0, 0.5)')};
  font-family: Rust;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: all 300ms;
  position: relative;
  div {
    z-index: 2;
  }
  &:after {
    content: ${({ active }) => (active === 'true' ? "''" : 'none')};
    position: absolute;
    z-index: 1;
    width: 62px;
    height: 62px;
    right: 0;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    background: linear-gradient(86deg, rgba(183, 217, 43, 1) 66%, rgba(183, 214, 49, 1) 100%);
  }
`;

const FilterBtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 6px;
  width: 100%;
  background: #eaeaea;
  padding: 6px;
  height: 75px;
`;

const FilterBtn = ({ text, icon, active, setProductType, productType }: any) => {
  return (
    <Filter active={active?.toString()} onClick={() => setProductType(productType)}>
      <i className={icon}></i>
      <Text>{text}</Text>
    </Filter>
  );
};

const OrdersLayout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [productType, setProductType] = useState('Orders');
  const [text, setText] = useState('');

  const allOrders = state.orderList.orders;
  const loading = allOrders?.loading;
  const orders = allOrders?.orders;
  const productOrders = allOrders?.productOrders;
  const ecardOrders = allOrders?.ecardOrders;
  const welcomeWienerOrders = allOrders?.welcomeWienerOrders;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const filteredOrders = orders?.filter((order: any) => {
    return order?._id?.toLowerCase().includes(text.toLowerCase());
  });

  return (
    <Container>
      <GridItem className='box-1'>
        <Text fontFamily='Rust' fontSize='24px' textAlign='center' width='100%' color='#fc5b82'>
          Orders
        </Text>
      </GridItem>
      <GridItem className='box-2'>
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by ID'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      </GridItem>
      <GridItem className='box-3 flex-column align-items-start'>
        <Text fontFamily='Rust' fontSize='30px' color='#fff'>
          Filter Orders
        </Text>
        <div style={{ height: 'inherit' }} className='w-100 d-flex align-items-center'>
          <FilterBtnContainer>
            <FilterBtn
              text='Orders'
              icon='fa-solid fa-cube'
              active={productType === 'Orders'}
              setProductType={setProductType}
              productType='Orders'
            />
            <FilterBtn
              text='WW'
              icon='fa-solid fa-dog'
              active={productType === 'Welcome-Wieners'}
              setProductType={setProductType}
              productType='Welcome-Wieners'
            />
            <FilterBtn
              text='Products'
              icon='fa-solid fa-box'
              active={productType === 'Products'}
              setProductType={setProductType}
              productType='Products'
            />
            <FilterBtn
              text='Ecards'
              icon='fas fa-envelope'
              active={productType === 'Ecards'}
              setProductType={setProductType}
              productType='Ecards'
            />
          </FilterBtnContainer>
        </div>
      </GridItem>
      <GridItem className='box-4'>
        <OrderKey />
      </GridItem>
      <GridItem className='box-5'>
        {loading ? (
          <div style={{ minHeight: 'calc(100vh - 480px)' }} className='w-100 d-flex align-items-center'>
            <JumpingRumpLoader color='#e7ff46' />
          </div>
        ) : (
          <>
            {productType === 'Orders' ? (
              <Orders orders={filteredOrders} />
            ) : productType === 'Products' ? (
              <ProductOrderList productOrders={productOrders} text={text} />
            ) : productType === 'Ecards' ? (
              <EcardOrderList ecardOrders={ecardOrders} text={text} />
            ) : (
              <WelcomeWienerOrderList welcomeWienerOrders={welcomeWienerOrders} text={text} />
            )}
          </>
        )}
      </GridItem>
    </Container>
  );
};

export default OrdersLayout;
