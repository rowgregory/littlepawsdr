import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import DeleteModal from '../../components/DeleteModal';
import {
  SearchInput,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
} from '../../components/styles/admin/Styles';
import { USER_LIST_RESET } from '../../constants/userConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';
import { Text } from '../../components/styles/Styles';
import { OnlineCircle } from '../../components/svg/circle';
import { formatDateTime } from '../../utils/formatDateTime';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loading = state.userList.loading;
  const error = state.userList.error;
  const users = state.userList.users;
  const userInfo = state.userLogin.userInfo;
  const userDeleteSuccess = state.userDelete.success;
  const loadingDelete = state.userDelete.loading;
  const errorDelete = state.userDelete.error;

  useEffect(() => {
    dispatch(listUsers());
    return () => {
      dispatch({ type: USER_LIST_RESET });
    };
  }, [dispatch, userDeleteSuccess]);

  users?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  const filteredUsers = users?.filter((user: any) => user.email.toLowerCase().includes(text.toLowerCase()));

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Users'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Email'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      }
      box3={
        loading ? (
          <Spinner animation='border' size='sm' />
        ) : (
          error ||
          (errorDelete && (
            <Text fontFamily='Rust' fontSize='20px'>
              {error || errorDelete}
            </Text>
          ))
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='User' show={show} handleClose={handleClose} id={id} />
          <TableContainer>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>ONLINE</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>DATE CREATED</th>
                  <th>ADMIN</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map(
                  (user: any, i: number) =>
                    user.email !== 'it.little.paws@gmail.com' && (
                      <Row key={user?._id} i={i}>
                        <td>
                          <OnlineCircle online={user.online} />
                        </td>
                        <td>{user?.name}</td>
                        <td>
                          <a href={`mailto: ${user?.email}`}>{user.email}</a>
                        </td>
                        <td>{formatDateTime(user?.createdAt)}</td>
                        <td>
                          {user?.isAdmin ? (
                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td>
                          {user?.email !== userInfo?.email && (
                            <Link to={`/admin/user/${user?._id}/edit`}>

                              <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>

                            </Link>
                          )}
                        </td>
                        <td>
                          {user?.email !== userInfo?.email && loadingDelete && id === user?._id ? (
                            <Spinner size='sm' animation='border' />
                          ) : (
                            <RedDeleteTrash
                              onClick={() => {
                                setId(user?._id);
                                handleShow();
                              }}
                              className='fas fa-trash'
                            ></RedDeleteTrash>
                          )}
                        </td>
                      </Row>
                    )
                )}
              </tbody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
};

export default UserList;
