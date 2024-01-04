import styled from 'styled-components';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { WelcomeText } from '../../../components/styles/DashboardStyles';
import {
  Container,
  SearchBar,
  SearchInput,
  SpinnerContainer,
  TableAndPaginationContainer,
  TableWrapper,
  TopRow,
} from '../../../components/styles/admin/Styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../../actions/orderActions';
import Orders from './Orders';
import ProductOrderList from './ProductOrderList';
import EcardOrderList from './EcardOrderList';
import WelcomeWienerOrderList from './WelcomeWienerOrderList';
import { Spinner } from 'react-bootstrap';
import { useOutsideDetect } from '../../../utils/useOutsideDetect';

const Filter = styled.span`
  cursor: pointer;
  position: relative;
`;

const FilterContainer = styled.div`
  background: #fff;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  div {
    margin-bottom: 8px;
    transition: 300ms;
    padding: 8px 14px;
    border-radius: 8px;
    color: #c8c8c8;
    :hover {
      color: ${({ theme }) => theme.colors.quinary};
      background: #f7f9ff;
    }
  }
`;
const FilterIcon = styled.i`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: #e6edff;
  }
`;

const OrdersLayout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [productType, setProductType] = useState('Orders');
  const [text, setText] = useState('');
  const [revealOrderChoices, setRevealOrderChoices] = useState(false);
  const choicesRef = useRef(null) as any;

  const allOrders = state.orderList.orders;
  const loading = allOrders?.loading;
  const orders = allOrders?.orders;
  const productOrders = allOrders?.productOrders;
  const ecardOrders = allOrders?.ecardOrders;
  const welcomeWienerOrders = allOrders?.welcomeWienerOrders;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  useOutsideDetect(choicesRef, setRevealOrderChoices);

  const filteredOrders = orders?.filter((order: any) => {
    return order?._id?.toLowerCase().includes(text.toLowerCase());
  });

  return (
    <Container>
      {revealOrderChoices && (
        <Filter ref={choicesRef}>
          <FilterContainer>
            <div onClick={() => setProductType('Products')}>Products</div>
            <div onClick={() => setProductType('Ecards')}>Ecards</div>
            <div onClick={() => setProductType('Welcome-Wieners')}>
              Welcome Wieners
            </div>
          </FilterContainer>
        </Filter>
      )}
      <div className='d-flex justify-content-between align-items-center w-100'>
        <div className='d-flex flex-column'>
          <WelcomeText>Orders</WelcomeText>
          <BreadCrumb
            step1='Home'
            step2='Dashboard'
            step3='Orders'
            step4={productType}
            url1='/'
            url2='/admin'
            url3='/admin/orders'
            setProductType={setProductType}
            productType={productType}
          />
        </div>
        <FilterIcon
          style={{ background: revealOrderChoices ? '#e6edff' : '' }}
          onClick={() => setRevealOrderChoices(!revealOrderChoices)}
          className='fas fa-filter'
        ></FilterIcon>
      </div>
      <TopRow className='d-flex align-items-center'>
        <SearchBar>
          <SearchInput
            as='input'
            type='text'
            placeholder='Search by ID'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          />
        </SearchBar>
        {loading && (
          <SpinnerContainer>
            <Spinner animation='border' size='sm' />
          </SpinnerContainer>
        )}
      </TopRow>

      <TableWrapper>
        <TableAndPaginationContainer style={{ justifyContent: 'flex-start' }}>
          {productType === 'Orders' ? (
            <Orders orders={filteredOrders} />
          ) : productType === 'Products' ? (
            <ProductOrderList productOrders={productOrders} text={text} />
          ) : productType === 'Ecards' ? (
            <EcardOrderList ecardOrders={ecardOrders} text={text} />
          ) : (
            <WelcomeWienerOrderList
              welcomeWienerOrders={welcomeWienerOrders}
              text={text}
            />
          )}
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default OrdersLayout;
