import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Pagination, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { createECard, listECards } from '../../actions/eCardActions';
import { ECARD_CREATE_RESET } from '../../constants/eCardConstants';
import { Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import {
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
  StyledEditBtn,
  CreateBtnV2,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { AddIcon } from '../../components/svg/AddIcon';
import { rangeV2 } from '../../components/common/Pagination';

const ECardList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {
    eCardList: { loading, error, eCards },
    eCardCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      eCard,
    },
    eCardDelete: {
      success: successDelete,
      error: errorDelete,
      loading: loadingDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: ECARD_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/eCard/${eCard._id}/edit`);
    } else {
      dispatch(listECards());
    }
  }, [eCard, dispatch, history, successCreate, successDelete]);

  eCards?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(eCards?.slice(indexOfFirstItem, indexOfLastItem));
  }, [eCards, paginatedPage]);

  const createECardHandler = () => {
    dispatch(createECard());
  };

  let filteredECards =
    text !== ''
      ? eCards?.filter((eCard: any) =>
          eCard?.category?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((eCard: any) =>
          eCard?.category?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Ecards</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Ecards'
        url1='/'
        url2='/admin'
        url3='/admin/eCardList'
      />
      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <DeleteModal
        actionFunc='ECard'
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
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createECardHandler}>
            <AddIcon />
            {loadingCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Create'
            )}
          </CreateBtnV2>
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
                    <TableImg src={eCard?.image} alt='avatar' />
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
                    <LinkContainer to={`/admin/eCard/${eCard._id}/edit`}>
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
                        setPublicId(eCard.publicId);
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
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(eCards, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default ECardList;
