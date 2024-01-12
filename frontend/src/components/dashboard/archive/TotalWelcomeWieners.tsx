import { Flex } from '../../styles/Styles'
import styled, { keyframes } from 'styled-components';
import { Image } from 'react-bootstrap';
import PointsPowerUp from '../../../components/assets/points_powerup_lifes_04.png';
import { FC } from 'react';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const WelcomeWienersReceivedImage = styled(Image)`
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  animation: ${rotate} 5000ms linear infinite;
  @media screen and (min-width: 500px) {
    max-height: 600px;
    max-width: 600px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 650px;
    max-height: 650px;
  }
`;

const TotalWelcomeWienerText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 16px;
  top: 52px;
  left: -104px;
  text-align: center;
  max-width: 361px;
  @media screen and (min-width: 500px) {
    top: 29px;
    left: -179px;
    font-size: 25px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: 35px;
    left: -178px;
    font-size: 40px;
  }
`;
const TotalWelcomeWienerAmountText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  font-size: 40px;
  position: absolute;
  width: max-content;
  font-size: 100px;
  top: -130px;
  left: -44px;
  @media screen and (min-width: 500px) {
    top: -120px;
    left: -33px;
    font-size: 70px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    top: -181px;
    left: -51px;
    font-size: 111px;
  }
`;

interface TotalWelcomeWienerProps {
  data: {
    welcomeWienerYearlyTotal: {
      productTotalQuantity: number;
    };
  };
}

const TotalWelcomeWieners: FC<TotalWelcomeWienerProps> = ({ data }) => {
  return (
    <Flex
      position='relative'
      justifyContent='center'
      alignItems='center'
      marginBottom='384px' width='100%'
    >
      <WelcomeWienersReceivedImage
        src={PointsPowerUp}
        alt='control-fuel-icon'
        width='100%'
      />
      <Flex position='absolute'>
        <TotalWelcomeWienerAmountText>
          {data?.welcomeWienerYearlyTotal?.productTotalQuantity}
        </TotalWelcomeWienerAmountText>
        <TotalWelcomeWienerText>
          Welcome Wieners Received
        </TotalWelcomeWienerText>
      </Flex>
    </Flex>
  )
}

export default TotalWelcomeWieners