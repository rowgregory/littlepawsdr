import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
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
import Message from '../../components/Message';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';

const EventList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

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

  const filteredEvents = events?.filter((event: any) =>
    event.title.toLowerCase().includes(text.toLowerCase())
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
            <Link to={'/admin/event/id/edit'} state={{ event }}>
              <CreateBtnV2>
                <AddIcon />
                Create
              </CreateBtnV2>
            </Link>
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
                    <TableImg
                      src={event?.image ?? defaultImages.upload}
                      alt={event?.name}
                    />
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
                    <Link
                      to={`/admin/event/${event?._id}/edit`}
                      state={{ event, isEditMode: true }}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </Link>
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
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default EventList;
