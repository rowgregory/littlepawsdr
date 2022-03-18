import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listEvents, createEvent } from '../../actions/eventActions';
import { EVENT_CREATE_RESET } from '../../constants/eventConstants';
import DeleteModal from '../../components/DeleteModal';
import { StyledEditBtn, TableBody, Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const EventList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventsList, setEvents] = useState([]) as any;

  const eventList = useSelector((state: any) => state.eventList);
  const {
    // loading,
    error,
    events,
  } = eventList;

  const eventCreate = useSelector((state: any) => state.eventCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate;

  const eventDelete = useSelector((state: any) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  useEffect(() => {
    if (events) {
      setEvents(events);
    }
  }, [events]);

  useEffect(() => {
    dispatch({ type: EVENT_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/event/${createdEvent._id}/edit`);
    } else {
      dispatch(listEvents());
    }
  }, [dispatch, history, successCreate, createdEvent, successDelete]);

  const createEventHandler = () => {
    dispatch(createEvent());
  };

  const filteredEvents = eventsList?.filter((event: any) =>
    event.title.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='Event'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(errorDelete || errorCreate) && (
        <Message variant='danger'>{errorCreate || errorDelete}</Message>
      )}

      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by title'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
        <CreateBtn onClick={createEventHandler}>
          {loadingCreate ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <i className='fas fa-plus fa-2x'></i>
          )}
        </CreateBtn>
      </Col>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {events?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Click the plus to create an event.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredEvents?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredEvents?.map((event: any) => (
                  <CSSTransition
                    key={event?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{event?._id}</Text>
                      </td>
                      <td>
                        <Text>{event?.title}</Text>
                      </td>
                      <td>
                        <TableImg src={event?.image} alt={event?.name} />
                      </td>
                      <td>
                        <Text style={{ wordBreak: 'break-all' }}>
                          {event?.description}
                        </Text>
                      </td>
                      <td>
                        <Text>{event?.status}</Text>
                      </td>
                      <td>
                        <LinkContainer to={`/admin/event/${event?._id}/edit`}>
                          <StyledEditBtn className='btn-lg'>
                            <i className='fas fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-lg border-0'
                          onClick={() => {
                            setId(event?._id);
                            setPublicId(event?.publicId);
                            handleShow();
                          }}
                        >
                          {loadingDelete && id === event?._id ? (
                            <Spinner size='sm' animation='border' />
                          ) : (
                            <i className='fas fa-trash'></i>
                          )}
                        </Button>
                      </td>
                    </TableRow>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default EventList;
