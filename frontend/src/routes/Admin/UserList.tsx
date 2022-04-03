import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listUsers } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import DeleteModal from '../../components/DeleteModal';
import { OnlineCircle } from '../../components/svg/circle';
import { StyledEditBtn, TableBody, Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const UserList = ({ history }: any) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usersSet, setUsers] = useState([]) as any;

  const userList = useSelector((state: any) => state.userList);
  const {
    // loading,
    error,
    users,
  } = userList;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state: any) => state.userDelete);
  const { success: successDelete, loading: loadingDelete } = userDelete;

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users]);

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, history, successDelete]);

  const filteredUsers = usersSet?.filter((user: any) =>
    user.email.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='User'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by name'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
      </Col>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-sm'>
            <TableHead>
              <tr>
                <th>ONLINE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>VOLUNTEERS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {filteredUsers?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredUsers?.map((user: any) => (
                  <CSSTransition
                    key={user?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
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
                        {user?.isVolunteer ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {user?.email !== userInfo?.email && (
                          <LinkContainer to={`/admin/user/${user?._id}/edit`}>
                            <StyledEditBtn className='btn-lg'>
                              <i className='fas fa-edit'></i>
                            </StyledEditBtn>
                          </LinkContainer>
                        )}
                      </td>
                      <td>
                        {user?.email !== userInfo?.email && (
                          <Button
                            variant='danger'
                            className='btn-lg border-0'
                            onClick={() => {
                              setId(user?._id);
                              handleShow();
                            }}
                          >
                            {loadingDelete && id === user?._id ? (
                              <Spinner size='sm' animation='border' />
                            ) : (
                              <i className='fas fa-trash'></i>
                            )}
                          </Button>
                        )}
                      </td>
                    </TableRow>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default UserList;
