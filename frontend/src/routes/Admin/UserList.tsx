import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import DeleteModal from '../../components/DeleteModal';
import {
  SearchBar,
  TableHead,
  TopRow,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import MemoizedTableRow from '../../components/admin/users/MemoizedTableRow';
import { USER_LIST_RESET } from '../../constants/userConstants';

const UserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const userListLoading = state.userList.loading;
  const userListError = state.userList.error;
  const users = state.userList.users;
  const userInfo = state.userLogin.userInfo;
  const userDeleteSuccess = state.userDelete.success;
  const userDeleteError = state.userDelete.error;

  useEffect(() => {
    dispatch(listUsers());
    return () => {
      dispatch({ type: USER_LIST_RESET });
    };
  }, [dispatch, userDeleteSuccess]);

  const filteredUsers = users?.filter((user: any) =>
    user.email.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <Container>
      <WelcomeText>Users</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Users'
        step4={users?.length ?? 0}
        url1='/'
        url2='/admin'
        url3=''
      />
      <DeleteModal
        actionFunc='User'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {(userListError || userDeleteError) && (
        <Message variant='danger'>{userListError || userDeleteError}</Message>
      )}
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
            {userListLoading && (
              <Spinner
                animation='border'
                size='sm'
                style={{ position: 'absolute', right: '10px', top: '15px' }}
              />
            )}
          </SearchBar>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive size='sm'>
            <TableHead>
              <tr>
                <th>ONLINE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DATE CREATED</th>
                <th>ADMIN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredUsers?.map(
                (user: any) =>
                  user.email !== 'it.little.paws@gmail.com' && (
                    <MemoizedTableRow
                      user={user}
                      userInfo={userInfo}
                      handleShow={handleShow}
                      setId={setId}
                      id={id}
                      key={user?._id}
                    />
                  )
              )}
            </tbody>
          </Table>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default UserList;
