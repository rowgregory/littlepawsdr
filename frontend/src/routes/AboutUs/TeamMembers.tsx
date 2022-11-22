import React, { useEffect } from 'react';
import { Row, Image, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listWhoWeAreUsers } from '../../actions/userActions';
import Message from '../../components/Message';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import styled from 'styled-components';
import { listManuallyAddedUsers } from '../../actions/manuallyAddUserActions';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';

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

  const userWhoWeAreList = useSelector((state: any) => state.userWhoWeAreList);
  const { loading, error, users } = userWhoWeAreList;

  const manuallyAddedUserList = useSelector(
    (state: any) => state.manuallyAddedUserList
  );
  const {
    loading: loadingM,
    error: errorM,
    manuallyAddedUsers,
  } = manuallyAddedUserList;

  useEffect(() => {
    dispatch(listWhoWeAreUsers());
    dispatch(listManuallyAddedUsers());
  }, [dispatch]);

  return (
    <div
      style={{
        maxWidth: '980px',
        width: '100%',
        marginInline: 'auto',
        marginBottom: '96px',
        paddingInline: '16px',
      }}
    >
      <Text
        fontSize='32px'
        fontWeight={400}
        marginTop='56px'
        marginBottom='32px'
      >
        Little Paws Crew
      </Text>
      {(loading || loadingM) && <HexagonLoader />}
      {(error || errorM) && (
        <Message variant='danger'>{error || errorM}</Message>
      )}
      <Row className='mx-auto d-flex flex-column px-0 mb-5'>
        <Text fontFamily={`Duru Sans`} marginBottom='1rem'>
          BOARD MEMBERS
        </Text>
        <Col
          className='px-0 d-flex'
          style={{
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {users?.map(
            (user: any, i: number) =>
              user?.isAdmin && (
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
                      src={user?.avatar}
                      alt={`${user?.name}-${i}`}
                      width='170px'
                      height='170px'
                      roundedCircle
                    />
                    <Name className='pt-2'>
                      <strong>{user?.name}</strong>
                    </Name>
                    <Position className='pb-1'>{user?.volunteerTitle}</Position>
                    <Card.Text>{user?.volunteerEmail}</Card.Text>
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
          {manuallyAddedUsers?.map((user: any, i: number) => (
            <ProfileCard key={user?._id} className='d-flex my-3'>
              <Card.Img
                src='https://res.cloudinary.com/doyd0ewgk/image/upload/v1612043441/field_tree2.jpg'
                alt={`${user}=${i}`}
                style={{
                  height: '200px',
                  borderRadius: '12px 12px 0 0',
                  objectFit: 'cover',
                }}
              />

              <Card.Body className='d-flex flex-column mx-auto align-items-center'>
                <CardImg
                  src={user?.image}
                  alt={`${user?.name}-${i}`}
                  width='170px'
                  height='170px'
                  roundedCircle
                />
                <Name className='pt-2'>
                  <strong>{user?.name}</strong>
                </Name>
                <Position className='pb-4'>{user?.affiliation}</Position>
                <Position className='pb-1'>{user?.message}</Position>
                <Card.Text>{user?.volunteerEmail}</Card.Text>
              </Card.Body>
            </ProfileCard>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default TeamMembers;
