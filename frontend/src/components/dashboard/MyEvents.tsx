import React from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const MyEvents = ({ events, history }: any) => {
  const renderTooltip = (props: any) => (
    <Tooltip id='button-tooltip' {...props}>
      Click Event to Edit
    </Tooltip>
  );
  return (
    <Card className='w-100 bg-transparent d-flex flex-column p-2 my-2'>
      <Row>
        <Col className='my-3'>
          <h5>My Events</h5>
        </Col>
      </Row>
      <Row>
        <Col
          className='d-block'
          style={{
            overflow: 'hidden',
          }}
        >
          {events.map((event: any) => (
            <OverlayTrigger
              key={event._id}
              placement='left'
              delay={{ show: 0, hide: 0 }}
              overlay={renderTooltip}
              onEntering={(e: any) => {
                e.children[1].style.backgroundImage = event.background;
                e.children[1].style.color = event.color;
              }}
            >
              <Card
                style={{
                  backgroundImage: event.background,
                  color: event.color,
                  border: 'none',
                  maxWidth: '360px',
                  width: '100%',
                  margin: '1rem auto',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => history.push(`/admin/event/${event._id}/edit`)}
              >
                <Card.Img
                  src={event.image}
                  alt={`dashboard-event-${event._id}`}
                  style={{
                    height: '195px',
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <Card.Body className='p-3'>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle style={{ color: event.color }}>
                    {formatDate(event.date)}
                  </Card.Subtitle>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
              </Card>
            </OverlayTrigger>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          {events.length === 0 ? (
            <Link className='btn btn-light my-3' to='/admin/eventList'>
              Create an event
            </Link>
          ) : (
            <Row>
              <Col className='mx-3 my-4'>
                <Link to='/admin/myEvents'>See My Events</Link>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default MyEvents;
