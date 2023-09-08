import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import DeleteModal from '../../components/DeleteModal';
import { OnlineCircle } from '../../components/svg/circle';
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
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { formatDateTime } from '../../utils/formatDateTime';

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
  const userDeleteLoading = state.userDelete.loading;
  const userDeleteError = state.userDelete.error;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, userDeleteSuccess]);

  const filteredUsers = users?.filter((user: any) =>
    user.email.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <Container>
      <WelcomeText className='mb-1'>Users</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Users'
        step4={users?.length}
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
        <TopRow className='mb-3'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          {userListLoading && (
            <SpinnerContainer>
              <Spinner animation='border' size='sm' />
            </SpinnerContainer>
          )}
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
              {filteredUsers
                ?.slice()
                ?.reverse()
                ?.map(
                  (user: any) =>
                    user.email !== 'it.little.paws@gmail.com' && (
                      <TableRow key={user?._id}>
                        <td>
                          <OnlineCircle online={user.online} />
                        </td>
                        <td>
                          <Text>{user?.name}</Text>
                        </td>
                        <td>
                          <Text>
                            <a href={`mailto: ${user?.email}`}>{user.email}</a>
                          </Text>
                        </td>
                        <td>
                          <Text>{formatDateTime(user?.createdAt)}</Text>
                        </td>
                        <td>
                          {user?.isAdmin ? (
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}{' '}
                        </td>
                        <td>
                          {user?.email !== userInfo?.email && (
                            <LinkContainer to={`/admin/user/${user?._id}/edit`}>
                              <StyledEditBtn>
                                <i
                                  style={{ color: '#9761aa' }}
                                  className='fas fa-edit'
                                ></i>
                              </StyledEditBtn>
                            </LinkContainer>
                          )}
                        </td>
                        <td>
                          {user?.email !== userInfo?.email && (
                            <StyledEditBtn
                              className='border-0'
                              onClick={() => {
                                setId(user?._id);
                                handleShow();
                              }}
                            >
                              {userDeleteLoading && id === user?._id ? (
                                <Spinner size='sm' animation='border' />
                              ) : (
                                <i
                                  style={{ color: '#cc0000' }}
                                  className='fas fa-trash'
                                ></i>
                              )}
                            </StyledEditBtn>
                          )}
                        </td>
                      </TableRow>
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
