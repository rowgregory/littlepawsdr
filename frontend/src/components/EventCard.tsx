import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';

const EventsCard = styled(Card)`
  max-width: 360px;
  width: 100%;
  border: none;
  transition: box-shadow 500ms ease;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  > div {
    > div {
      > div {
        img {
          object-fit: cover;
          object-position: 0 10px;
          height: 260px;
        }
      }
    }
  }
`;

interface TextProps {
  bgcolor?: string;
  fontcolor?: string;
}

const DescriptionText = styled(Card.Text)<TextProps>`
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  background-image: ${({ bgcolor, fontcolor }) =>
    bgcolor
      ? `linear-gradient(to bottom, ${fontcolor} 0%, ${bgcolor} 100%)`
      : ''};
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

const ReadMoreText = styled(Button)`
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);

  transition: all 500ms ease;
  :hover {
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.4),
      0px -5px 35px rgba(255, 255, 255, 0.4);
  }
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
  const colorTextFade =
    event !== undefined
      ? event.background.split(',')[1].trim().slice(0, 7)
      : '';

  return (
    <EventsCard
      onClick={() => history.push(`/events/${event._id}`)}
      key={event._id}
      className='m-3 d-flex'
      style={{
        backgroundImage: event.background,
      }}
    >
      <Ribbon className='ribbon ribbon-top-right' status={event.status}>
        <span>{event.status}</span>
      </Ribbon>
      <Card.Body className='p-3'>
        <Text3D
          fonttitlecolor={event.color}
          style={{
            height: event.title.split('').length >= 25 ? '60px' : 'auto',
            color: event.color,
          }}
        >
          {event.title}
        </Text3D>
        <DescriptionText
          className='mb-0'
          bgcolor={
            event.description.split('').length > 100
              ? colorTextFade
              : event.color
          }
          fontcolor={event.color}
          style={{
            color: event.color,
            height:
              event.title.split('').length < 25
                ? '102px'
                : event.description.split('').length <= 100
                ? '72px'
                : 'auto',
          }}
        >
          {event.description.split('').length > 100
            ? `${event.description
                .split('')
                .filter((_: any, c: number) => c < 100)
                .join('')} ...`
            : event.description}
        </DescriptionText>
        <Col className='d-flex justify-content-center'>
          <ReadMoreText
            className='btn m-0 p-0 bg-transparent'
            style={{ color: event.color, border: 'none' }}
          >
            READ MORE
          </ReadMoreText>
        </Col>
      </Card.Body>
    </EventsCard>
  );
};

export default EventCard;