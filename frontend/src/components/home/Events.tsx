import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listEvents } from '../../actions/eventActions';
import { HomeLink, SectionContainer, SectionTitle } from './styles';
import { LoadingImg, Text } from '../styles/Styles';

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  width: 100%;
  margin: 0 auto;
  .see-event {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: #fff;
    background: #111;
    padding: 0.5rem 1rem;
    border-radius: 30px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EventTitle = styled.div`
  position: absolute;
  bottom: 60px;
  left: 20px;
  color: #fff;
  font-family: 'Ubuntu', sans-serif;
  font-size: 72px;
  font-weight: bold;
`;

const ImgContainer = styled.div`
  max-height: 500px;
  width: 100%;
`;

const Events = () => {
  const dispatch = useDispatch();
  const eventList = useSelector((state: any) => state.eventList);
  const { loading, error, events } = eventList;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);
  return loading ? (
    <SectionContainer>
      <EventsContainer className='px-0'>
        {[1, 2]
          ?.map((_: any, i: number) => (
            <div key={i} className='d-flex flex-column'>
              <LoadingImg h='550px' w='100%' />
            </div>
          ))
          .filter((_: any, i: number) => i < 2)}
      </EventsContainer>
    </SectionContainer>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <SectionContainer>
      <SectionTitle>Events</SectionTitle>
      <EventsContainer className='px-0'>
        {events.length === 0 ? (
          <Text>Check back soon for events!</Text>
        ) : (
          events
            ?.map((event: any, i: number) => (
              <div key={i} className='d-flex flex-column'>
                <ImgContainer>
                  <Image
                    width='100%'
                    height='100%'
                    style={{ objectFit: 'cover' }}
                    src={event.image}
                    alt={event.title.replace(' ', '-')}
                  />
                </ImgContainer>
                <div style={{ position: 'relative' }}>
                  <EventTitle>{event.title}</EventTitle>
                  <HomeLink to={`/events/${event._id}`}>See Event</HomeLink>
                </div>
              </div>
            ))
            .filter((_: any, i: number) => i < 2)
        )}
      </EventsContainer>
    </SectionContainer>
  );
};

export default Events;
