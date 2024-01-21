import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { SearchInput, TableContainer, Row } from '../../components/styles/admin/Styles';
import { listAdoptionFees } from '../../actions/adoptionActions';
import { formatDateTime } from '../../utils/formatDateTime';
import { ADOPTION_FEE_LIST_RESET } from '../../constants/adoptionConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

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

  adoptionFees?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  const filteredAdoptionFees = adoptionFees?.filter((fee: any) =>
    fee?.emailAddress.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <DashboardLayout2024
      error={error}
      box1='Adoption Application Fees'
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
          <Table hover responsive size='sm'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>State</th>
                <th>Fee</th>
                <th>Date Created</th>
                <th>Bypass Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdoptionFees?.map((fee: any, i: number) => (
                <Row key={fee._id} i={i}>
                  <td>{fee?.firstName}</td>
                  <td>{fee?.lastName}</td>
                  <td>{fee?.emailAddress}</td>
                  <td>{fee?.state}</td>
                  <td>${fee?.feeAmount}</td>
                  <td>{formatDateTime(fee?.createdAt)}</td>
                  <td>{fee?.bypassCode}</td>
                </Row>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      }
    />
  );
};

export default AdoptionFeeList;
