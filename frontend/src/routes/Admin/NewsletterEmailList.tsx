import { useEffect, useState } from 'react';
import { Table, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listNewsletterEmail } from '../../actions/newsletterActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { useTheme } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toaster from 'toasted-notes';
import { ToastAlert } from '../../components/common/ToastAlert';
import { LoadingImg } from '../../components/LoadingImg';

const NewsletterEmailList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState('');
  const theme = useTheme() as any;

  const [newsletterEmailSet, setNewsletterEmail] = useState([]) as any;

  const newsletterEmailList = useSelector(
    (state: any) => state.newsletterEmailList
  );
  const { loading, error, newsletterEmails } = newsletterEmailList;

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
        toaster.notify(
          ({ onClose }) =>
            ToastAlert('Copied To Clipboard!', onClose, 'success'),
          {
            position: 'bottom',
            duration: 5000,
          }
        );
      },
      (err) => {
        toaster.notify(({ onClose }) => ToastAlert(err, onClose, 'error'), {
          position: 'bottom',
          duration: 5000,
        });
      }
    );
  };

  useEffect(() => {
    if (error || errorDelete) {
      toaster.notify(
        ({ onClose }) => ToastAlert(error || errorDelete, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
          type: 'error',
        }
      );
    }
  }, [error, errorDelete]);

  const filteredEmails = newsletterEmailSet?.filter((email: any) =>
    email.newsletterEmail.toLowerCase().includes(text.toLowerCase())
  );

  return error ? (
    <></>
  ) : (
    <>
      <DeleteModal
        actionFunc='Newsletter Email'
        show={show}
        handleClose={handleClose}
        id={id}
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
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></Form.Control>
          </SearchBar>
          <Button
            style={{
              background: theme.colors.primary,
            }}
            className='d-flex justify-content-center align-items-center border-0'
            onClick={() => copyEmails()}
          >
            <i className='fas fa-plus mr-2'></i>
            Copy Emails
          </Button>
        </Col>
      )}
      <Col>
        <Table hover responsive className='table-sm'>
          <TableHead>
            <tr>
              <th>EMAIL</th>
              <th>DELETE</th>
            </tr>
          </TableHead>
          <TransitionGroup component='tbody'>
            {filteredEmails?.map((email: any) => (
              <CSSTransition key={email._id} timeout={500} classNames='item'>
                <TableRow>
                  <td>
                    <Text>{email.newsletterEmail}</Text>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='border-0'
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
        </Table>
      </Col>
    </>
  );
};

export default NewsletterEmailList;
