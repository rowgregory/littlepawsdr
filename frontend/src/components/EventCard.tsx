import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { formatDate } from '../utils/formatDate';
import { Text } from './styles/Styles';

const EventsCard = styled.div`
  max-width: 1000px;
  width: 100%;
  border: none;
  transition: all 500ms ease;
  border-radius: 12px;
  position: relative;
  margin-right: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  :hover {
    transform: translateY(-5px);
    box-shadow: 0 19px 100px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`;

interface ThreeDTextProps {
  fonttitlecolor?: string;
}

const Text3D = styled(Card.Title)<ThreeDTextProps>`
  background: ${({ fonttitlecolor }) =>
    fonttitlecolor
      ? `-webkit-linear-gradient(${fonttitlecolor}, ${fonttitlecolor})`
      : ''};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);
`;

export const Ribbon = styled.div<{ status?: string }>`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
  &.ribbon::before,
  &.ribbon::after {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
  }
  &.ribbon span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 15px 0;
    background-color: ${({ status }) =>
      status === 'UPCOMING'
        ? 'rgb(149,200,217, 0.95)'
        : status === 'ACTIVE'
        ? 'rgb(97,177,90, 0.95)'
        : 'rgb(76,81,109, 0.95)'};

    box-shadow: ${({ status }) =>
      status === 'UPCOMING'
        ? '0 5px 10px rgba(149,200,217, 0.5)'
        : status === 'ACTIVE'
        ? '0 5px 10px rgba(97,177,90, 0.5)'
        : '0 5px 10px rgba(76,81,109, 0.5)'};

    color: #fff;
    font: 700 18px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    text-align: center;
  }
  &.ribbon-top-right {
    top: -10px;
    right: -10px;
  }
  &.ribbon-top-right::before,
  &.ribbon-top-right::after {
    border-top-color: transparent;
    border-right-color: transparent;
  }
  &.ribbon-top-right::before {
    top: 0;
    left: 0;
  }
  &.ribbon-top-right::after {
    bottom: 0;
    right: 0;
  }
  &.ribbon-top-right span {
    left: -25px;
    top: 30px;
    transform: rotate(45deg);
  }
`;

const EventCard = ({ event, history }: any) => {
  return (
    <EventsCard
      onClick={() => history.push(`/events/${event?._id}`)}
      key={event?._id}
      className='d-flex align-items-center'
      style={{
        backgroundImage: event?.background,
      }}
    >
      <Ribbon className='ribbon ribbon-top-right' status={event?.status}>
        <span>{event?.status}</span>
      </Ribbon>

      <Card.Img
        className='mr-3'
        src={event?.image}
        style={{ aspectRatio: '1/1', objectFit: 'cover', width: '150px' }}
      ></Card.Img>

      <div className='d-flex flex-column justify-content-center'>
        <Text3D
          fonttitlecolor={event?.color}
          style={{
            color: event?.color,
          }}
        >
          {event?.title}
        </Text3D>
        <Text color={event?.color}>
          {event?.startDate && formatDate(event?.startDate)}-
          {event?.endDate && formatDate(event?.endDate)}
        </Text>
      </div>
    </EventsCard>
  );
};

export default EventCard;
