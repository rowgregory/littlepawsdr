import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listEventDetails } from '../../actions/eventActions';
import { LoadingImg } from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const CardContainer = styled.div<{ event: any }>`
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  padding: 5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: ${({ event }) => `repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #e5e5f7 10px
    ),
    repeating-linear-gradient(${
      event?.background?.split(',')[1]?.split(' ')[1]
    }, ${event?.background?.split(',')[2]?.split(' ')[1]})`};
`;

const CardTitle = styled(Card.Title)<{ color?: string }>`
  font-size: 5rem;
  line-height: 6rem;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Maven Pro', sans-serif;
  color: ${({ color }) => color};
  margin-top: -150px;
  z-index: 10;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 8rem;
  }
`;

const Month = styled(Card.Text)<{ color?: string }>`
  font-size: 3em;
  margin-bottom: 0;
  margin-top: 8rem;
  font-family: 'Maven Pro', sans-serif;
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

const Description = styled(Card.Text)<{ color?: string }>`
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

const Event = ({ match }: any) => {
  const eventId = match.params.id;
  const dispatch = useDispatch();
  const eventDetails = useSelector((state: any) => state.eventDetails);
  const { loading, error, event } = eventDetails;

  useEffect(() => {
    dispatch(listEventDetails(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (error) {
      toaster.notify(({ onClose }) => ToastAlert(error, onClose, 'error'), {
        position: 'bottom',
        duration: 20000,
      });
    }
  }, [error]);

  const start =
    event !== undefined &&
    event.startDate !== undefined &&
    event.startDate.split('-');
  const end =
    event !== undefined &&
    event.endDate !== undefined &&
    event.endDate.split('-');

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

  const getOrdinalDate = (date: any) => {
    const superscriptOrdinal = `${
      date[2] < '10' ? `${date[2].slice(1)}` : date[2]
    }${getOrdinal(date[2])}`;

    const month = new Date(date[0], date[1] - 1, date[2])
      .toLocaleString('default', { month: 'short' })
      .toUpperCase();

    return { superscriptOrdinal, month };
  };

  return error ? (
    <></>
  ) : (
    <>
      <CardContainer event={event}>
        <div
          style={{
            height: '50px',
            width: '50px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <GoBackBtn to='/events' color='#fff' />
        </div>
        <div
          style={{ maxWidth: '1100px', width: '100%' }}
          className='d-flex justify-content-center flex-column align-items-center'
        >
          {loading ? (
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <LoadingImg w='100%' h='100%' borderRadius='50%' />
            </div>
          ) : (
            <CardImg src={event?.image} alt={`${event?.title}-${event?._id}`} />
          )}
          {loading ? (
            <LoadingImg w='100%' h='15rem' />
          ) : (
            <CardTitle color={event?.color} className='mb-0'>
              {event?.title}
            </CardTitle>
          )}

          {loading ? (
            <div className='mt-5'>
              <LoadingImg w='20rem' h='5rem' />
            </div>
          ) : (
            <>
              <div className='d-flex w-100 justify-content-center align-items-center'>
                <Month color={event?.color}>
                  {getOrdinalDate(start).month}
                  {getOrdinalDate(start).superscriptOrdinal}
                </Month>
                <Month color={event?.color}>-</Month>
                <Month color={event?.color}>
                  {getOrdinalDate(end).month}
                  {getOrdinalDate(end).superscriptOrdinal}
                </Month>
              </div>
              <Description color={event?.color}>
                {event?.description}
              </Description>
            </>
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default Event;
