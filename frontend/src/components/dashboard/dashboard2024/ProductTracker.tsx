import styled, { keyframes } from 'styled-components';
import { Flex, Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';

const BarContainer = styled.div`
  width: 100%;
  height: 18px;
  background-color: #ddd;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
`;

const progressBar = (y: any) => keyframes`
0% { width: 0; }
100% { width: ${y}% }
`;

const Bar = styled.div<{ lineargradient: string; width: string }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  position: relative;
  animation: ${(props: any) => progressBar(props.y)} 950ms ease-out;
  animation-fill-mode: both;
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: ${({ lineargradient }) => lineargradient};
    clip-path: ${({ width }) =>
    width === '100'
      ? 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)'
      : 'polygon(0 0, 92% 0%, 100% 100%, 0 100%)'};
    top: 0;
    left: 0;
    transition: width 0.5s ease;
  }
`;

const ProductTracker = () => {
  const state = useSelector((state: any) => state);
  const productTracker = state.dashboardCurrentYearData?.currentYearData?.productTracker;
  const loading = state.dashboardCurrentYearData?.loading;

  return (
    <Flex justifyContent='space-between' flexDirection='column' height='100%' alignItems='center'>
      <Flex flexDirection='column' alignItems='start' width='100%' flex='0'>
        <Text fontFamily='Rust' fontSize='17px' textAlign='left'>
          Product Tracker
        </Text>
        <Text fontFamily='Rust' fontSize='12px' color='gray'>
          Track. Manage. Optimize
        </Text>
      </Flex>
      {loading ? (
        <Flex height='100%' alignItems='center'>
          <JumpingRumpLoader color='#a7d82f' />
        </Flex>
      ) : (
        <div className='w-100' style={{ marginBottom: '-10px' }}>
          <div className='w-100'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                Products
              </Text>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                {productTracker?.product?.qtySold} out of 50
              </Text>
            </Flex>
            <BarContainer>
              <Bar
                width={String(productTracker?.product?.percentage ?? 0)}
                lineargradient='linear-gradient(263deg, rgba(157,253,255,1) 18%, rgba(233,198,253,1) 100%)'
              />
            </BarContainer>
          </div>
          <div className='w-100'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                Ecards
              </Text>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                {productTracker?.eCard?.qtySold} out of 50
              </Text>
            </Flex>
            <BarContainer>
              <Bar
                width={String(productTracker?.eCard?.percentage ?? 0)}
                lineargradient='linear-gradient(90deg, rgba(102,211,72,1) 0%, rgba(235,216,43,1) 100%)'
              />
            </BarContainer>
          </div>
          <div className='w-100'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                Welcome Wieners
              </Text>
              <Text fontSize='12px' color='gray' fontFamily='Rust'>
                {productTracker?.welcomeWiener?.qtySold} out of 50
              </Text>
            </Flex>
            <BarContainer>
              <Bar
                width={String(productTracker?.welcomeWiener?.percentage ?? 0)}
                lineargradient='linear-gradient(90deg, rgba(253,98,134) 0%, rgba(244,215,40) 100%)'
              />
            </BarContainer>
          </div>
        </div>
      )}
    </Flex>
  );
};

export default ProductTracker;
