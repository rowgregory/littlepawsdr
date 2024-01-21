import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { listManuallyAddedUsers } from '../../actions/manuallyAddUserActions';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
} from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { MANUALLY_ADD_USER_LIST_RESET } from '../../constants/manuallyAddUserConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

const ManuallyAddedUserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loading = state.manuallyAddedUserList.loading;
  const error = state.manuallyAddedUserList.error;
  const manuallyAddedUsers = state.manuallyAddedUserList.manuallyAddedUsers;
  const loadingDelete = state.manuallyAddedUserDelete.loading;
  const errorDelete = state.manuallyAddedUserDelete.error;
  const successDelete = state.manuallyAddedUserDelete.success;

  useEffect(() => {
    dispatch(listManuallyAddedUsers());
    return () => {
      dispatch({ type: MANUALLY_ADD_USER_LIST_RESET });
    };
  }, [dispatch, successDelete]);

  const filteredManuallyAddedUsers = manuallyAddedUsers?.filter((manuallyAddedUser: any) =>
    manuallyAddedUser.name.toLowerCase().includes(text.toLowerCase())
  );

  const manuallyAddedUser = {
    name: '',
    affiliation: '',
    email: '',
    image: defaultImages.upload,
    profileCardTheme: '',
    location: '',
    bio: '',
  };

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Board Members'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by ID'
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
          <CreateLink to='/admin/manuallyAddedUser/id/edit' state={{ manuallyAddedUser }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal
            actionFunc='Board Member'
            show={show}
            handleClose={handleClose}
            id={id}
            publicId={imagePath}
          />
          <TableContainer>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredManuallyAddedUsers?.map((manuallyAddedUser: any, i: number) => (
                  <Row key={manuallyAddedUser?._id} i={i}>
                    <td>{manuallyAddedUser?.name}</td>
                    <td>
                      <Image
                        src={manuallyAddedUser?.image ?? defaultImages.upload}
                        alt={manuallyAddedUser?.name}
                      />
                    </td>
                    <td>{manuallyAddedUser?.email}</td>
                    <td>
                      <Link
                        to={`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`}
                        state={{ manuallyAddedUser, isEditMode: true }}
                      >
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </Link>
                    </td>
                    <td>
                      {loadingDelete && id === manuallyAddedUser?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <RedDeleteTrash
                          onClick={() => {
                            setId(manuallyAddedUser?._id);
                            setImagePath(manuallyAddedUser?.image);
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

export default ManuallyAddedUserList;
