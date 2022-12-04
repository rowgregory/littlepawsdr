import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents, createEvent } from '../../actions/eventActions';
import { EVENT_CREATE_RESET } from '../../constants/eventConstants';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router';
import {
  SearchBar,
  TableHead,
  TableRow,
  StyledEditBtn,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  CreateBtnV2,
  TableImg,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { formatDate } from '../../utils/formatDate';
import { AddIcon } from '../../components/svg/AddIcon';

const EventList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const {
    eventList: { loading, error, events },
    eventCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      event: createdEvent,
    },
    eventDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: EVENT_CREATE_RESET });
    if (successCreate) {
      history.push({
        pathname: `/admin/event/${createdEvent._id}/edit`,
        state: { createdEvent },
      });
    } else {
      dispatch(listEvents());
    }
  }, [dispatch, history, successCreate, createdEvent, successDelete]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(events?.slice(indexOfFirstItem, indexOfLastItem));
  }, [events, paginatedPage]);

  const createEventHandler = () => {
    dispatch(createEvent());
  };

  const filteredEvents =
    text !== ''
      ? events?.filter((event: any) =>
          event.title.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((event: any) =>
          event?.title?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Events</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Events'
        url1='/'
        url2='/admin'
        url3='/admin/eventList'
      />
      <DeleteModal
        actionFunc='Event'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(error || errorCreate || errorDelete) && (
        <Message variant='danger'>
          {error || errorCreate || errorDelete}
        </Message>
      )}
      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createEventHandler}>
            <AddIcon />
            {loadingCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Create'
            )}
          </CreateBtnV2>
        </TopRow>

        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredEvents?.map((event: any) => (
                <TableRow key={event?._id}>
                  <td>
                    <Text>{event?.title}</Text>
                  </td>
                  <td>
                    <TableImg src={event?.image} alt={event?.name} />
                  </td>
                  <td>
                    <Text>
                      {event?.startDate && formatDate(event?.startDate)} -{' '}
                      {event?.endDate && formatDate(event?.endDate)}
                    </Text>
                  </td>
                  <td>
                    <Text>{event?.status}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/event/${event?._id}/edit`,
                        state: { event },
                      }}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </LinkContainer>
                  </td>
                  <td>
                    <StyledEditBtn
                      className='border-0'
                      onClick={() => {
                        setId(event?._id);
                        setPublicId(event?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === event?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <i
                          style={{ color: '#cc0000' }}
                          className='fas fa-trash'
                        ></i>
                      )}
                    </StyledEditBtn>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(events, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default EventList;
