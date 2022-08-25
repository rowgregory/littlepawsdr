import React, { useEffect, useState } from 'react';
import { Col, Form, Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createEducationTip,
  listEducationTips,
} from '../../actions/educationTipActions';
import DeleteModal from '../../components/DeleteModal';
import {
  LoadingImg,
  StyledEditBtn,
  Text,
} from '../../components/styles/Styles';
import { EDUCATION_TIP_CREATE_RESET } from '../../constants/educationTipConstants';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
} from '../../components/styles/admin/Styles';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const RaffleWinnerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tips, setTips] = useState([]) as any;

  const educationTipList = useSelector((state: any) => state.educationTipList);
  const { loading, error, educationTips } = educationTipList;

  const educationTipCreate = useSelector(
    (state: any) => state.educationTipCreate
  );
  const {
    loading: loadingEducationTipCreate,
    error: errorCreate,
    success: successEducationTipCreate,
    educationTip: createdEducationTip,
  } = educationTipCreate;

  const educationTipDelete = useSelector(
    (state: any) => state.educationTipDelete
  );
  const {
    loading: loadingEducationTipDelete,
    error: errorDelete,
    success: successEducationTipDelete,
  } = educationTipDelete;

  useEffect(() => {
    if (educationTips) {
      setTips(educationTips);
    }
  }, [educationTips]);

  useEffect(() => {
    dispatch({ type: EDUCATION_TIP_CREATE_RESET });

    if (successEducationTipCreate) {
      history.push(`/admin/education-tip/${createdEducationTip?._id}/edit`);
    } else {
      dispatch(listEducationTips());
    }
  }, [
    dispatch,
    history,
    successEducationTipCreate,
    createdEducationTip,
    successEducationTipDelete,
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

  const createRaffleWinnerHandler = () => {
    dispatch(createEducationTip());
  };

  const filteredEducationTips = tips?.filter((tip: any) =>
    tip?.title.toLowerCase().includes(text.toLowerCase())
  );

  return error ? (
    <></>
  ) : (
    <>
      <DeleteModal
        actionFunc='Education Tip'
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
              placeholder='Search by Title'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></Form.Control>
          </SearchBar>
          <CreateBtn className='border-0' onClick={createRaffleWinnerHandler}>
            {loadingEducationTipCreate ? (
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
              <th>TITLE</th>
              <th>IMAGE</th>
              <th>LINK</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </TableHead>
          <TransitionGroup component='tbody'>
            {filteredEducationTips?.map((tip: any) => (
              <CSSTransition key={tip._id} timeout={500} classNames='item'>
                <TableRow>
                  <td>
                    <Text>{tip?.title}</Text>
                  </td>
                  <td>
                    <TableImg src={tip?.image} alt={tip?.title} />
                  </td>
                  <td>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open(tip?.externalLink, '_target')}
                    >
                      {tip?.title}
                    </Text>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/education-tip/${tip?._id}/edit`}>
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
                        setId(tip?._id);
                        setPublicId(tip?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingEducationTipDelete && id === tip._id ? (
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

export default RaffleWinnerList;
