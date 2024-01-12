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
import styled from 'styled-components';
import { listActionHistories } from '../../actions/actionHistoryActions';
import { ACTION_HISTORY_LIST_RESET } from '../../constants/actionHistoryConstants';
import { formatDateTime } from '../../utils/formatDateTime';

const TableRow = styled.tr<{ usedcode?: string }>`
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

const ActionHistoryList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const state = useSelector((state: any) => state);
  const loading = state.actionHistoryList.loading;
  const error = state.actionHistoryList.error;
  const actionHistories = state.actionHistoryList.actionHistories;

  useEffect(() => {
    dispatch(listActionHistories());
    return () => {
      dispatch({ type: ACTION_HISTORY_LIST_RESET });
    };
  }, [dispatch]);

  actionHistories?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  const filteredActionHistories = actionHistories?.filter((actionHistory: any) =>
    actionHistory?.user?.email?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <Container>
      <WelcomeText>Action History</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Action History'
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
          <Table hover responsive size='sm' style={{ width: '2000px' }}>
            <TableHead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTION TYPE</th>
                <th>DETAILS</th>
                <th>IP</th>
                <th>DEVICE INFO</th>
                <th>CREATED AT</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredActionHistories?.map((actionHistory: any) => (
                <TableRow key={actionHistory._id}>
                  <td>
                    <Text>{actionHistory?.user?.name}</Text>
                  </td>
                  <td>
                    <Text>{actionHistory?.user?.email}</Text>
                  </td>
                  <td>
                    <Text>{actionHistory?.actionType}</Text>
                  </td>
                  <td>
                    <Text>{actionHistory?.details}</Text>
                  </td>
                  <td>
                    <Text>{actionHistory?.ip}</Text>
                  </td>
                  <td>
                    <Text>{actionHistory?.deviceInfo}</Text>
                  </td>
                  <td>
                    <Text>{formatDateTime(actionHistory?.createdAt)}</Text>
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

export default ActionHistoryList;
