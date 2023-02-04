import { useEffect, useState } from 'react';
import { Table, Pagination, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listNewsletterEmail } from '../../actions/newsletterActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  StyledEditBtn,
  CreateBtnV2,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { rangeV2 } from '../../components/common/Pagination';
import BreadCrumb from '../../components/common/BreadCrumb';
import CopyIcon from '../../components/svg/CopyIcon';

const NewsletterEmailList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;
  let [loadingCopy, setLoadingCopy] = useState({
    loading: false,
    message: '',
  });

  const {
    newsletterEmailList: { loading, error, newsletterEmails },
    newsletterEmailDelete: {
      success,
      loading: loadingDelete,
      error: errorDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listNewsletterEmail());
  }, [dispatch, success]);

  useEffect(() => {
    const itemsPerPage = 50;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(
      newsletterEmails?.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [newsletterEmails, paginatedPage]);

  const copyEmails = () => {
    setLoadingCopy({ loading: true, message: '' });
    const emails = newsletterEmails
      ?.map((obj: any) => obj.newsletterEmail)
      .join(',');
    navigator.clipboard.writeText(emails).then(() => {
      setLoadingCopy({ loading: false, message: 'Emails copied' });
    });
  };

  const filteredEmails =
    text !== ''
      ? newsletterEmails?.filter((email: any) =>
          email.newsletterEmail.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((email: any) =>
          email?.newsletterEmail?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Newsletter Emails</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Newsletter Emails'
        step4={newsletterEmails?.length}
        url1='/'
        url2='/admin'
        url3=''
      />
      <DeleteModal
        actionFunc='Newsletter Email'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {(error || errorDelete || loadingCopy.message) && (
        <Message variant={loadingCopy.message ? 'success' : 'danger'}>
          {error || errorDelete || loadingCopy.message}
        </Message>
      )}
      {(loading || loadingDelete) && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={copyEmails}>
            {loadingCopy.loading ? (
              <Spinner animation='border' size='sm' />
            ) : (
              <>
                <CopyIcon />
                <Text>Copy</Text>
              </>
            )}
          </CreateBtnV2>
        </TopRow>

        <TableAndPaginationContainer>
          <Table hover responsive size='sm'>
            <TableHead>
              <tr>
                <th>EMAIL</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredEmails?.map((email: any) => (
                <TableRow key={email._id}>
                  <td>
                    <Text>{email.newsletterEmail}</Text>
                  </td>
                  <td>
                    <StyledEditBtn
                      className='border-0'
                      onClick={() => {
                        setId(email.newsletterEmail);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === email._id ? (
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
              {rangeV2(newsletterEmails, paginatedPage, setPaginatedPage, 50)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default NewsletterEmailList;
