import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { listEvents } from '../../actions/eventActions';
import EventCard from '../../components/EventCard';
import { Text } from '../../components/styles/Styles';
import { Month, timeLineData } from '../../components/raffle-winners/Timeline';
import { LoadingImg } from '../../components/LoadingImg';
import Message from '../../components/Message';

const Container = styled.div`
  margin-inline: auto;
  width: 100%;
  background-image: radial-gradient(
    ${({ theme }) => (theme.mode === 'day' ? '#e5e5e5' : theme.input.bg)} 2px,
    transparent 2px
  );
  background-size: 32px 32px;
`;
const Wrapper = styled.div`
  margin-inline: auto;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  padding: 4rem 1rem 5rem;
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Events = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const eventList = useSelector((state: any) => state.eventList);
  const { loading, error, events } = eventList;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      <Container>
        <Wrapper>
          <Text marginBottom='0.5rem' fontSize='2rem'>
            Events
          </Text>
          <Text marginBottom='2rem'>
            Little Paws Dachshund Rescue host a number of fund raising events
            throughout the year. We hope to see you at some in{' '}
            {new Date().getFullYear()}!
          </Text>
          <EventsContainer>
            {timeLineData()?.map((obj, i) => (
              <div key={i} className='my-1 w-100'>
                <Month bg={obj?.bg} className='ml-0' donothover={true}>
                  {obj?.abbrv}
                </Month>

                {events?.map(
                  (event: any) =>
                    event?.startDate?.split('-')[1] === obj?.digits && (
                      <div key={event?._id} className='my-3'>
                        {loading ? (
                          <LoadingImg
                            w='100%'
                            h='10rem'
                            borderRadius='0.5rem'
                          />
                        ) : (
                          <EventCard event={event} history={history} />
                        )}
                      </div>
                    )
                )}
              </div>
            ))}
          </EventsContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Events;
