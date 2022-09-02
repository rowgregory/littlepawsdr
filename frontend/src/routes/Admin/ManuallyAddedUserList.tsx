import React, { useEffect, useState } from 'react';
import { Col, Form, Table, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
  StyledEditBtn,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listManuallyAddedUsers,
  manuallyAddUser,
} from '../../actions/manuallyAddUserActions';
import { MANUALLY_ADD_USER_CREATE_RESET } from '../../constants/manuallyAddUserConstants';
import { LoadingImg } from '../../components/LoadingImg';

const ManuallyAddedUserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listOfManuallyAddedUsers, setListOfManuallyAddedUsers] = useState(
    []
  ) as any;

  const manuallyAddedUserList = useSelector(
    (state: any) => state.manuallyAddedUserList
  );
  const { loading, error, manuallyAddedUsers } = manuallyAddedUserList;

  const manuallyAddedUserCreate = useSelector(
    (state: any) => state.manuallyAddedUserCreate
  );
  const {
    loading: loadingManuallyAddedUserCreate,
    error: errorCreate,
    success: successManuallyAddedUserCreate,
    manuallyAddedUser,
  } = manuallyAddedUserCreate;

  const manuallyAddedUserDelete = useSelector(
    (state: any) => state.manuallyAddedUserDelete
  );
  const {
    loading: loadingManuallyAddedUserDelete,
    error: errorDelete,
    success: successManuallyAddedUserDelete,
  } = manuallyAddedUserDelete;

  useEffect(() => {
    if (manuallyAddedUsers) {
      setListOfManuallyAddedUsers(manuallyAddedUsers);
    }
  }, [manuallyAddedUsers]);

  useEffect(() => {
    dispatch({ type: MANUALLY_ADD_USER_CREATE_RESET });
    if (successManuallyAddedUserCreate) {
      history.push(`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`);
    } else {
      dispatch(listManuallyAddedUsers());
    }
  }, [
    dispatch,
    history,
    manuallyAddedUser,
    successManuallyAddedUserCreate,
    successManuallyAddedUserDelete,
  ]);

  useEffect(() => {
    if (error || errorCreate || errorDelete) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(error || errorCreate || errorDelete, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [error, errorCreate, errorDelete]);

  const filteredManuallyAddedUsers = listOfManuallyAddedUsers?.filter(
    (blog: any) => blog.name.toLowerCase().includes(text.toLowerCase())
  );
  return error ? (
    <></>
  ) : (
    <>
      <DeleteModal
        actionFunc='Manually Added User'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />

      {loading ? (
        <Col className='mb-3 d-flex justify-content-between align-items-center'>
          <LoadingImg w='20rem' h='2.5rem' />
          <LoadingImg w='2.5rem' h='2.5rem' borderRadius='50%' />
        </Col>
      ) : (
        <Col className='d-flex align-items-center justify-content-between'>
          <SearchBar>
            <Form.Control
              as='input'
              type='text'
              placeholder='Search by ID'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></Form.Control>
          </SearchBar>
          <CreateBtn onClick={() => dispatch(manuallyAddUser())}>
            {loadingManuallyAddedUserCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              <i className='fas fa-plus'></i>
            )}
          </CreateBtn>
        </Col>
      )}
      <Col>
        <Table hover responsive className='table-sm'>
          <TableHead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>AFFILIATION</th>
              <th>MESSAGE</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </TableHead>
          <TransitionGroup component='tbody'>
            {filteredManuallyAddedUsers?.map((manuallyAddedUser: any) => (
              <CSSTransition
                key={manuallyAddedUser?._id}
                timeout={500}
                classNames='item'
              >
                <TableRow>
                  <td>
                    <Text>{manuallyAddedUser?._id}</Text>
                  </td>
                  <td>
                    <Text>{manuallyAddedUser?.name}</Text>
                  </td>
                  <td>
                    <TableImg
                      src={manuallyAddedUser?.image}
                      alt={manuallyAddedUser?.name}
                    />
                  </td>
                  <td>
                    <Text>{manuallyAddedUser?.affiliation}</Text>
                  </td>
                  <td>
                    <Text>{manuallyAddedUser?.message}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`}
                    >
                      <StyledEditBtn>
                        <i className='fas fa-edit'></i>
                      </StyledEditBtn>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='border-0'
                      onClick={() => {
                        setId(manuallyAddedUser?._id);
                        setPublicId(manuallyAddedUser?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingManuallyAddedUserDelete &&
                      id === manuallyAddedUser?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <i className='fas fa-trash'></i>
                      )}
                    </Button>
                  </td>
                </TableRow>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </Col>
    </>
  );
};

export default ManuallyAddedUserList;
