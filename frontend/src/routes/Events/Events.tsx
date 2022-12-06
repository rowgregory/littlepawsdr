import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { listEvents } from '../../actions/eventActions';
import EventCard from '../../components/EventCard';
import { Text } from '../../components/styles/Styles';
import { Month, timeLineData } from '../../components/raffle-winners/Timeline';
import { LoadingImg } from '../../components/LoadingImg';
import { Image } from 'react-bootstrap';
import EventDog from '../../components/assets/events01.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Message from '../../components/Message';
import { Container } from '../../components/styles/shop/Styles';

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 680px;
  width: 100%;
  margin-inline: auto;
  margin-top: 75px;
  padding-bottom: 128px;
  padding-inline: 8px;
`;

const EventIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 456.213 456.213'
    width='48px'
  >
    <g id='XMLID_243_'>
      <g>
        <path
          fill='#9761aa'
          d='M422.432,206.213l29.436-29.437L275.093,0l-91.924,91.924l10.606,10.606c5.849,5.849,5.849,15.364-0.001,21.213
			c-2.833,2.833-6.6,4.394-10.605,4.394c-4.007,0-7.773-1.561-10.607-4.394l-10.606-10.606L68.88,206.213H3.107v250h290v-15
			c0-8.271,6.729-15,15-15c8.272,0,15,6.729,15,15v15h130v-250H422.432z M158.107,356.213h-80v-30h80V356.213z M178.107,296.213
			h-100v-30h100V296.213z M378.107,346.213H344.32l-35.606,35.606l-21.213-21.212l14.393-14.394h-58.787v-55h30v25h28.787
			l-14.393-14.394l21.213-21.213l35.606,35.606h33.787V346.213z M380.006,206.214h-56.898v15c0,8.271-6.728,15-15,15
			c-8.271,0-15-6.729-15-15v-15H111.305l52.452-52.453c5.984,2.864,12.581,4.376,19.411,4.376h0.001
			c12.02,0,23.321-4.682,31.819-13.181c8.499-8.499,13.18-19.799,13.18-31.819c0-6.829-1.512-13.428-4.375-19.41l51.3-51.301
			l134.35,134.351L380.006,206.214z'
        />
      </g>
    </g>
  </svg>
);

const Events = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const {
    eventList: { loading, error, events },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  return (
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={EventDog}
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
          Events
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://pixabay.com/users/ilonaburschl-3558510/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2059668',
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
          Photo by Ilona Ilyés
        </Text>
      </div>
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Shop' url2='/shop' />
          <RightArrow text='Blog' url='/about/blog' />
        </div>
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          textAlign='center'
          fontWeight={400}
        >
          Little Paws Dachshund Rescue host a number of fund raising events
          throughout the year. We hope to see you at some in{' '}
          {new Date().getFullYear()}!
        </Text>
      </Container>
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
        }}
      >
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : events?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3'>
              <EventIcon />
            </div>
            <Text>Sorry, no events at the moment. Check back soon!</Text>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Events;
