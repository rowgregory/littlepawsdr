import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Form, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import DeleteModal from '../../components/DeleteModal';
import { createECard, listECards } from '../../actions/eCardActions';
import { ECARD_CREATE_RESET } from '../../constants/eCardConstants';
import { StyledEditBtn, Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ECardList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const [eCardListSet, setECardList] = useState([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eCardList = useSelector((state: any) => state.eCardList);
  const {
    // loading,
    error,
    eCards,
  } = eCardList;

  const eCardCreate = useSelector((state: any) => state.eCardCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    eCard,
  } = eCardCreate;

  const eCardDelete = useSelector((state: any) => state.eCardDelete);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = eCardDelete;

  useEffect(() => {
    if (eCards) {
      setECardList(eCards);
    }
  }, [eCards]);

  useEffect(() => {
    dispatch({ type: ECARD_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/eCard/${eCard._id}/edit`);
    } else {
      dispatch(listECards());
    }
  }, [eCard, dispatch, history, successCreate, successDelete]);

  const createECardHandler = () => {
    dispatch(createECard());
  };

  const filteredECards = eCardListSet?.filter((eCard: any) =>
    eCard?.category?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='ECard'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(errorCreate || errorDelete) && (
        <Message variant='danger'>{errorCreate || errorDelete}</Message>
      )}
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by category'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
        <CreateBtn onClick={createECardHandler}>
          {loadingCreate ? (
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
                <th>IMAGE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <TransitionGroup component='tbody'>
              {filteredECards?.map((eCard: any) => (
                <CSSTransition key={eCard?._id} timeout={500} classNames='item'>
                  <TableRow>
                    <td>
                      <TableImg src={eCard.image} alt='avatar' />
                    </td>
                    <td>
                      <Text>{eCard.category}</Text>
                    </td>
                    <td>
                      <Text>${eCard.price.toFixed(2)}</Text>
                    </td>
                    <td>
                      <LinkContainer to={`/admin/eCard/${eCard._id}/edit`}>
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
                          setId(eCard._id);
                          setPublicId(eCard.publicId);
                          handleShow();
                        }}
                      >
                        {loadingDelete && id === eCard?._id ? (
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
      )}
    </>
  );
};

export default ECardList;
