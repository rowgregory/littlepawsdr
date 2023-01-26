import React, { useEffect } from 'react';
import { Row, Image, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listWhoWeAreUsers } from '../../actions/userActions';
import Message from '../../components/Message';
import { Text } from '../../components/styles/Styles';
import styled from 'styled-components';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import AboutUs from '../../components/assets/AboutUs.jpg';
import { useLocation } from 'react-router-dom';

const ProfileCard = styled(Card)`
  background-color: ${({ theme }) => theme.card.bg};
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  border-radius: 0 0 12px 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 300px;
    min-width: 260px;
  }
`;

const CardImg = styled(Image)`
  object-fit: cover;
  border: ${({ theme }) => `4px solid ${theme.card.bg}`};
  margin-top: -170px;
`;

const Name = styled(Card.Title)`
  color: ${({ theme }) => theme.card.text};
`;
const Position = styled(Card.Subtitle)`
  color: ${({ theme }) => theme.card.text};
`;

const TeamMembers = () => {
  const dispatch = useDispatch();
  const location = useLocation() as any;

  useEffect(() => {
    if (location.state.from === 'dashboard') {
      window.scrollTo(0, 1000);
    }
  }, [location.state]);

  const userWhoWeAreList = useSelector((state: any) => state.userWhoWeAreList);
  const { loading, error, users } = userWhoWeAreList;

  useEffect(() => {
    dispatch(listWhoWeAreUsers());
  }, [dispatch]);

  const boardMembers = users?.users?.concat(users?.manuallyAddedUsers);

  return (
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={AboutUs}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          About Us
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://www.pexels.com/photo/a-brown-dachshund-lying-on-a-carpet-9269488/',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Vinícius Cezário
        </Text>
      </div>
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
            text2='Education Tips'
            url2='/about/education'
          />
          <RightArrow text='Contact' url='/about/contact-us' />
        </div>
        <Text fontSize='32px' marginTop='56px' fontWeight={400}>
          We believe that dogs truly are man’s (and woman’s) best friend and
          that our beloved companions deserve the right to a soft bed, generous
          treats and unconditional love.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='my-4 mx-auto'>
          We believe in rescue. We believe in the power of cooperation and
          teamwork to make this happen. We believe in volunteers who can work
          together to help make a difference in the life of three puppy mill
          dogs who have spent their lives in cramped cages and now have a chance
          at a bright future thanks to the teamwork of Little Paws Dachshund
          Rescue and Carolina Loving Hound Rescue.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          We believe that two sweet puppies left behind at a veterinarian’s
          office deserve a life full of toys and fun and snuggles. We believe
          Little Paws Dachshund Rescue can help change the lives of these dogs,
          and many, many more in the future.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          Do you believe? Are you ready to help us achieve our mission? In the
          coming weeks we will be putting out calls for volunteers for many
          roles within our rescue. So many of you have reached out and asked how
          you can help! We are touched by everyone’s generosity.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          Right now, we are in need of monetary donations. Happy endings for our
          dachshunds in need can only happen with your support. Please allow us
          to continue to say “YES WE CAN” to those calls asking for assistance
          with a dachshund left behind at an animal shelter, or a dog who has
          been neglected and abused and deserves a warm bed and a kind hand to
          rub his or her tummy.
        </Text>

        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Little Paws Crew
        </Text>
        {loading && <HexagonLoader />}

        <Row className='mx-auto d-flex flex-column px-0 mb-5'>
          <Col
            className='px-0 d-flex'
            style={{
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {error ? (
              <div className='d-flex flex-column align-items-center w-100'>
                <Message variant='danger'>{error}</Message>
              </div>
            ) : (
              boardMembers?.map(
                (user: any, i: number) =>
                  (user?.isAdmin || user?.affiliation) &&
                  user?.email !== 'it.little.paws@gmail.com' && (
                    <ProfileCard key={user._id} className='d-flex my-3'>
                      <Card.Img
                        src={user.profileCardTheme}
                        alt={`${user}-${i}`}
                        style={{
                          height: '200px',
                          borderRadius: '12px 12px 0 0',
                          objectFit: 'cover',
                        }}
                      />

                      <Card.Body className='d-flex flex-column mx-auto align-items-center'>
                        <CardImg
                          src={user?.avatar || user?.image}
                          alt={`${user?.name}-${i}`}
                          width='170px'
                          height='170px'
                          roundedCircle
                        />
                        <Name className='pt-2'>
                          <strong>{user?.name}</strong>
                        </Name>
                        <Position className='pb-1'>
                          {user?.volunteerTitle || user?.affiliation}
                        </Position>
                        <Card.Text>
                          {user?.volunteerEmail || user?.email}
                        </Card.Text>
                      </Card.Body>
                    </ProfileCard>
                  )
              )
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TeamMembers;
