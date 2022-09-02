import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import GoBackBtn from '../../utils/GoBackBtn';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

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

  useEffect(() => {
    if (error || errorUpdate) {
      toaster.notify(
        ({ onClose }) => ToastAlert(error || errorUpdate, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, error]);

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

  return error ? (
    <></>
  ) : (
    <>
      <GoBackBtn to='/admin/userList' />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
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
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='100%' h='2.5rem' />
            </div>
          ) : (
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
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='10rem' h='2.5rem' />
            </div>
          ) : (
            <Form.Group
              className='d-flex align-items-center'
              controlId='isAdmin'
            >
              <Form.Check
                type='switch'
                checked={isAdmin}
                onChange={(e: any) => setIsAdmin(e.target.checked)}
              ></Form.Check>
              <Form.Label className='mb-0'>Is Admin</Form.Label>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-3'>
              <LoadingImg w='10rem' h='2.5rem' />
            </div>
          ) : (
            <Form.Group
              className='d-flex align-items-center'
              controlId='isVolunteer'
            >
              <Form.Check
                type='switch'
                checked={isVolunteer}
                onChange={(e: any) => setIsVolunteer(e.target.checked)}
              ></Form.Check>
              <Form.Label className='mb-0'>Is Volunteer</Form.Label>
            </Form.Group>
          )}
          {loading ? (
            <LoadingImg h='2.5rem' w='5rem' borderRadius='0.5rem' />
          ) : (
            <UpdateBtn type='submit'>
              {loadingUpdate ? (
                <div className='d-flex align-items-center'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <Text className='text-white ml-2'>Updating...</Text>
                </div>
              ) : (
                <Text className='text-white'>Update</Text>
              )}
            </UpdateBtn>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEdit;
