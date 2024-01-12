import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Flex } from '../../styles/Styles';
import MainBtn2 from '../../../components/assets/main_button_2.png';
import { FC } from 'react';

const MainBtn2Image = styled(Image)`
  margin-inline: auto;
  width: 100%;
  max-width: 350px;
  @media screen and (min-width: 500px) {
    max-width: 450px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 750px;
  }
`;
const MostSoldImage = styled(Image)`
  border-radius: 50%;
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1/1;
  position: absolute;
  top: -83px;
  left: -79px;
  max-width: 52px;
  @media screen and (min-width: 500px) {
    top: -111px;
    left: -123px;
    max-width: 73px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -184px;
    left: -248px;
    max-width: 120px;
  }
`;

const BestSellerText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 12px;
  position: absolute;
  top: -97px;
  right: -87px;
  @media screen and (min-width: 500px) {
    top: -128px;
    right: -134px;
    font-size: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 20px;
    top: -211px;
    right: -267px;
  }
`;
const ProductName = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 19px;
  position: absolute;
  width: max-content;
  top: -67px;
  left: 12px;
  @media screen and (min-width: 500px) {
    top: -90px;
    left: 0;
    font-size: 26px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -149px;
    left: -56px;
    font-size: 40px;
  }
`;

const ProductPercentage = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 16px;
  position: absolute;
  width: max-content;
  font-size: 10px;
  top: -18px;
  left: 60px;
  @media screen and (min-width: 500px) {
    top: -27px;
    left: 85px;
    font-size: 12px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -41px;
    left: 218px;
    font-size: 13px;
  }
`;

interface BestSellerProps {
  data: {
    mostSoldItem: {
      productName: string;
      productImage: string;
      percentageCalendarsSold: number;
    };
  };
}

const BestSeller: FC<BestSellerProps> = ({ data }) => {
  return (
    <Flex
      className='mx-auto'
      flexDirection='column'
      position='relative'
      justifyContent='center'
      marginBottom='384px'
    >
      <MainBtn2Image src={MainBtn2} alt='most-sold-item-2023' />
      <Flex maxWidth='130px' className='mx-auto w-100' position='relative'>
        <BestSellerText>Best Seller</BestSellerText>
        <ProductName>{data?.mostSoldItem?.productName}</ProductName>
        <MostSoldImage src={data?.mostSoldItem?.productImage} />
        <ProductPercentage>
          {data?.mostSoldItem?.percentageCalendarsSold}
        </ProductPercentage>
      </Flex>
    </Flex>
  );
};

export default BestSeller;
