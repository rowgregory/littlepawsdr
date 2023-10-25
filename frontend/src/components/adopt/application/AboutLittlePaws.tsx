import { Text } from '../../styles/Styles';

const AboutLittlePaws = () => {
  return (
    <>
      <Text
        fontSize='31px'
        marginTop='56px'
        fontWeight={400}
        textAlign='center'
        marginBottom='24px'
      >
        About Little Paws Dachshund Rescue
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
        We are an east coast based 501(c)3 exempt nonprofit dedicated to the
        rescue and re- homing of our favorite short legged breed.
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
        We specialize in finding permanent homes for dachshund and dachshund
        mixes. We strive to make the lives of all dogs better through action,
        advocacy, awareness, and education.
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
        It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs
        and oversee their treatment and wellbeing while working to find loving
        owners for those in our care. If you are looking for a new family
        member, take a look at our available dachshund and dachshund mixes.
      </Text>
    </>
  );
};

export default AboutLittlePaws;
