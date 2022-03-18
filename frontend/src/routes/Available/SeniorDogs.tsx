import React from 'react';
import { Row, Col, Card, Carousel, Image } from 'react-bootstrap';
import styled from 'styled-components';
import {
  Text,
  PageHeader,
  StyledCard,
  CardTitle,
} from '../../components/styles/Styles';

export const ViewFees = styled.span`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  margin: 0 48px;
`;

const seniorPups = [
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14495/14495732/71367743_2543x2748.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/15203/15203207/70783984_806x802.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/15203/15203203/70784009_805x879.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/15203/15203203/70784007_677x1013.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191173_1344x1476.jpg',
];

const reasonsToAdoptASeniorData = () => {
  return [
    {
      title: 'Housetrained',
      reason:
        'Older dogs are housetrained. You won’t have to go through the difficult state(s) of teaching a puppy house manners and mopping/cleaning up after accidents.',
    },
    {
      title: 'Won’t chew inappropriate items',
      reason:
        'Older dogs are not teething puppies and won’t chew your shoes and furniture while growing up.',
    },
    {
      title: 'Focus to learn',
      reason:
        'Older dogs can focus well because they’ve mellowed. Therefore, they learn quickly.',
    },
    {
      title: 'Know what “No” means',
      reason:
        'Older dogs have learned what “no” means. If they hadn’t learned it, they wouldn’t have gotten to be “older” dogs.',
    },
    {
      title: 'Settle in with the “pack”',
      reason:
        'Older dogs settle in easily because they’ve learned what it takes to get along with others and become part of a pack.',
    },
    {
      title: 'Good at giving love',
      reason:
        'Older dogs are good at giving love once they get into their new, loving home. They are grateful for the second chance they’ve been given.',
    },
    {
      title: 'What you see is what you get',
      reason:
        'Unlike puppies, older dogs have grown into their shape and personality. Puppies can grow up to be quite different from what they seemed at first.',
    },
    {
      title: 'Instant Companions',
      reason:
        'Older dogs are instant companions – ready for hiking, car trips and other things you like to do.',
    },
    {
      title: 'Time for yourself',
      reason:
        'Older dogs leave you time for yourself because they don’t make the kinds of demands on your time and attention that puppies and young dogs do.',
    },
    {
      title: 'A good night’s sleep',
      reason:
        'Older dogs let you get a good night’s sleep because they’re accustomed to human schedules and don’t generally need nighttime feedings, comforting or bathroom breaks.',
    },
  ];
};

const SeniorDogs = ({ history }: any) => {
  return (
    <Container>
      <Row>
        <Col md={6} className='mb-5'>
          <StyledCard className='p-4'>
            <Text marginBottom='1rem'>
              The <strong>Long on Love Senior Program</strong> is a way for
              those more experienced pet owners (age 60 and older) to find a
              loving senior dachshund/dachshund mix to join their home.
            </Text>
            <Text marginBottom='1rem'>
              Most senior dachshunds are housebroken and wanting to give their
              love to someone. Dachshunds can live to be 18 years old, so senior
              dachshunds still have lots of love to give.
            </Text>
            <Text marginBottom='1rem'>
              Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from
              shelters or owner surrenders. Many times they are surrendered to
              us or to the shelter because the death of owner and other family
              members don’t want the dog; working too many hours; doesn’t get
              along with a new puppy; there is a new baby in the house; need to
              move to a place where dogs are not allowed; kids going off to
              college; allergies; and the new spouse doesn’t like them. How sad
              for these seniors that have given their love to someone their
              entire lives.
            </Text>
            <Text marginBottom='1rem'>
              Little Paws Dachshund Rescue (LPDR) would like to encourage
              experienced pet owners to adopt by offering an adoption discount
              fee to Seniors, 60 years and older, who adopt a senior
              dachshund/dachshund mix from our rescue. This fee includes
              spay/neutering, all shots (Rabies and Distemper) and a microchip
              implant. We will also ensure they receive a dental if needed.{' '}
              <ViewFees
                onClick={() => {
                  history.push('/adopt/fees');
                }}
              >
                View our current fees.
              </ViewFees>
            </Text>
            <Text marginBottom='1rem'>
              To qualify for the program, you must show proof of age and have a
              care plan in place. Senior animals will be identified on our
              website with the notation{' '}
              <strong>“I am part of the Long on Love Senior Program”</strong> in
              the profile.
            </Text>
          </StyledCard>
        </Col>
        <Col md={6}>
          <Carousel pause='hover'>
            {seniorPups.map((senior: string, i: number) => (
              <Carousel.Item key={i}>
                <Image src={senior} alt={`senior-pup-${i}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className='d-block mt-5'>
        <Col className='mt-3 mb-1'>
          <PageHeader>Top 10 Reasons to Adopt An Older Dog</PageHeader>
        </Col>
        <Col className='p-3'>
          {reasonsToAdoptASeniorData().map((obj, i) => (
            <StyledCard key={i} className='my-1'>
              <Card.Body className='p-3'>
                <CardTitle>{obj.title}</CardTitle>
                <Text>{obj.reason}</Text>
              </Card.Body>
            </StyledCard>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SeniorDogs;
