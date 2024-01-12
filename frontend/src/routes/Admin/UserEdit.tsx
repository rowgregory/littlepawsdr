import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import { useParams } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import Message from '../../components/Message';
import { Container, TableAndPaginationContainer } from '../../components/styles/admin/Styles';
import { GoBackAndTitleWrapper, WelcomeText } from '../../components/styles/DashboardStyles';
import GoBackBtn from '../../utils/GoBackBtn';
import { formatDateTime } from '../../utils/formatDateTime';

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const userId = id;

  const {
    userDetails: { error, isAdmin, name, email, updatedAt, createdAt },
    userUpdate: { error: errorUpdate, success: successUpdate },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getUserDetails(userId));
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch, userId, successUpdate]);

  return (
    <Container>
      <GoBackAndTitleWrapper>
        <GoBackBtn to='/admin/userList' color='#121212' />
        <WelcomeText>User Edit</WelcomeText>
      </GoBackAndTitleWrapper>
      {(error || errorUpdate) && <Message variant='danger'>{error || errorUpdate}</Message>}
      <TableAndPaginationContainer className='justify-content-start p-4'>
        <div>
          <Text className='d-flex'>
            Name:
            <Text fontWeight={400} marginLeft='8px'>
              {name}
            </Text>
          </Text>
          <Text className='d-flex'>
            Email:
            <Text fontWeight={400} marginLeft='8px'>
              {email}
            </Text>
          </Text>
          <Text className='d-flex'>
            Created At:
            <Text fontWeight={400} marginLeft='8px'>
              {formatDateTime(createdAt)}
            </Text>
          </Text>
          <Text className='d-flex'>
            Updated At:
            <Text fontWeight={400} marginLeft='8px'>
              {formatDateTime(updatedAt)}
            </Text>
          </Text>
        </div>
        <Form className='mt-4'>
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
        </Form>
      </TableAndPaginationContainer>
    </Container>
  );
};

export default UserEdit;
