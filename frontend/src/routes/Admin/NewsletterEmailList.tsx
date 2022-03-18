import { useEffect, useState } from 'react';
import { Table, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listNewsletterEmail } from '../../actions/newsletterActions';
import DeleteModal from '../../components/DeleteModal';
import { TableBody, Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { useTheme } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const NewsletterEmailList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState('');
  const theme = useTheme() as any;

  const [newsletterEmailSet, setNewsletterEmail] = useState([]) as any;

  const newsletterEmailList = useSelector(
    (state: any) => state.newsletterEmailList
  );
  const {
    // loading,
    error,
    newsletterEmails,
  } = newsletterEmailList;

  const newsletterEmailDelete = useSelector(
    (state: any) => state.newsletterEmailDelete
  );
  const {
    success,
    loading: loadingDelete,
    error: errorDelete,
  } = newsletterEmailDelete;

  useEffect(() => {
    if (newsletterEmails) {
      setNewsletterEmail(newsletterEmails);
    }
  }, [newsletterEmails]);

  useEffect(() => {
    dispatch(listNewsletterEmail());
  }, [dispatch, success]);

  const copyEmails = () => {
    const emails = newsletterEmails
      ?.map((obj: any) => obj.newsletterEmail)
      .join(',');
    navigator.clipboard.writeText(emails).then(
      () => {
        setMessage('Copied to clipboard!');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      },
      (err) => {
        setMessage(`Error: , ${err}`);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    );
  };

  const filteredEmails = newsletterEmailSet?.filter((email: any) =>
    email.newsletterEmail.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='Newsletter Email'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
        <Button
          style={{
            background: message ? '#269b0f' : theme.colors.primary,
          }}
          className='d-flex justify-content-center align-items-center border-0'
          onClick={() => copyEmails()}
        >
          <i className='fas fa-plus fa-2x mr-2'></i>
          {message ? message : 'Copy emails'}
        </Button>
      </Col>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>EMAIL</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {newsletterEmails?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Someone will submit their email soon!</td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredEmails?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredEmails?.map((email: any) => (
                  <CSSTransition
                    key={email._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{email.newsletterEmail}</Text>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-lg border-0'
                          onClick={() => {
                            setId(email.newsletterEmail);
                            handleShow();
                          }}
                        >
                          {loadingDelete && id === email._id ? (
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

export default NewsletterEmailList;
