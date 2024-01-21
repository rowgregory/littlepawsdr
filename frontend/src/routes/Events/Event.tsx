import { Card, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listEventDetails } from '../../actions/eventActions';

const CardContainer = styled.div<{ event: any }>`
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  padding: 80px 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - 426px);
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: ${({ event }) => `repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #e5e5f7 10px
    ),
    repeating-linear-gradient(${event?.background?.split(',')[1]?.split(' ')[1]
    }, ${event?.background?.split(',')[2]?.split(' ')[1]})`};
`;

const CardTitle = styled(Card.Title) <{ color?: string }>`
  font-size: 56px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Maven Pro', sans-serif;
  color: ${({ color }) => color};
  margin-top: -90px;
  z-index: 10;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-top: -150px;
    font-size: 72px;
  }
`;

const Month = styled(Card.Text) <{ color?: string }>`
  font-size: 3em;
  margin-bottom: 0;
  margin-top: 96px;
  font-family: 'Maven Pro', sans-serif;
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

const Description = styled(Card.Text) <{ color?: string }>`
  font-size: 1rem;
  color: ${({ color }) => color};
`;

const CardImg = styled(Card.Img)`
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: 50%;
  max-width: 600px;
  width: 100%;
`;

export const getOrdinalDate = (date: any) => {
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
  const superscriptOrdinal = `${date[2] < '10' ? `${date[2].slice(1)}` : date[2]
    }${getOrdinal(date[2])}`;

  const month = new Date(date[0], date[1] - 1, date[2])
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();

  return { superscriptOrdinal, month };
};

const Event = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const state = useSelector((state: any) => state);
  const loading = state.eventDetails.loading;
  const event = state.eventDetails.event;


  const start = event?.startDate?.split('-');
  const end = event?.endDate?.split('-');

  useEffect(() => {
    dispatch(listEventDetails(id))
  }, [dispatch, id])

  return (
    <>
      <CardContainer event={event}>
        <div
          style={{ maxWidth: '1100px', width: '100%', marginInline: 'auto' }}
          className='d-flex justify-content-center flex-column align-items-center'
        >
          {loading ? (
            <Spinner animation='border' />
          ) : (
            <>
              <div className='w-100 d-flex justify-content-start pt-4'>
                <LeftArrow text='Events' url='/events' />
              </div>
              <CardImg
                src={event?.image}
                alt={`${event?.title}-${event?._id}`}
              />
              <CardTitle color={event?.color} className='mb-0'>
                {event?.title}
              </CardTitle>
              <div className='d-flex w-100 justify-content-center align-items-center'>
                <Month color={event?.color}>
                  {start && getOrdinalDate(start).month}
                  <sup>{start && getOrdinalDate(start).superscriptOrdinal}</sup>
                </Month>
                <Month color={event?.color} className='mx-3'>
                  -
                </Month>
                <Month color={event?.color}>
                  {end && getOrdinalDate(end).month}
                  <sup>{end && getOrdinalDate(end).superscriptOrdinal}</sup>
                </Month>
              </div>
              <Description color={event?.color}>
                {event?.description}
              </Description>
              {event?.externalLink && (
                <Text
                  p='4px 8px'
                  border={`1px solid ${event?.color}`}
                  cursor='pointer'
                  marginTop='48px'
                  fontSize='22px'
                  color={event?.color}
                  fontWeight={600}
                  onClick={() => window.open(event?.externalLink, '_blank')}
                >
                  View the event here
                </Text>
              )}
            </>
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default Event;
