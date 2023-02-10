import React from 'react';
import { Card } from 'react-bootstrap';
import { Text, CardTitle, StyledCard } from '../../components/styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { useEffect } from 'react';
import { listEducationTips } from '../../actions/educationTipActions';
import EducationHigh from '../../components/assets/education-high.jpg';
import EducationLow from '../../components/assets/education-low.jpg';
import styled from 'styled-components';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { LoadingImg } from '../../components/LoadingImg';
import NoEducation from '../../components/svg/NoEducation';

const EduGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  flex-direction: column;
  justify-items: center;
  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  }
`;

const Education = () => {
  const dispatch = useDispatch();

  const {
    educationTipList: { loading, error, educationTips },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listEducationTips());
  }, [dispatch]);

  return (
    <>
      <Hero
        low={EducationLow}
        high={EducationHigh}
        title='Education Tips'
        link='https://www.pexels.com/photo/photograph-of-a-black-and-brown-dachshund-14111197/'
        photographer='Alfo Medeiros'
      />
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '64px',
          paddingInline: '16px',
        }}
      >
        <div
          className='w-100 d-flex justify-content-between mt-3'
          style={{ marginBottom: '56px' }}
        >
          <LeftArrow text='Home' url='/' text2='Blog' url2='/about/blog' />
          <RightArrow text='About Us' url='/about/team-members' />
        </div>
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          fontWeight={400}
          textAlign='center'
        >
          Dachshund information of all kinds
        </Text>
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : educationTips?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-4'>
              <NoEducation />
            </div>
            <Text>
              Sorry, no education tips available at the moment. Check back soon!
            </Text>
          </div>
        ) : (
          <EduGrid>
            {educationTips?.map((obj: any, i: number) => (
              <StyledCard
                className='mr-3'
                key={i}
                onClick={() => window.open(obj.externalLink, '_blank')}
                style={{ width: '300px' }}
              >
                {loading || educationTips === undefined ? (
                  <LoadingImg w='100%' h='300px' />
                ) : (
                  <Card.Img
                    src={obj.image}
                    alt='Card background'
                    style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                  />
                )}
                <Card.Body>
                  <CardTitle>{obj.title}</CardTitle>
                  <Text cursor='pointer'>Read</Text>
                </Card.Body>
              </StyledCard>
            ))}
          </EduGrid>
        )}
      </div>
    </>
  );
};

export default Education;
