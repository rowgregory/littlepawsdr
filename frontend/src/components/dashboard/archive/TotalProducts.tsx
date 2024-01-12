import { Flex } from '../../styles/Styles';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import PointsPowerUp1 from '../../../components/assets/points_powerup_lifes_01.png';
import { FC } from 'react';

const ProductsReceivedImage = styled(Image)`
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  @media screen and (min-width: 500px) {
    max-height: 600px;
    max-width: 600px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 650px;
    max-height: 650px;
  }
`;

const TotalProductText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 16px;
  top: 52px;
  font-size: 14px;
  top: 30px;
  left: -30px;
  @media screen and (min-width: 500px) {
    top: 29px;
    left: -179px;
    font-size: 25px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: 44px;
    left: -146px;
    font-size: 30px;
  }
`;
const TotalProductAmountText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 65px;
  top: -60px;
  left: -179px;
  @media screen and (min-width: 500px) {
    top: -91px;
    left: -265px;
    font-size: 85px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -97px;
    left: -302px;
    font-size: 111px;
  }
`;

interface TotalProductsProps {
  data: {
    productYearlyTotal: {
      productTotalQuantity: number;
    };
  };
}

const TotalProducts: FC<TotalProductsProps> = ({ data }) => {
  return (
    <Flex
      position='relative'
      justifyContent='center'
      alignItems='center'
      marginBottom='384px'
    >
      <ProductsReceivedImage
        src={PointsPowerUp1}
        alt='control-fuel-icon'
        width='100%'
      />
      <Flex position='absolute'>
        <TotalProductAmountText>
          {data?.productYearlyTotal?.productTotalQuantity}
        </TotalProductAmountText>
        <TotalProductText>Products Purchased</TotalProductText>
      </Flex>
    </Flex>
  );
};

export default TotalProducts;
