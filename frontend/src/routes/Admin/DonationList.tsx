import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listDonations } from '../../actions/donationActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
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
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { Accordion } from '../../components/styles/place-order/Styles';

const DonationList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;
  const [pleaseRead, setPleaseRead] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    donationList: { loading, error, donations },
    donationDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listDonations());
  }, [dispatch, successDelete]);

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(donations?.slice(indexOfFirstItem, indexOfLastItem));
  }, [donations, paginatedPage]);

  donations?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredDonations =
    text !== ''
      ? donations?.filter((donation: any) =>
          donation?.email?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((donation: any) =>
          donation?.email?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Donations</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Donations'
        url1='/'
        url2='/admin'
        url3='/admin/donationList'
      />
      {(loading || loadingDelete) && <HexagonLoader />}
      <DeleteModal
        actionFunc='Donation'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {error ? (
        <div className='d-flex flex-column align-items-center'>
          <Message variant='danger'>{error}</Message>
        </div>
      ) : (
        <>
          <Text
            width='100%'
            maxWidth='500px'
            fontSize='16px'
            onClick={() => setPleaseRead(!pleaseRead)}
            cursor='pointer'
          >
            Please Read
          </Text>
          <Accordion toggle={pleaseRead} maxheight='60px'>
            This integration is slightly different from the products and ecards
            in that we don't get a response from PayPal once they've completed
            the donation. The only way to know if the user has donated is to
            continue what you're currently doing. Please verify each transaction
            corresponds with a transaction on PayPal. This table was created to
            collect data for the acknowledgement letters. If you notice a
            transaction in this table does not match with anything in PayPal,
            please delete the donation. The user had intentions of donating, but
            did not go all the way through with the donation for whatever
            reason. You can always keep the data and send a follow up email.
            Just a suggestion 😃
          </Accordion>
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
            </TopRow>
            <TableAndPaginationContainer>
              <Table hover responsive>
                <TableHead>
                  <tr>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>DONATION AMOUNT</th>
                    <th>CREATED ON</th>
                    <th>LETTER HAS BEEN SENT</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </TableHead>
                <tbody>
                  {filteredDonations?.map((donation: any) => (
                    <TableRow key={donation?._id}>
                      <td>
                        <Text>{donation?.firstName}</Text>
                      </td>
                      <td>
                        <Text>{donation?.lastName}</Text>
                      </td>
                      <td>
                        <Text>{donation?.email}</Text>
                      </td>
                      <td>
                        <Text>{donation?.donationAmount}</Text>
                      </td>
                      <td>
                        <Text>{formatDate(donation?.createdAt)}</Text>
                      </td>
                      <td>
                        {donation?.hasLetterBeenSent ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/donation/${donation?._id}/edit`}
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
                            setId(donation?._id);
                            handleShow();
                          }}
                        >
                          {loadingDelete && id === donation?._id ? (
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
                  {rangeV2(donations, paginatedPage, setPaginatedPage)}
                </Pagination>
              </PaginationContainer>
            </TableAndPaginationContainer>
          </TableWrapper>
        </>
      )}
    </Container>
  );
};

export default DonationList;
