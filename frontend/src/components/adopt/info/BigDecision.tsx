import { Text } from '../../styles/Styles';

const BigDecision = () => {
  return (
    <>
      <Text
        fontSize='31px'
        marginTop='56px'
        fontWeight={400}
        textAlign='center'
        marginBottom='24px'
      >
        Adopting is a big decision
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        You are considering adopting a dog that is intelligent, loyal, fun
        loving, full of love, and more than likely very vocal. A dachshund will
        bring you so much enjoyment, fun, and fulfillment. They have this
        fantastic way of bringing joy to their families every day!
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        We are committed to finding each of our dachshunds responsible and
        loving new owners. We strive to make the best match we can, setting each
        dog and adopter up for success. Our number one concern is for our dogs.
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        We currently adopt to the following states: Alabama, Connecticut,
        Delaware, DC, Florida, Georgia, Kentucky, Maine, Maryland,
        Massachusetts, New Hampshire, New Jersey, North Carolina, Ohio,
        Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
        Virginia, West Virginia.
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        LPDR is a non-profit and is 100% funded by donations, including adoption
        donations.
      </Text>
    </>
  );
};

export default BigDecision;
