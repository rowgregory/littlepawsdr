import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { listECards } from '../../actions/eCardActions';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
  StyledEditBtn,
  CreateBtnV2,
  TopRow,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';

const ECardList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  const loading = state.ecardList.loading;
  const error = state.ecardList.error;
  const ecards = state.ecardList.ecards;

  const successDelete = state.ecardDelete.success;
  const errorDelete = state.ecardDelete.error;
  const loadingDelete = state.ecardDelete.loading;

  useEffect(() => {
    dispatch(listECards());
  }, [dispatch, successDelete]);

  ecards?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  let filteredECards = ecards?.filter((eCard: any) =>
    eCard?.category?.toLowerCase().includes(text.toLowerCase())
  );

  const eCard = {
    name: '',
    category: 'Anniversary',
    price: 20,
    image: defaultImages.upload,
  };

  return (
    <Container>
      <WelcomeText>Ecards</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Ecards'
        url1='/'
        url2='/admin'
        url3='/admin/eCardList'
      />
      <DeleteModal
        actionFunc='ECard'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId=''
      />
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
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
                pathname: '/admin/eCard/id/edit',
                state: { eCard },
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
                <th>IMAGE</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredECards?.map((eCard: any) => (
                <TableRow key={eCard?._id}>
                  <td>
                    <TableImg
                      src={eCard?.image ?? defaultImages.upload}
                      alt='LPDR'
                    />
                  </td>
                  <td>
                    <Text>{eCard?.name}</Text>
                  </td>
                  <td>
                    <Text>{eCard?.category}</Text>
                  </td>
                  <td>
                    <Text>${eCard?.price?.toFixed(2)}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/eCard/${eCard._id}/edit`,
                        state: { eCard, isEditMode: true },
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
                        setId(eCard._id);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === eCard?._id ? (
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

export default ECardList;
