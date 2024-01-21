import { useSelector } from 'react-redux';
import { Flex, Text } from '../../styles/Styles';
import { WhiteIcon } from './styles';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';

const addCommaToNumber = (number: number) => {
  if (Number.isInteger(number) && number >= 1000 && number <= 9999) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

const TotalDogs = () => {
  const state = useSelector((state: any) => state);
  const dachshundCount = state?.totalDachshundCount?.dachshundCount;
  const loading = state?.totalDachshundCount?.loading;
  const dachshundsRehabilitaed = addCommaToNumber(dachshundCount);;

  return (
    <Flex flexDirection='column' width='100%' flex='0' style={{ gap: 0 }}>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Text color='#fff' textTransform='uppercase' fontFamily='Rust' fontSize='18px'>
          Dogs Rehabilitated
        </Text>
        <WhiteIcon
          onClick={() => window.open('https://rescuegroups.org/manage/dashboard', '_blank')}
          className='fa-solid fa-parachute-box'
        ></WhiteIcon>
      </Flex>
      <Text fontFamily='Rust' color='#fff'>
        With effort, anything is achievable
      </Text>
      <Text
        fontFamily='Rust'
        color='#fff'
        fontSize='44px'
        marginLeft='auto'
        marginRight='auto'
        cursor='pointer'
      >
        {loading ? <JumpingRumpLoader color='#fff' /> : dachshundsRehabilitaed}
      </Text>
    </Flex>
  );
};

export default TotalDogs;
