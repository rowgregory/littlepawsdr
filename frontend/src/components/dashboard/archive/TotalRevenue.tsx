import { Flex, Text } from '../../styles/Styles';
import ArmoryItemFrame from '../../../components/assets/armory_item_frame.png';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { FC } from 'react';

const RevenueMenuImage = styled(Image)`
  width: 100%;
  max-width: 350px;
`;

interface TotalRevenueProps {
  data: {
    totalRevenue: number;
  };
}

const TotalRevenue: FC<TotalRevenueProps> = ({ data }) => {
  return (
    <Flex
      className='mx-auto'
      flexDirection='column'
      position='relative'
      justifyContent='center'
      width='100%'
      alignItems='center'
      marginBottom='384px'
    >
      <RevenueMenuImage src={ArmoryItemFrame} alt='most-sold-item-2023' />
      <Flex
        maxWidth='130px'
        className='mx-auto w-100'
        position='relative'
        flexDirection='column'
      >
        <Text
          color='#DFFF00'
          fontSize='70px'
          marginTop='-242px'
          marginLeft='-57px'
          fontFamily={`'Hyperspace-Bold', sans-serif`}
        >
          {data?.totalRevenue}
        </Text>
        <Text
          color='#fff'
          fontSize='18px'
          marginTop='96px'
          marginLeft='-6px'
          fontFamily={`'Hyperspace-Bold', sans-serif`}
          width='max-content'
        >
          Total Revenue
        </Text>
      </Flex>
    </Flex>
  );
};

export default TotalRevenue;
