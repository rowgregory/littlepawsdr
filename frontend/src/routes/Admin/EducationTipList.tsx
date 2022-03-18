import React, { useEffect, useState } from 'react';
import { Col, Form, Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createEducationTip,
  listEducationTips,
} from '../../actions/educationTipActions';
import DeleteModal from '../../components/DeleteModal';
import Message from '../../components/Message';
import { TableBody, StyledEditBtn, Text } from '../../components/styles/Styles';
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
// import HorizontalLoader from '../../components/HorizontalLoader';

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
  const {
    // loading: loadingEducationTips,
    error: errorEducationTips,
    educationTips,
  } = educationTipList;

  const educationTipCreate = useSelector(
    (state: any) => state.educationTipCreate
  );
  const {
    loading: loadingEducationTipCreate,
    error: errorEducationTipCreate,
    success: successEducationTipCreate,
    educationTip: createdEducationTip,
  } = educationTipCreate;

  const educationTipDelete = useSelector(
    (state: any) => state.educationTipDelete
  );
  const {
    loading: loadingEducationTipDelete,
    error: errorEducationTipDelete,
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

  const createRaffleWinnerHandler = () => {
    dispatch(createEducationTip());
  };

  const filteredEducationTips = tips?.filter((tip: any) =>
    tip?._id.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='Education Tip'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {/* {loadingEducationTips && <HorizontalLoader />} */}
      {(errorEducationTipDelete || errorEducationTipCreate) && (
        <Message variant='danger'>
          {errorEducationTipDelete || errorEducationTipCreate}
        </Message>
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
        <CreateBtn className='border-0' onClick={createRaffleWinnerHandler}>
          {loadingEducationTipCreate ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <i className='fas fa-plus fa-2x'></i>
          )}
        </CreateBtn>
      </Col>

      {errorEducationTips ? (
        <Message variant='danger'>{errorEducationTips}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {tips?.length === 0 ? (
              <TableBody>
                <tr>
                  <td className='p-3'>
                    Click the pen and paper icon to create an education tip.
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredEducationTips?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredEducationTips?.map((tip: any) => (
                  <CSSTransition key={tip._id} timeout={500} classNames='item'>
                    <TableRow>
                      <td>
                        <Text>{tip?._id}</Text>
                      </td>
                      <td>
                        <Text>{tip?.title}</Text>
                      </td>
                      <td>
                        <TableImg src={tip?.image} alt={tip?.title} />
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/education-tip/${tip?._id}/edit`}
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
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default RaffleWinnerList;
