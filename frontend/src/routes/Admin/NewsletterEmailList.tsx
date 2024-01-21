import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listNewsletterEmail } from '../../actions/newsletterActions';
import DeleteModal from '../../components/DeleteModal';
import { Flex, Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateBtnV2,
  TableContainer,
  Row,
  RedDeleteTrash,
} from '../../components/styles/admin/Styles';
import { formatDateTime } from '../../utils/formatDateTime';
import { NEWSLETTER_EMAIL_LIST_RESET } from '../../constants/newsletterConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';
import JumpingRumpLoader from '../../components/Loaders/JumpingRopLoader';

const NewsletterEmailList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [clipboard, setClipboard] = useState({
    loading: false,
    message: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    newsletterEmailList: { loading, error, newsletterEmails },
    newsletterEmailDelete: { success, loading: loadingDelete, error: errorDelete },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listNewsletterEmail());
    return () => {
      dispatch({ type: NEWSLETTER_EMAIL_LIST_RESET });
    };
  }, [dispatch, success]);

  const copyEmails = () => {
    setClipboard({ loading: true, message: '' });
    const emails = newsletterEmails?.map((obj: any) => obj.newsletterEmail).join(',');
    navigator.clipboard.writeText(emails).then(async () => {
      setClipboard({ loading: false, message: 'Emails copied' });
    });
  };

  const filteredEmails = newsletterEmails?.filter((email: any) =>
    email.newsletterEmail.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Newsletter Emails'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Email'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      }
      box3={
        error || errorDelete ? (
          <Text fontFamily='Rust' fontSize='20px'>
            {error || errorDelete}
          </Text>
        ) : (
          <CreateBtnV2 onClick={copyEmails} loading={clipboard.loading.toString()}>
            <i className='fa-regular fa-clipboard'></i>
            <Text fontFamily='Rust' color='#fff' fontSize='16px'>
              Copy{clipboard.loading ? 'ing' : ''} Emails
            </Text>
          </CreateBtnV2>
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='Newsletter Email' show={show} handleClose={handleClose} id={id} />
          <TableContainer>
            {loading ? (
              <Flex
                justifyContent='center'
                alignItems='center'
                style={{ minHeight: 'calc(100vh - 104px)' }}
                height='100%'
              >
                <JumpingRumpLoader color='#a7d82f' />
              </Flex>
            ) : (
              <Table hover responsive size='sm'>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails?.map((email: any, i: number) => (
                    <Row key={email._id} i={i}>
                      <td>
                        <Text>{email.newsletterEmail}</Text>
                      </td>
                      <td style={{ minWidth: '175px' }}>
                        <Text>
                          {email?.createdAt === undefined ? '---' : formatDateTime(email?.createdAt)}
                        </Text>
                      </td>
                      <td>
                        {loadingDelete && id === email._id ? (
                          <Spinner size='sm' animation='border' />
                        ) : (
                          <RedDeleteTrash
                            onClick={() => {
                              setId(email.newsletterEmail);
                              handleShow();
                            }}
                            className='fas fa-trash'
                          ></RedDeleteTrash>
                        )}
                      </td>
                    </Row>
                  ))}
                </tbody>
              </Table>
            )}
          </TableContainer>
        </>
      }
    />
  );
};

export default NewsletterEmailList;
