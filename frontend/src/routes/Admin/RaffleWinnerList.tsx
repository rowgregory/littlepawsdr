import React, { useEffect, useState } from 'react';
import { Col, Form, Table, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createRaffleWinner,
  listRaffleWinners,
} from '../../actions/raffleWinnerActions';
import DeleteModal from '../../components/DeleteModal';
import Message from '../../components/Message';
import { TableBody, Text, StyledEditBtn } from '../../components/styles/Styles';
import { RAFFLE_WINNER_CREATE_RESET } from '../../constants/raffleWinnerContants';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

const RaffleWinnerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listOfRaffleWinners, setListOfRafflwWinners] = useState([]) as any;

  const raffleWinnerList = useSelector((state: any) => state.raffleWinnerList);
  const {
    // loading,
    error,
    raffleWinners,
  } = raffleWinnerList;

  const raffleWinnerCreate = useSelector(
    (state: any) => state.raffleWinnerCreate
  );
  const {
    loading: loadingRaffleWinnerCreate,
    error: errorCreate,
    success: successCreate,
    raffleWinner: createdRaffleWinner,
  } = raffleWinnerCreate;

  const raffleWinnerDelete = useSelector(
    (state: any) => state.raffleWinnerDelete
  );
  const {
    loading: loadingRaffleWinnerDelete,
    error: errorDelete,
    success: successDelete,
  } = raffleWinnerDelete;

  useEffect(() => {
    if (raffleWinners) {
      setListOfRafflwWinners(raffleWinners);
    }
  }, [raffleWinners]);

  useEffect(() => {
    dispatch({ type: RAFFLE_WINNER_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/raffleWinner/${createdRaffleWinner._id}/edit`);
    } else {
      dispatch(listRaffleWinners());
    }
  }, [dispatch, history, successCreate, createdRaffleWinner, successDelete]);

  const createRaffleWinnerHandler = () => {
    dispatch(createRaffleWinner());
  };

  const filteredRaffleWinners = listOfRaffleWinners?.filter(
    (raffleWinners: any) =>
      raffleWinners._id.toLowerCase().includes(text.toLowerCase())
  );
  return (
    <>
      <DeleteModal
        actionFunc='Raffle Winner'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(errorDelete || errorCreate) && (
        <Message variant='danger'>{errorDelete ?? errorCreate}</Message>
      )}
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
        <CreateBtn onClick={createRaffleWinnerHandler}>
          {loadingRaffleWinnerCreate ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <i className='fas fa-plus fa-2x'></i>
          )}
        </CreateBtn>
      </Col>

      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>MESSAGE</th>
                <th>MONTH</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {raffleWinners?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Click the plus to create a raffle winner.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredRaffleWinners?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredRaffleWinners?.map((raffleWinner: any) => (
                  <CSSTransition
                    key={raffleWinner?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{raffleWinner?._id}</Text>
                      </td>
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
                          <StyledEditBtn className='btn-lg'>
                            <i className='fas fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-lg border-0'
                          onClick={() => {
                            setId(raffleWinner?._id);
                            setPublicId(raffleWinner?.publicId);
                            handleShow();
                          }}
                        >
                          {loadingRaffleWinnerDelete &&
                          id === raffleWinner?._id ? (
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
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default RaffleWinnerList;
