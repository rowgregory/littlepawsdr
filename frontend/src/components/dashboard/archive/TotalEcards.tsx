import { Flex } from '../../styles/Styles';
import ShipSelectFrame from '../../../components/assets/ship_select_frame.png';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { FC } from 'react';

const EcardsSentImage = styled(Image)`
  width: 100%;
  max-width: 900px;
`;

const TotalEcardText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 16px;
  top: 22px;
  left: -50px;
  @media screen and (min-width: 500px) {
    top: 29px;
    left: -95px;
    font-size: 30px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: 35px;
    left: -116px;
    font-size: 40px;
  }
`;
const TotalEcardAmountText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 50px;
  top: -50px;
  left: -28px;
  @media screen and (min-width: 500px) {
    top: -70px;
    left: -42px;
    font-size: 70px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -106px;
    left: -64px;
    font-size: 111px;
  }
`;

interface TotalEcardsProps {
  data: {
    ecardYearlyTotal: {
      productTotalQuantity: number;
    };
  };
}

const TotalEcards: FC<TotalEcardsProps> = ({ data }) => {
  return (
    <Flex
      position='relative'
      justifyContent='center'
      alignItems='center'
      marginBottom='384px'
    >
      <EcardsSentImage
        src={ShipSelectFrame}
        alt='ship-select-frame'
        width='100%'
      />
      <Flex position='absolute'>
        <TotalEcardAmountText>
          {data?.ecardYearlyTotal?.productTotalQuantity}
        </TotalEcardAmountText>
        <TotalEcardText>Ecards Sent</TotalEcardText>
      </Flex>
    </Flex>
  );
};

export default TotalEcards;
