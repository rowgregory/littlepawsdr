import { Flex, Text } from '../styles/Styles';
import styled from 'styled-components';
import { Button, Spinner } from 'react-bootstrap';
import { addProductToCart, openCartDrawer } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingImg } from '../LoadingImg';

interface DonationItemProps {
  item: {
    _id: string;
    description: string;
    name: string;
    price: number;
    icon: string;
  };
}

const Container = styled.div`
  display: flex;
  padding: 8px;
  margin-bottom: 10px;
  transition: 300ms;
  margin-bottom: 44px;
  border-bottom: 1px solid #ededed;
`;

const DonationItem = ({ item }: DonationItemProps) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state: any) => state.cart.loading);
  const dachshundDetailsLoading = useSelector(
    (state: any) => state.welcomeWienerDachshundDetails.loading
  );

  const dachshund = useSelector(
    (state: any) => state.welcomeWienerDachshundDetails.dachshund
  );

  const addToCartHandler = () => {
    const cartItem = {
      price: item?.price,
      dachshundImage: dachshund?.displayUrl,
      productName: item?.name,
      productId: item?._id,
      quantity: 1,
      dachshundName: dachshund?.name,
      productIcon: item?.icon,
      dachshundId: dachshund?._id,
      from: 'cart',
      isPhysicalProduct: false,
      shippingPrice: 0,
    };
    dispatch(addProductToCart(cartItem));
    dispatch(openCartDrawer(true));
  };

  return (
    <Container>
      {dachshundDetailsLoading ? (
        <LoadingImg w='55px' h='55px' mr='16px' />
      ) : (
        <i
          className={`${item?.icon} fa-2x d-flexjustify-content-center`}
          style={{ width: '55px', height: '55px' }}
        ></i>
      )}
      <Flex flexDirection='column'>
        {dachshundDetailsLoading ? (
          <LoadingImg h='27px' w={item?.name?.length * 15 + 'px'} />
        ) : (
          <Text fontWeight='400' fontSize='18px'>
            {item?.name}
          </Text>
        )}
        {dachshundDetailsLoading ? (
          <div className='mt-2 w-100'>
            <LoadingImg
              w='100%'
              h={(item?.description?.length / 66) * 21 + 'px'}
            />
          </div>
        ) : (
          <Text>{item?.description}</Text>
        )}
        {dachshundDetailsLoading ? (
          <div className='mt-2'>
            <LoadingImg h='33px' w={item?.name?.length * 15 + 'px'} />
          </div>
        ) : (
          <Text
            className='mr-3'
            fontSize='22px'
            fontWeight='500'
            marginTop='12px'
          >
            ${item?.price}
          </Text>
        )}
        <Button
          disabled={dachshundDetailsLoading || cartLoading}
          variant='success'
          className='my-3'
          onClick={() => addToCartHandler()}
        >
          {cartLoading ? <Spinner animation='border' /> : 'Add to cart'}
        </Button>
      </Flex>
    </Container>
  );
};

export default DonationItem;
