import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';

const FormControl = styled(Form.Control)`
  :disabled {
    background: ${({ theme }) => theme.input.bg};
    opacity: 0.5;
  }
  :focus,
  :active {
    box-shadow: none !important;
    border: none !important;
  }
`;

const DefaultAvatar =
  'https://res.cloudinary.com/doyd0ewgk/image/upload/v1611718776/profile_blank.png';

const UserEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state: any) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userList');
    } else if (user === undefined || !user?.name || user?._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsVolunteer(user.isVolunteer);
    }
  }, [dispatch, history, successUpdate, user, userId]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        isVolunteer,
        avatar:
          !user.isAdmin && !user.isVolunteer ? DefaultAvatar : user.avatar,
      })
    );
  };

  return (
    <>
      <GoBackBtn to='/admin/userList' />
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <FormControl
                disabled={true}
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <FormControl
                disabled={true}
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='switch'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e: any) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId='isVolunteer'>
              <Form.Check
                type='switch'
                label='Is Volunteer'
                checked={isVolunteer}
                onChange={(e: any) => setIsVolunteer(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
