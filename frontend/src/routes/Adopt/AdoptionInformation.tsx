import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import AdoptionInfoHigh from '../../components/assets/adopt-info-high.jpeg';
import AdoptionInfoLow from '../../components/assets/adopt-info-low.jpg';
import Hero from '../../components/Hero';
import BigDecision from '../../components/adopt/info/BigDecision';
import GuidelinesAndRequirements from '../../components/adopt/info/GuidelinesAndRequirements';
import AdoptingAPuppy from '../../components/adopt/info/AdoptingAPuppy';

const AdoptionInformation = () => {
  return (
    <>
      <Hero
        low={AdoptionInfoLow}
        high={AdoptionInfoHigh}
        title='Adoption Information'
        link='https://unsplash.com/es/@davidiz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='David Izquierdo'
      />
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Adopt a Senior'
            url2='/adopt/senior'
          />
          <RightArrow text='Fees' url='/adopt/fees' />
        </div>
        <BigDecision />
        <GuidelinesAndRequirements />
        <AdoptingAPuppy />
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          TRANSPORTATION HELP
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          We do not have a physical location, as all our dogs are fostered in
          individual homes on the east coast. A LPDR volunteer transport may be
          arranged to bring a dog to you. The cost for volunteer transport
          includes a health certificate (required by law and issued by a
          veterinarian), a crate (which all dogs must travel in for safety), and
          a collar, leash, and harness. However, some of our dogs have distance
          restrictions and need to be adopted within a specific number of miles
          from their foster homes. We will inform you if the dog you applied for
          is not able to travel long distances by car. We want to find the best
          family for each of our dachshunds, even if they are out of state.
          Please read the bio for your dog of interest to see if there is a
          distance restriction.
        </Text>
      </div>
    </>
  );
};

export default AdoptionInformation;
