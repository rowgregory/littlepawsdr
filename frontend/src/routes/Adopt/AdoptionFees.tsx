import styled from 'styled-components';
import { Flex, Text } from '../../components/styles/Styles';
import AdoptFeesHigh from '../../components/assets/adopt-fees-high.jpeg';
import AdoptFeesLow from '../../components/assets/adopt-fees-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { Container } from '../../components/styles/GridDogStyles';

const UnorderedList = styled.ul`
  margin-top: 20px;
  li {
    font-size: 18px;
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

const AdoptionFeeInfoContainer = styled.div`
  padding: 256px 0;
  clip-path: polygon(100% 100%, 0% 100%, 0 15%, 100% 0%);
  background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  padding-inline: 16px;
`;

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
      <Container className='mb-0'>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Adoption Information' url2='/adopt/info' />
          <RightArrow text='Adoption FAQ' url='/adopt/faq' />
        </div>
        <Text fontSize='31px' marginTop='56px' fontWeight={400} textAlign='center' marginBottom='24px'>
          Please remember that regardless of whether you are adopting a purebred Dachshund or a Dachshund mix,
          the vetting costs are still the same
        </Text>
        <Flex maxWidth='680px' className='mx-auto flex-column'>
          <Text fontSize='18px' lineHeight='2.5'>
            You’re still paying much less for a dog that is totally vetted than if you were to purchase a dog
            and then have to assume the vetting costs yourself.
          </Text>
          <Text fontSize='18px' lineHeight='2.5'>
            All adoption fees include:
          </Text>
          <UnorderedList>
            {adoptionFeeData.map((data: string, i: number) => (
              <li key={i}>{data}</li>
            ))}
          </UnorderedList>
        </Flex>
      </Container>
      <AdoptionFeeInfoContainer>
        <Flex maxWidth='680px' className='mb-4 mx-auto flex-column'>
          <i className='fa-solid fa-triangle-exclamation mx-auto text-white fa-3x mb-4'></i>
          <Text fontSize='18px' lineHeight='2.5'>
            The Adoption Fee for each of our adoptable dogs can be found in their biography. Find each dog’s
            biography by clicking on Dachshunds then Available in our Menu dropdown list found on our home
            page.{' '}
          </Text>
          <br />
          <Text fontSize='18px' lineHeight='2.5'>
            In addition to the Adoption Fee the cost of a Health Certificate is also the responsibility of the
            adopter. A health certificate is required by law when a dog is adopted and must travel over state
            lines. The cost depends upon what the veterinarian charges LPDR.
          </Text>
        </Flex>
      </AdoptionFeeInfoContainer>
    </>
  );
};

export default AdoptionFees;
