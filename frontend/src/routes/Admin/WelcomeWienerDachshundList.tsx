import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Flex, Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
  GreenViewBinoculars,
  WelcomeWienerLink,
} from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import {
  listWelcomeWienerDachshunds,
  toggleWelcomeDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import shortenText from '../../utils/shortenText';
import { Link } from 'react-router-dom';
import { WELCOME_WIENER_DACHSHUND_LIST_RESET } from '../../constants/welcomeWienerDachshundConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

const WelcomeWienerDachshundList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loadingLiveMode = state.welcomeWienerDachshundToggle.loading;
  const dachshundList = state.welcomeWienerDachshundList.dachshundList;
  const error = state.welcomeWienerDachshundList.error;
  const loading = state.welcomeWienerDachshundList.loading;
  const loadingDelete = state.welcomeWienerDachshundDelete.loadingDelete;
  const errorDelete = state.welcomeWienerDachshundDelete.errorDelete;

  useEffect(() => {
    dispatch(listWelcomeWienerDachshunds());
    return () => {
      dispatch({ type: WELCOME_WIENER_DACHSHUND_LIST_RESET });
    };
  }, [dispatch, loadingLiveMode]);

  const filteredWelcomeWienerDachshunds = dachshundList?.filter((dachshund: any) =>
    dachshund?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const welcomeWienerDachshund = {
    displayUrl: defaultImages.upload,
    name: '',
    bio: '',
    age: '',
    associatedProducts: [],
  };

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Welcome Wiener Dachshunds'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Name'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      }
      box3={
        loading ? (
          <Spinner animation='border' size='sm' style={{ color: '#fff' }} />
        ) : error || errorDelete ? (
          <Text fontFamily='Rust' fontSize='20px'>
            {error || errorDelete}
          </Text>
        ) : (
          <CreateLink to={'/admin/welcome-wiener/dachshund/id/edit'} state={{ welcomeWienerDachshund }}>
            <AddIcon />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='Welcome Wiener Dachshund' show={show} handleClose={handleClose} id={id} />
          <TableContainer>
            <WelcomeWienerLink to='/admin/welcome-wiener/product/list'>
              Welcome Wiener Product List <i className='fa-solid fa-angles-right ml-2'></i>
            </WelcomeWienerLink>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Live</th>
                  <th>Image</th>
                  <th>Bio</th>
                  <th>Age</th>
                  <th>Associated Products</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredWelcomeWienerDachshunds?.map((dachshund: any, i: number) => (
                  <Row key={dachshund?._id} i={i}>
                    <td>{dachshund?.name}</td>
                    <td
                      onClick={() => {
                        dispatch(toggleWelcomeDachshund(dachshund?.isLive, dachshund?._id));
                        setId(dachshund?._id);
                      }}
                      style={{
                        color: dachshund?.isLive ? '#00a40e' : '#c6c6c6',
                        cursor: 'pointer'
                      }}
                    >
                      {loadingLiveMode && dachshund?._id === id ? (
                        <Spinner animation='border' size='sm' />
                      ) : dachshund?.isLive ? (
                        'LIVE'
                      ) : (
                        'OFFLINE'
                      )}
                    </td>
                    <td>
                      <Image src={dachshund?.displayUrl ?? defaultImages.upload} alt={dachshund?.name} />
                    </td>
                    <td>{shortenText(dachshund?.bio)}</td>
                    <td>{dachshund?.age}</td>
                    <td>
                      <Flex flexDirection='column'>
                        <ol className='mb-0'>
                          {dachshund?.associatedProducts?.map((obj: any, i: number) => (
                            <li
                              key={i}
                              style={{
                                fontFamily: 'Rust',
                              }}
                            >
                              {obj?.name}
                            </li>
                          ))}
                        </ol>
                      </Flex>
                    </td>
                    <td>
                      <Link to={`/welcome-wiener/${dachshund._id}`}>
                        <GreenViewBinoculars className='fa-solid fa-binoculars'></GreenViewBinoculars>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/welcome-wiener/dachshund/${dachshund?._id}/edit`}
                        state={{ dachshund, isEditMode: true }}
                      >
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </Link>
                    </td>
                    <td>
                      {loadingDelete && id === dachshund?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <RedDeleteTrash
                          onClick={() => {
                            setId(dachshund?._id);
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

export default WelcomeWienerDachshundList;
