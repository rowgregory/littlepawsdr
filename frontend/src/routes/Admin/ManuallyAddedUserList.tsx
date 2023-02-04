import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { MANUALLY_ADD_USER_CREATE_RESET } from '../../constants/manuallyAddUserConstants';
import {
  listManuallyAddedUsers,
  manuallyAddUser,
} from '../../actions/manuallyAddUserActions';
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
  CreateBtnV2,
  TableImg,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { AddIcon } from '../../components/svg/AddIcon';
import { LinkContainer } from 'react-router-bootstrap';

const ManuallyAddedUserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const {
    manuallyAddedUserList: { loading, error, manuallyAddedUsers },
    manuallyAddedUserCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      manuallyAddedUser,
    },
    manuallyAddedUserDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: MANUALLY_ADD_USER_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`);
    } else {
      dispatch(listManuallyAddedUsers());
    }
  }, [dispatch, history, manuallyAddedUser, successCreate, successDelete]);

  manuallyAddedUsers?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(
      manuallyAddedUsers?.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [manuallyAddedUsers, paginatedPage]);

  const createManuallyAddedUserHandler = () => {
    dispatch(manuallyAddUser());
  };

  const filteredManuallyAddedUsers =
    text !== ''
      ? manuallyAddedUsers?.filter((blog: any) =>
          blog.name.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((blog: any) =>
          blog.name.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Board Members</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Board Members'
        url1='/'
        url2='/admin'
        url3='/admin/manuallyAddedUserList'
      />
      <DeleteModal
        actionFunc='Board Member'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(error || errorCreate || errorDelete) && (
        <Message variant='danger'>
          {error || errorCreate || errorDelete}
        </Message>
      )}
      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by ID'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createManuallyAddedUserHandler}>
            <AddIcon />
            {loadingCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Create'
            )}
          </CreateBtnV2>
          <Link
            className='mb-3'
            to={{
              pathname: '/about/team-members',
              state: { from: 'dashboard' },
            }}
          >
            View public profiles
          </Link>
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
                      src={manuallyAddedUser?.image}
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
                    <LinkContainer
                      to={`/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </LinkContainer>
                  </td>
                  <td>
                    <StyledEditBtn
                      className='border-0'
                      onClick={() => {
                        setId(manuallyAddedUser?._id);
                        setPublicId(manuallyAddedUser?.publicId);
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
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(manuallyAddedUsers, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default ManuallyAddedUserList;
