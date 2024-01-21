import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { SearchInput, Row, TableContainer } from '../../components/styles/admin/Styles';
import { listActionHistories } from '../../actions/actionHistoryActions';
import { ACTION_HISTORY_LIST_RESET } from '../../constants/actionHistoryConstants';
import { formatDateTime } from '../../utils/formatDateTime';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

const ActionHistoryList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const state = useSelector((state: any) => state);
  const loading = state.actionHistoryList.loading;
  let error = state.actionHistoryList.error;
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
    <DashboardLayout2024
      error={error}
      box1='Action History'
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
        loading ? (
          <Spinner animation='border' size='sm' />
        ) : (
          <Text fontFamily='Rust' fontSize='20px'>
            {error}
          </Text>
        )
      }
      box4={
        <TableContainer>
          <Table hover responsive size='sm' style={{ width: '2000px' }}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTION TYPE</th>
                <th>DETAILS</th>
                <th>IP</th>
                <th>DEVICE INFO</th>
                <th>CREATED AT</th>
              </tr>
            </thead>
            <tbody>
              {filteredActionHistories?.map((actionHistory: any, i: number) => (
                <Row key={actionHistory._id} i={i}>
                  <td>
                    {actionHistory?.user?.name}
                  </td>
                  <td>
                    {actionHistory?.user?.email}
                  </td>
                  <td>
                    {actionHistory?.actionType}
                  </td>
                  <td>
                    {actionHistory?.details}
                  </td>
                  <td>
                    {actionHistory?.ip}
                  </td>
                  <td>
                    {actionHistory?.deviceInfo}
                  </td>
                  <td>
                    {formatDateTime(actionHistory?.createdAt)}
                  </td>
                </Row>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      }
    />
  );
};

export default ActionHistoryList;
