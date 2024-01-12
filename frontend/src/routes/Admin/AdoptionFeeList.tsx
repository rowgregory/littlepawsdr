import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TopRow,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { listAdoptionFees } from '../../actions/adoptionActions';
import { formatDateTime } from '../../utils/formatDateTime';
import { ADOPTION_FEE_LIST_RESET } from '../../constants/adoptionConstants';
import styled from 'styled-components';

const TableRow = styled.tr<{ usedcode: string }>`
background: ${({ usedcode }) => usedcode ? '#d1d8e9' : ''};
  font-size: 12px;
  td {
    border-top: none !important;
    vertical-align: inherit;
    color: #373737;
  }
  :hover {
    background: #f6f9fe !important;
  }
`;

const AdoptionFeeList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const state = useSelector((state: any) => state);
  const loading = state.adoptionFeeList.loading;
  const error = state.adoptionFeeList.error;
  const adoptionFees = state.adoptionFeeList.adoptionFees;

  useEffect(() => {
    dispatch(listAdoptionFees());
    return () => {
      dispatch({ type: ADOPTION_FEE_LIST_RESET });
    };
  }, [dispatch]);

  adoptionFees?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredAdoptionFees = adoptionFees?.filter((fee: any) =>
    fee?.emailAddress.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <Container>
      <WelcomeText>Adoption Application Fees</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Adoption Application Fees'
        url1='/'
        url2='/admin'
        url3=''
      />
      {error && <Message variant='danger'>{error}</Message>}
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Email'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
            {loading && (
              <Spinner
                animation='border'
                size='sm'
                style={{ position: 'absolute', right: '10px', top: '15px' }}
              />
            )}
          </SearchBar>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>STATE</th>
                <th>Bypass Code</th>
                <th>FEE</th>
                <th>CREATED ON</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredAdoptionFees?.map((fee: any) => (
                <TableRow key={fee._id} usedcode={fee?.bypassCode}>
                  <td>
                    <Text>{fee?.firstName}</Text>
                  </td>
                  <td>
                    <Text>{fee?.lastName}</Text>
                  </td>
                  <td>
                    <Text>{fee?.emailAddress}</Text>
                  </td>
                  <td>
                    <Text>{fee?.state}</Text>
                  </td>
                  <td>
                    <Text>{fee?.bypassCode}</Text>
                  </td>
                  <td>
                    <Text>${fee?.feeAmount}</Text>
                  </td>
                  <td>
                    <Text>{formatDateTime(fee?.createdAt)}</Text>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default AdoptionFeeList;
