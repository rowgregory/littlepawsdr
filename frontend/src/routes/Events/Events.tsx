import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { listEvents } from '../../actions/eventActions';
import NoItemsDefault from '../../components/common/NoItemsDefault';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Text } from '../../components/styles/Styles';

const Container = styled.div`
  margin: 0 48px;
`;

const Rect = styled.rect`
  fill: ${({ theme }) => theme.text};
`;
const Path = styled.path`
  fill: ${({ theme }) => theme.text};
`;

const NoEvents = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 452.986 452.986'
      width='200px'
      height='200px'
    >
      <Path
        d='M404.344,0H48.642C21.894,0,0,21.873,0,48.664v355.681c0,26.726,21.894,48.642,48.642,48.642
				h355.702c26.726,0,48.642-21.916,48.642-48.642V48.664C452.986,21.873,431.07,0,404.344,0z M148.429,33.629h156.043v40.337
				H148.429V33.629z M410.902,406.372H42.041v-293.88h368.86V406.372z'
      />
      <Rect
        x='79.273'
        y='246.23'
        style={{ width: '48.642', height: '48.664' }}
      />
      <Rect
        x='79.273'
        y='323.26'
        style={{ width: '48.642', height: '48.642' }}
      />
      <Rect
        x='160.853'
        y='169.223'
        style={{ width: '48.621', height: '48.642' }}
      />
      <Rect
        x='160.853'
        y='246.23'
        style={{ width: '48.621', height: '48.664' }}
      />
      <Rect
        x='160.853'
        y='323.26'
        style={{ width: '48.621', height: '48.642' }}
      />
      <Rect
        x='242.369'
        y='169.223'
        style={{ width: '48.664', height: '48.642' }}
      />
      <Rect
        x='242.369'
        y='246.23'
        style={{ width: '48.664', height: '48.664' }}
      />
      <Rect
        x='242.369'
        y='323.26'
        style={{ width: '48.664', height: '48.642' }}
      />
      <Rect
        x='323.907'
        y='169.223'
        style={{ width: '48.664', height: '48.642' }}
      />
      <Rect
        x='323.907'
        y='246.23'
        style={{ width: '48.664', height: '48.664' }}
      />
    </svg>
  );
};

const Events = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const eventList = useSelector((state: any) => state.eventList);
  const {
    loading: loadingEventList,
    error: errorEventList,
    events,
  } = eventList;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  if (events?.length === 0) {
    return <NoItemsDefault items='events' Icon={NoEvents} />;
  }

  return (
    <Container>
      {loadingEventList && <Loader />}
      {errorEventList ? (
        <Message variant='danger'>{errorEventList}</Message>
      ) : (
        events?.length > 0 && (
          <>
            <Text>
              Little Paws Dachshund Rescue host a number of fund raising events
              throughout the year. We hope to see you at some in{' '}
              {new Date().getFullYear()}!
            </Text>
            <Row className='d-flex justify-content-start pb-5'>
              {events
                ?.map((event: any) => (
                  <EventCard key={event._id} event={event} history={history} />
                ))
                .reverse()}
            </Row>
          </>
        )
      )}
    </Container>
  );
};

export default Events;
