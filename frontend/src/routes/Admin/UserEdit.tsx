import { useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import { useParams } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import { formatDateTime } from '../../utils/formatDateTime';
import UserEditLayout from '../../components/dashboard/dashboard2024/layouts/UserEditLayout';

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const userId = id;

  const {
    userDetails: {
      isAdmin,
      name,
      email,
      updatedAt,
      createdAt,
      error: errorUserDetails,
      loading: loadingUserDetails,
    },
    userUpdate: { error: errorUserUpdate, success: successUpdate, loading: loadingUserUpdate },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getUserDetails(userId));
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch, userId, successUpdate]);

  return (
    <UserEditLayout
      error={errorUserDetails || errorUserUpdate}
      box1={<Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
        User Edit
      </Text>}
      box2={
        <GoBackBtn to='/admin/userList' color='#121212' />

      }
      box3={
        loadingUserDetails || loadingUserUpdate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          (errorUserDetails || errorUserUpdate) && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUserDetails || errorUserUpdate}
            </Text>
          )
        )
      }
      box4={
        <Text className='d-flex'>
          Name:
          <Text fontWeight={400} marginLeft='8px'>
            {name}
          </Text>
        </Text>
      }
      box5={
        <Text className='d-flex'>
          Email:
          <Text fontWeight={400} marginLeft='8px'>
            {email}
          </Text>
        </Text>
      }
      box6={
        <Text className='d-flex'>
          Created At:
          <Text fontWeight={400} marginLeft='8px'>
            {formatDateTime(createdAt)}
          </Text>
        </Text>
      }
      box7={
        <Text className='d-flex'>
          Updated At:
          <Text fontWeight={400} marginLeft='8px'>
            {formatDateTime(updatedAt)}
          </Text>
        </Text>
      }
      box8={
        <Form.Group className='d-flex align-items-center' controlId='isAdmin'>
          <Form.Check
            type='switch'
            checked={isAdmin || false}
            onChange={(e: any) => {
              dispatch(
                updateUser({
                  _id: userId,
                  isAdmin: e.target.checked,
                  name,
                  email,
                })
              );
            }}
          ></Form.Check>
          <Form.Label className='mb-0'>
            <Text>Is Admin</Text>
          </Form.Label>
        </Form.Group>
      }
    />
  );
};

export default UserEdit;
