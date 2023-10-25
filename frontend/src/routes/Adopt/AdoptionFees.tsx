import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import AdoptFeesHigh from '../../components/assets/adopt-fees-high.jpeg';
import AdoptFeesLow from '../../components/assets/adopt-fees-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import FeeTable from '../../components/adopt/fees/FeeTable';
import { Container } from '../../components/styles/GridDogStyles';

const UnorderedList = styled.ul`
  li {
    max-width: 680px;
    font-size: 16px;
    margin-bottom: 24px;
    margin-inline: auto;
    font-weight: 300;
  }
`;

const adoptionFeeData = [
  'Spay or neuter',
  'Full veterinary health check',
  'Vaccinations: Rabies, Distemper Combo (not Lepto)',
  'Heartworm test (if found positive they undergo heartworm treatment)',
  'Dental cleaning (if necessary)',
  'Any additional medical treatment as necessary',
  'Microchip',
];

const AdoptionFees = () => {
  return (
    <>
      <Hero
        low={AdoptFeesLow}
        high={AdoptFeesHigh}
        title='Adoption Fees'
        link='https://unsplash.com/@erdaest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Erda Estremera'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Adoption Information'
            url2='/adopt/info'
          />
          <RightArrow text='Adoption FAQ' url='/adopt/faq' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Please remember that regardless of whether you are adopting a purebred
          Dachshund or a Dachshund mix, the vetting costs are still the same
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          You’re still paying much less for a dog that is totally vetted than if
          you were to purchase a dog and then have to assume the vetting costs
          yourself.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          All adoption fees include:{' '}
        </Text>
        <UnorderedList>
          {adoptionFeeData.map((data: string, i: number) => (
            <li key={i}>{data}</li>
          ))}
        </UnorderedList>
      </Container>
      <FeeTable />
    </>
  );
};

export default AdoptionFees;
