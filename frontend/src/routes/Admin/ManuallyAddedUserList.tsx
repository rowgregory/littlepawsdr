import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { listManuallyAddedUsers } from '../../actions/manuallyAddUserActions';
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
  TableImg,
  CreateLink,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { MANUALLY_ADD_USER_LIST_RESET } from '../../constants/manuallyAddUserConstants';

const ManuallyAddedUserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loading = state.manuallyAddedUserList.loading;
  const error = state.manuallyAddedUserList.error;
  const manuallyAddedUsers = state.manuallyAddedUserList.manuallyAddedUsers;
  const loadingDelete = state.manuallyAddedUserDelete.loading;
  const errorDelete = state.manuallyAddedUserDelete.error;
  const successDelete = state.manuallyAddedUserDelete.success;

  useEffect(() => {
    dispatch(listManuallyAddedUsers());
    return () => { dispatch({ type: MANUALLY_ADD_USER_LIST_RESET }) }
  }, [dispatch, successDelete]);

  manuallyAddedUsers?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredManuallyAddedUsers = manuallyAddedUsers?.filter(
    (manuallyAddedUser: any) =>
      manuallyAddedUser.name.toLowerCase().includes(text.toLowerCase())
  );

  const manuallyAddedUser = {
    name: '',
    affiliation: '',
    email: '',
    image: defaultImages.upload,
    profileCardTheme: '',
    location: '',
    bio: '',
  };

  return (
    <Container>
      <WelcomeText>Board Members</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Board Members'
        step4={manuallyAddedUsers?.length ?? 0}
        url1='/'
        url2='/admin'
        url3='/admin/manuallyAddedUserList'
      />
      <DeleteModal
        actionFunc='Board Member'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={imagePath}
      />
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      <TableWrapper>
        <TopRow className='mb-3'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by ID'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateLink
            to='/admin/manuallyAddedUser/id/edit'
            state={{ manuallyAddedUser }}
          >
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>CARD THEME</th>
                <th>EMAIL</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredManuallyAddedUsers?.map((manuallyAddedUser: any) => (
                <TableRow key={manuallyAddedUser?._id}>
                  <td>
                    <Text>{manuallyAddedUser?.name}</Text>
                  </td>
                  <td>
                    <TableImg
                      src={manuallyAddedUser?.image ?? defaultImages.upload}
                      alt={manuallyAddedUser?.name}
                    />
                  </td>
                  <td>
                    <TableImg
                      src={manuallyAddedUser?.profileCardTheme}
                      alt={manuallyAddedUser?.name}
                    />
                  </td>
                  <td>
                    <Text>{manuallyAddedUser?.email}</Text>
                  </td>
                  <td>
                    <Link
                      to={`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`}
                      state={{ manuallyAddedUser, isEditMode: true }}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </Link>
                  </td>
                  <td>
                    <StyledEditBtn
                      onClick={() => {
                        setId(manuallyAddedUser?._id);
                        setImagePath(manuallyAddedUser?.image);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === manuallyAddedUser?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <i
                          style={{ color: '#cc0000' }}
                          className='fas fa-trash'
                        ></i>
                      )}
                    </StyledEditBtn>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default ManuallyAddedUserList;
