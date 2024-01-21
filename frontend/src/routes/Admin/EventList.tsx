import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents } from '../../actions/eventActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
  GreenViewBinoculars,
} from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { EVENT_LIST_RESET } from '../../constants/eventConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

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
    return () => {
      dispatch({ type: EVENT_LIST_RESET });
    };
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
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Events'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Category'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      }
      box3={
        loading ? (
          <Spinner animation='border' size='sm' />
        ) : error || errorDelete ? (
          <Text fontFamily='Rust' fontSize='20px'>
            {error || errorDelete}
          </Text>
        ) : (
          <CreateLink to='/admin/event/id/edit' state={{ event }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal
            actionFunc='Event'
            show={show}
            handleClose={handleClose}
            id={id}
            publicId={imagePath}
          />
          <TableContainer>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>DEelete</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents?.map((event: any, i: number) => (
                  <Row key={event?._id} i={i}>
                    <td>{event?.title}</td>
                    <td>
                      <Image src={event?.image ?? defaultImages.upload} alt={event?.name} />
                    </td>
                    <td>{formatDate(event?.startDate)}</td>
                    <td>{formatDate(event?.endDate)}</td>
                    <td>{event?.status}</td>
                    <td>
                      <Link to={`/events/${event._id}`}>
                        <GreenViewBinoculars className='fa-solid fa-binoculars'></GreenViewBinoculars>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/event/${event?._id}/edit`} state={{ event, isEditMode: true }}>
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </Link>
                    </td>
                    <td>
                      {loadingDelete && id === event?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <RedDeleteTrash
                          onClick={() => {
                            setId(event?._id);
                            setImagePath(event?.image);
                            handleShow();
                          }}
                          className='fas fa-trash'
                        ></RedDeleteTrash>
                      )}
                    </td>
                  </Row>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
};

export default EventList;
