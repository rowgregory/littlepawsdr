import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createRaffleWinner,
  listRaffleWinners,
} from '../../actions/raffleWinnerActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { RAFFLE_WINNER_CREATE_RESET } from '../../constants/raffleWinnerContants';
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
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { AddIcon } from '../../components/svg/AddIcon';

const RaffleWinnerList = () => {
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
    raffleWinnerList: { loading, error, raffleWinners },
    raffleWinnerCreate: {
      loading: loadingRaffleWinnerCreate,
      error: errorCreate,
      success: successCreate,
      raffleWinner: createdRaffleWinner,
    },
    raffleWinnerDelete: {
      loading: loadingRaffleWinnerDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: RAFFLE_WINNER_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/raffleWinner/${createdRaffleWinner._id}/edit`);
    } else {
      dispatch(listRaffleWinners());
    }
  }, [dispatch, history, successCreate, createdRaffleWinner, successDelete]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(raffleWinners?.slice(indexOfFirstItem, indexOfLastItem));
  }, [raffleWinners, paginatedPage]);

  const createRaffleWinnerHandler = () => {
    dispatch(createRaffleWinner());
  };

  const filteredRaffleWinners =
    text !== ''
      ? raffleWinners?.filter((raffleWinners: any) =>
          raffleWinners.name.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((raffleWinners: any) =>
          raffleWinners.name.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Raffle Winners</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Raffle Winners'
        url1='/'
        url2='/admin'
        url3='/admin/raffleWinnerList'
      />
      <DeleteModal
        actionFunc='Raffle Winner'
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
      {(loading || loadingRaffleWinnerCreate || loadingRaffleWinnerDelete) && (
        <HexagonLoader />
      )}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Name'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createRaffleWinnerHandler}>
            <AddIcon />
            {loadingRaffleWinnerCreate ? (
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
                <th>NAME</th>
                <th>IMAGE</th>
                <th>MESSAGE</th>
                <th>MONTH</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredRaffleWinners?.map((raffleWinner: any) => (
                <TableRow key={raffleWinner?._id}>
                  <td>
                    <Text>{raffleWinner?.name}</Text>
                  </td>
                  <td>
                    <TableImg
                      src={raffleWinner?.image}
                      alt={raffleWinner?.name}
                    />
                  </td>
                  <td>
                    <Text>{raffleWinner?.message}</Text>
                  </td>
                  <td>
                    <Text>{raffleWinner?.month}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/raffleWinner/${raffleWinner?._id}/edit`}
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
                        setId(raffleWinner?._id);
                        setPublicId(raffleWinner?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingRaffleWinnerDelete && id === raffleWinner?._id ? (
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
              {rangeV2(raffleWinners, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default RaffleWinnerList;
