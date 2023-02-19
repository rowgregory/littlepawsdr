import React, { useEffect } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listWhoWeAreUsers } from '../../actions/userActions';
import { Text } from '../../components/styles/Styles';
import styled from 'styled-components';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import AboutUsHigh from '../../components/assets/about-us-high.jpg';
import AboutUsLow from '../../components/assets/about-us-low.jpg';
import { useLocation } from 'react-router-dom';
import CardFlip from '../../components/boardmember-card/CardFlip';
import Hero from '../../components/Hero';

export const ProfileCard = styled(Card)`
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

export const Name = styled(Card.Title)`
  color: ${({ theme }) => theme.card.text};
`;
export const Position = styled(Card.Subtitle)`
  color: ${({ theme }) => theme.card.text};
`;

const CardWrapper = styled(Col)`
  display: grid;
  justify-content: center;
  grid-gap: 96px;
  grid-template-columns: repeat(auto-fill, 100%);
  grid-template-rows: repeat(auto-fill, 500px);
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-gap: 96px 32px;
    grid-template-columns: repeat(auto-fill, 600px);
    grid-template-rows: repeat(auto-fill, 380px);
  }
`;

const VerticalText = styled.div`
  color: ${({ theme }) => theme.secondaryBg};
  font-size: 150px;
  font-weight: 600;
`;

const TeamMembers = () => {
  const dispatch = useDispatch();
  const location = useLocation() as any;

  useEffect(() => {
    if (location?.state?.from === 'dashboard') {
      window.scrollTo(0, 1000);
    }
  }, [location.state]);

  const userWhoWeAreList = useSelector((state: any) => state.userWhoWeAreList);
  const { loading, users } = userWhoWeAreList;

  useEffect(() => {
    dispatch(listWhoWeAreUsers());
  }, [dispatch]);

  const boardMembers = users?.boardMembers;

  return (
    <>
      <Hero
        low={AboutUsLow}
        high={AboutUsHigh}
        title='Little Paws Crew'
        link={`https://unsplash.com/@ibaxez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`}
        photographer='Carlos Ibáñez'
      />
      <div
        style={{
          position: 'fixed',
          right: 'calc(100% - 163px)',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <div
          style={{
            height: '163px',
            transformOrigin: 'left',
            transform: 'rotate(90deg) translate(0%, -50%)',
            width: '200vh',
          }}
        >
          <VerticalText>Little Paws Dachshund Reschue</VerticalText>
        </div>
      </div>
      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div
          className='w-100 mx-auto d-flex justify-content-between mt-3'
          style={{ maxWidth: '980px' }}
        >
          <LeftArrow
            text='Home'
            url='/'
            text2='Education Tips'
            url2='/about/education'
          />
          <RightArrow text='Contact' url='/about/contact-us' />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          style={{ maxWidth: '980px', marginInline: 'auto' }}
        >
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
        <Text maxWidth='680px' fontSize='16px' className='mx-auto'>
          Right now, we are in need of monetary donations. Happy endings for our
          dachshunds in need can only happen with your support. Please allow us
          to continue to say “YES WE CAN” to those calls asking for assistance
          with a dachshund left behind at an animal shelter, or a dog who has
          been neglected and abused and deserves a warm bed and a kind hand to
          rub his or her tummy.
        </Text>
        <Row
          className='mx-auto d-flex flex-column px-0 mb-5'
          style={{ marginTop: '96px' }}
        >
          <CardWrapper className='px-0'>
            {boardMembers?.map(
              (user: any) =>
                (user?.isAdmin || user?.affiliation) &&
                user?.email !== 'it.little.paws@gmail.com' && (
                  <CardFlip key={user?._id} user={user} loading={loading} />
                )
            )}
          </CardWrapper>
        </Row>
      </div>
    </>
  );
};

export default TeamMembers;
