import { Flex, Text } from '../styles/Styles';
import styled from 'styled-components';
import { addProductToCart, openCartDrawer } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import JumpingRumpLoader from '../Loaders/JumpingRopLoader';

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
  padding: 22px 16px;
  transition: 300ms;
  background: #444;
  margin-inline: auto;
  width: 100%;
`;

const AddToCart = styled.button`
  background: #e7ff46;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: #404434;
  box-shadow: none;
  position: relative;
  display: block;
  transition: 300ms;
  :focus {
    outline: none;
  }
  :hover {
    letter-spacing: 2px;
  }
`;

const DonationItem = ({ item }: DonationItemProps) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state: any) => state.cart.loading);
  const dachshundDetailsLoading = useSelector((state: any) => state.welcomeWienerDachshundDetails.loading);

  const dachshund = useSelector((state: any) => state.welcomeWienerDachshundDetails.dachshund);

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
      <i className={`${item?.icon} fa-2x text-white`}></i>
      <Flex flexDirection='column' justifyContent='space-between' marginLeft='20px'>
        <div>
          <Text fontWeight='400' fontSize='18px' color='#ccc' marginBottom='10px'>
            {item?.name}
          </Text>
          <Text color='#ccc' marginBottom='18px'>
            {item?.description}
          </Text>
        </div>
        <div className='d-flex flex-column justify-self-end'>
          <Text color='#fff' marginBottom='12px' fontSize='30px' fontWeight='500'>
            ${item?.price}
          </Text>
          <AddToCart disabled={dachshundDetailsLoading || cartLoading} onClick={() => addToCartHandler()}>
            {cartLoading ? <JumpingRumpLoader color='#121212' /> : 'Add to Cart'}
          </AddToCart>
        </div>
      </Flex>
    </Container>
  );
};

export default DonationItem;
