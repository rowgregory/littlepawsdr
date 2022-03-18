import React, { useEffect, useState } from 'react';
import { Row, Image, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listWhoWeAreUsers } from '../../actions/userActions';
import Message from '../../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { LoadingImg, Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';

import styled from 'styled-components';

const ProfileCard = styled(Card)`
  background-color: ${({ theme }) => theme.card.bg};
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 300px;
  min-width: 260px;
  border-radius: 0 0 12px 12px;
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

const WhoWeAre = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const userWhoWeAreList = useSelector((state: any) => state.userWhoWeAreList);
  const { loading, error, users } = userWhoWeAreList;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success: successUPdateProfile } = userUpdateProfile;

  useEffect(() => {
    if (successUPdateProfile) {
      setMessage('Profile Updated');
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }, 2500);
    }
    dispatch(listWhoWeAreUsers());
  }, [dispatch, successUPdateProfile]);

  return (
    <>
      {successUPdateProfile && <Message variant='success'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Row className='mx-auto d-flex flex-column px-0 mb-5'>
        <Text fontFamily={`Duru Sans`} marginBottom='1rem'>
          BOARD MEMBERS
        </Text>
        <Col
          className='px-0'
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {loading
            ? users?.map(
                (user: any, i: number) =>
                  user?.isAdmin && <LoadingImg h='286.77px' w='300px' key={i} />
              )
            : users?.map(
                (user: any, i: number) =>
                  user?.isAdmin && (
                    <ProfileCard key={user._id} className='d-flex my-3'>
                      <Card.Img
                        src={
                          user.profileCardTheme === ''
                            ? 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1612043441/field_tree2.jpg'
                            : user.profileCardTheme
                        }
                        alt={`${user}=${i}`}
                        style={{
                          height: '200px',
                          borderRadius: '12px 12px 0 0',
                          objectFit: 'cover',
                        }}
                      />

                      <Card.Body className='d-flex flex-column mx-auto align-items-center'>
                        <CardImg
                          src={user.avatar}
                          alt={`${user.name}-${i}`}
                          width='170px'
                          height='170px'
                          roundedCircle
                        />
                        <Name className='pt-2'>
                          <strong>{user.name}</strong>
                        </Name>
                        <Position className='pb-1'>
                          {user.volunteerTitle}
                        </Position>
                        <Card.Text>{user.volunteerEmail}</Card.Text>
                      </Card.Body>
                    </ProfileCard>
                  )
              )}
        </Col>
      </Row>
      <HorizontalLine />
      <Row className='mx-auto d-flex flex-column px-0 mt-5'>
        <Text fontFamily={`Duru Sans`} marginBottom='1rem'>
          FOSTER COORDINATORS
        </Text>
        <Col
          className='px-0'
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {loading
            ? users?.map(
                (user: any, i: number) =>
                  user?.isVolunteer &&
                  !user?.isAdmin && (
                    <LoadingImg h='286.77px' w='300px' key={i} />
                  )
              )
            : users?.map(
                (user: any, i: number) =>
                  user?.isVolunteer &&
                  !user?.isAdmin && (
                    <ProfileCard key={user._id} className='d-flex my-3'>
                      <Card.Img
                        src={
                          user.profileCardTheme === ''
                            ? 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1612043441/field_tree2.jpg'
                            : user.profileCardTheme
                        }
                        alt={`${user}=${i}`}
                        style={{
                          height: '200px',
                          borderRadius: '12px 12px 0 0',
                          objectFit: 'cover',
                        }}
                      />

                      <Card.Body className='d-flex flex-column mx-auto align-items-center'>
                        <CardImg
                          src={user.avatar}
                          alt={`${user.name}-${i}`}
                          width='170px'
                          height='170px'
                          roundedCircle
                        />
                        <Name className='pt-2'>
                          <strong>{user.name}</strong>
                        </Name>
                        <Position className='pb-1'>
                          {user.volunteerTitle}
                        </Position>
                        <Card.Text>{user.volunteerEmail}</Card.Text>
                      </Card.Body>
                    </ProfileCard>
                  )
              )}
        </Col>
      </Row>
    </>
  );
};

export default WhoWeAre;
