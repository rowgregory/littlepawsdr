import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from '../../constants/userConstants';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import Message from '../../components/Message';
import {
  Container,
  TableAndPaginationContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';

const UserEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = match.params.id;
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    userDetails: { loading, error, user },
    userUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(getUserDetails(userId));
    dispatch({ type: USER_UPDATE_RESET });
  }, [dispatch, userId]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userList');
    } else {
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, user, successUpdate]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        isAdmin,
      })
    );
  };

  return (
    <Container>
      <WelcomeText className='mb-1'>User Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Users'
        step4={user?.name}
        step5={user?.isAdmin ? 'Admin' : 'Not Admin'}
        url1='/'
        url2='/admin'
        url3='/admin/userList'
      />
      {(error || errorUpdate) && (
        <Message variant='danger'>{error || errorUpdate}</Message>
      )}
      <TableAndPaginationContainer
        style={{ justifyContent: 'flex-start', padding: '20px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
          <Text className='d-flex'>
            Name:{' '}
            <Text fontWeight={400} marginLeft='8px'>
              {' '}
              {user?.name}
            </Text>
          </Text>
          <Text className='d-flex'>
            Email:{' '}
            <Text fontWeight={400} marginLeft='8px'>
              {' '}
              {user?.email}
            </Text>
          </Text>
        </div>
        <Form onSubmit={submitHandler} className='mt-4'>
          <Form.Group className='d-flex align-items-center' controlId='isAdmin'>
            <Form.Check
              type='switch'
              checked={isAdmin || false}
              onChange={(e: any) => setIsAdmin(e.target.checked)}
            ></Form.Check>
            <Form.Label className='mb-0'>
              <Text>Is Admin</Text>
            </Form.Label>
          </Form.Group>
          <UpdateBtn type='submit'>
            <Text className='text-white'>
              Updat{loadingUpdate || loading ? 'ing...' : 'e'}
            </Text>
          </UpdateBtn>
        </Form>
      </TableAndPaginationContainer>
    </Container>
  );
};

export default UserEdit;
