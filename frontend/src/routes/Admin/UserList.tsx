import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner, Pagination } from 'react-bootstrap';
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
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';

const UserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    userList: { loading, error, users },
    userLogin: { userInfo },
    userDelete: {
      success: successDelete,
      loading: loadingDelete,
      error: errorDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(users?.slice(indexOfFirstItem, indexOfLastItem));
  }, [users, paginatedPage]);

  const filteredUsers =
    text !== ''
      ? users?.filter((user: any) =>
          user.email.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((user: any) =>
          user.email.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Users</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Users'
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
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      {(loading || loadingDelete) && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
        </TopRow>

        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>ONLINE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredUsers
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
                              {loadingDelete && id === user?._id ? (
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
                )
                .reverse()}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(users, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default UserList;
