import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listEventDetails } from '../../actions/eventActions';
import { Ribbon } from '../../components/EventCard';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import GoBackBtn from '../../utils/GoBackBtn';

const CardContainer = styled(Card)<{ event: any }>`
  background-image: ${({ event }) => event.background};
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
`;

const CardBody = styled(Card.Body)`
  position: relative;
  width: 100%;
`;
const CardTitle = styled(Card.Title)`
  font-size: 8vw;
  font-weight: bold;
  text-transform: uppercase;
`;

const Month = styled(Card.Text)`
  font-size: 5vw;
  margin-bottom: 0;
`;
const Ordinal = styled(Card.Text)`
  font-size: 10vw;
  line-height: 46px;
  text-indent: 7vw;
`;
const Description = styled(Card.Text)`
  font-size: 2vw;
`;

const CardImg = styled(Card.Img)`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const Event = ({ match }: any) => {
  const eventId = match.params.id;
  const dispatch = useDispatch();
  const eventDetails = useSelector((state: any) => state.eventDetails);
  const {
    loading: loadingEventDetails,
    error: errorEventDetails,
    event,
  } = eventDetails;

  useEffect(() => {
    dispatch(listEventDetails(eventId));
  }, [dispatch, eventId]);

  const start =
    event !== undefined &&
    event.startDate !== undefined &&
    event.startDate.split('-');

  const getOrdinal = (d: string) => {
    const day = parseInt(d);
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const superscriptOrdinal = `${
    start[2] < '10' ? `${start[2].slice(1)}` : start[2]
  }${getOrdinal(start[2])}`;

  const month = new Date(start[0], start[1] - 1, start[2])
    .toLocaleString('default', { month: 'long' })
    .toUpperCase();

  return (
    <>
      <GoBackBtn to='/events' />
      {loadingEventDetails && <Loader />}
      {errorEventDetails ? (
        <Message variant='danger'>{errorEventDetails}</Message>
      ) : (
        <Row className='d-flex justify-content-center mb-5'>
          <Col md={6}>
            <CardContainer event={event}>
              <Ribbon
                className='ribbon ribbon-top-right'
                status={event?.status}
              >
                <span>{event?.status}</span>
              </Ribbon>
              <CardBody>
                <CardTitle className='mb-0'>{event?.title}</CardTitle>
                <Month className='p-0 m-0'>{month}</Month>
                <Ordinal className='mb-5'>{superscriptOrdinal}</Ordinal>
                <Description>{event?.description}</Description>
                <CardImg
                  src={event?.image}
                  alt={`${event?.title}-${event?._id}`}
                />
              </CardBody>
            </CardContainer>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Event;
