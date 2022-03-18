import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { listEvents } from '../../../actions/eventActions';
import { formatDateTime } from '../../../utils/formatDateTime';
import Message from '../../Message';
import { LoadingImg } from '../../styles/Styles';
import { VerticalSection } from './VerticalSection';

const EventsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventsCardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 850px;
`;

const EventCard = styled.div<{ bg?: string }>`
  padding-top: 0.25rem;
  cursor: pointer;
  width: 100%;
  position: relative;

  &:nth-child(2) {
    margin-left: -75px;
    margin-right: -75px;
  }

  &:before {
    content: '';
    position: absolute;
    transform: translateX(-200px) skew(-9.5deg);
    margin-left: 75px;
    z-index: 10;
    top: 3px;
    left: 165px;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.65), transparent);
    width: 0%;
    transition: all 0.5s ease-out;
    opacity: 0;
    height: 91.5%;
  }

  .event-name {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.5s ease-out;
    position: absolute;
    top: 50%;
    z-index: 12;
    width: fit-content;
    color: #fff;
    font-size: 1.75rem;
    animation-mode: backwards;
  }

  :hover {
    &:before {
      opacity: 1;
      width: 76%;
      height: 91.5%;
    }

    .event-name {
      opacity: 1;
      transform: translateX(50px);
      top: 50%;
      text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5),
        20px 20px 20px rgba(0, 0, 0, 0.4), 30px 30px 30px rgba(0, 0, 0, 0.1);
    }
  }
`;

const EventCardImgWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 500px;
  position: relative;
  img {
    object-fit: cover;
    width: 100%%;
    @supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
      -webkit-clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
      clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
    }
  }
`;

const EventStartDate = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: #fff;
  padding: 0.5rem 0;
`;

const Events = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [eventName, setEventName] = useState('');

  const eventList = useSelector((state: any) => state.eventList);
  const {
    loading: loadingEventList,
    error: errorEventList,
    events,
  } = eventList;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  return (
    <EventsContainer>
      {loadingEventList ? (
        <div style={{ maxWidth: '850px', display: 'flex', margin: '0 auto' }}>
          {[1, 2, 3].map((_, i: number) => (
            <LoadingImg h='500px' w='280px' key={i} />
          ))}
        </div>
      ) : errorEventList ? (
        <Message variant='danger'>{errorEventList}</Message>
      ) : (
        <>
          <VerticalSection title='EVENTS' />
          <EventsCardContainer>
            {events?.map((event: any, i: number) => (
              <EventCard
                onMouseEnter={() => {
                  setEventName(event.title);
                }}
                key={event._id}
                bg={event?.background}
                onClick={() => history.push(`/events/${event?._id}`)}
              >
                <div className='event-name'>
                  {eventName === event.title && eventName}
                </div>
                <EventCardImgWrapper>
                  <Image width='100%' src={event?.image} alt='event' />
                </EventCardImgWrapper>
                <EventStartDate>
                  {formatDateTime(event?.startDate)} | VIEW EVENT
                </EventStartDate>
              </EventCard>
            ))}
          </EventsCardContainer>
        </>
      )}
    </EventsContainer>
  );
};

export default Events;
