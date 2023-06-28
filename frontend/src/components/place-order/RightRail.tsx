import { useEffect } from 'react';
import {
  Accordion,
  CartItem,
  DetailsContainer,
  LeftRailSectionTitle,
  Name,
  RightRailContainer,
} from '../styles/place-order/Styles';
import { Text } from '../styles/Styles';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import addDecimals from '../../utils/addDecimals';

const RightRail = ({ revealItems, setRevealItems }: any) => {
  const state = useSelector((state: any) => state);
  const cart = state?.cart;
  const cartItems = cart?.cartItems;
  const cartItemsAmount = cart?.cartItemsAmount;
  const subtotal = cart?.subtotal;
  const shippingPrice = cart?.shippingPrice;
  const totalPrice = cart?.totalPrice;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setRevealItems(false);
    }
  }, [setRevealItems]);

  return (
    <RightRailContainer lg={4} md={4} sm={12} className='right-rail pb-0'>
      <LeftRailSectionTitle
        className='d-flex justify-content-between align-items-center'
        onClick={() => {
          setRevealItems(!revealItems);
        }}
      >
        <Text fontSize='16px' fontWeight={400}>
          Your Items{' '}
          <i
            className={`fas fa-chevron-down fa-xs`}
            style={{
              transform: `rotate(${revealItems ? '-180deg' : '0deg'})`,
              transition: '300ms',
              color: '#7c7c7c',
            }}
          ></i>
        </Text>
        <Text fontWeight={400}>{addDecimals(totalPrice)}</Text>
      </LeftRailSectionTitle>
      <Accordion
        toggle={revealItems}
        maxheight={`${cartItems?.length * 80 + 165}px`}
      >
        {cartItems?.map((item: any, index: number) => (
          <CartItem key={index}>
            <div className='d-flex'>
              <Image
                src={item?.dachshundImage ?? item?.productImage}
                alt={item?.name}
                width='50px'
                height='50px'
                className='mr-3'
                style={{ objectFit: 'cover' }}
              />

              <div className='d-flex flex-column'>
                <Name>
                  {item?.productName}{' '}
                  {item?.dachshundName && ` for ${item?.dachshundName}`}
                </Name>
                <Text fontSize='11px'>Quantity: {item?.quantity}</Text>
              </div>
            </div>
            <Text fontWeight={600}>
              {addDecimals(item?.quantity * item?.price)}
            </Text>
          </CartItem>
        ))}
        <hr className='my-3' />
        <DetailsContainer>
          <Text className='d-flex align-items-baseline'>
            Subtotal
            <Text fontSize='10px' marginLeft='4px'>
              ({cartItemsAmount} item
              {cartItemsAmount === 1 ? '' : 's'})
            </Text>
          </Text>
          <Text>{addDecimals(subtotal)}</Text>
        </DetailsContainer>
        {state?.cart?.isPhysicalProduct && (
          <DetailsContainer>
            <Text className='d-flex align-items-baseline'>Shipping Price</Text>
            <Text>{addDecimals(shippingPrice)}</Text>
          </DetailsContainer>
        )}
        <hr className='my-3' />
        <DetailsContainer>
          <Text>Order total</Text>
          <Text fontWeight={600} className='pb-4'>
            {addDecimals(totalPrice)}
          </Text>
        </DetailsContainer>
      </Accordion>
    </RightRailContainer>
  );
};

export default RightRail;
