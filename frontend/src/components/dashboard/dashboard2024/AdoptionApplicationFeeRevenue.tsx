import { useSelector } from 'react-redux';
import { Flex, Text } from '../../styles/Styles';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';

const AdoptionApplicationFeeRevenue = () => {
  const state = useSelector((state: any) => state);
  const dashboardDetails = state.dashboardCurrentYearData.currentYearData;
  const loading = state.dashboardCurrentYearData.loading;


  return (
    <Flex
      width='100%'
      alignItems='center'
      justifyContent='space-between'
      position='relative'
      padding='0 12px'
      height='100%'
    >
      <Text fontFamily='Rust' fontSize='12px'>
        Adoption Application Fee Revenue
      </Text>
      <Text fontSize='30px' fontFamily='Rust' color='#fc5b82'>
        {loading ? (
          <Flex marginTop='8px' marginLeft='9px' marginRight='9px'>
            <JumpingRumpLoader color='#fc5b82' />
          </Flex>
        ) : (
          `$${dashboardDetails?.revenue?.adoptionFeesRevenue}`
        )}
      </Text>
    </Flex>
  );
};

export default AdoptionApplicationFeeRevenue;
