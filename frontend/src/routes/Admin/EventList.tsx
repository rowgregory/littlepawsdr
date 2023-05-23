import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents } from '../../actions/eventActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
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
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import Message from '../../components/Message';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { formatDate } from '../../utils/formatDate';

const EventList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  const loading = state.eventList.loading;
  const error = state.eventList.error;
  const events = state.eventList.events;

  const loadingDelete = state.eventDelete.loading;
  const errorDelete = state.eventDelete.error;
  const successDelete = state.eventDelete.success;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch, successDelete]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(events?.slice(indexOfFirstItem, indexOfLastItem));
  }, [events, paginatedPage]);

  const filteredEvents =
    text !== ''
      ? events?.filter((event: any) =>
          event.title.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((event: any) =>
          event?.title?.toLowerCase().includes(text.toLowerCase())
        );

  const event = {
    title: '',
    externalLink: '',
    description: '',
    startDate: '',
    endDate: '',
    image: defaultImages.upload,
    background: '',
    color: '',
  };

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
        publicId={imagePath}
      />
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          {loading ? (
            <SpinnerContainer>
              <Spinner animation='border' size='sm' />
            </SpinnerContainer>
          ) : (
            <LinkContainer
              to={{
                pathname: '/admin/event/id/edit',
                state: { event },
              }}
            >
              <CreateBtnV2>
                <AddIcon />
                Create
              </CreateBtnV2>
            </LinkContainer>
          )}
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>START DATE</th>
                <th>END DATE</th>
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
                    <Text>{formatDate(event?.startDate)}</Text>
                  </td>
                  <td>
                    <Text>{formatDate(event?.endDate)}</Text>
                  </td>
                  <td>
                    <Text>{event?.status}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/event/${event?._id}/edit`,
                        state: { event, isEditMode: true },
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
                        setImagePath(event?.image);
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
