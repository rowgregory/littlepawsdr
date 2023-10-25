import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
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
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  CreateBtnV2,
  TableImg,
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { AddIcon } from '../../components/svg/AddIcon';
import { LinkContainer } from 'react-router-bootstrap';
import { defaultImages } from '../../utils/defaultImages';

const ManuallyAddedUserList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

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
  }, [dispatch, successDelete]);

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

  const filteredManuallyAddedUsers =
    text !== ''
      ? manuallyAddedUsers?.filter((blog: any) =>
          blog.name.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((blog: any) =>
          blog.name.toLowerCase().includes(text.toLowerCase())
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
          {loading ? (
            <SpinnerContainer>
              <Spinner animation='border' size='sm' />
            </SpinnerContainer>
          ) : (
            <LinkContainer
              to={{
                pathname: '/admin/manuallyAddedUser/id/edit',
                state: { manuallyAddedUser },
              }}
            >
              <CreateBtnV2>
                <AddIcon />
                Create
              </CreateBtnV2>
            </LinkContainer>
          )}
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
                      to={{
                        pathname: `/admin/manuallyAddedUser/${manuallyAddedUser?._id}/edit`,
                        state: { manuallyAddedUser, isEditMode: true },
                      }}
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
