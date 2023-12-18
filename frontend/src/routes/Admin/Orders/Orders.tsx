import { Table } from 'react-bootstrap';
import {
  StyledEditBtn,
  TableHead,
  TableRow,
} from '../../../components/styles/admin/Styles';
import { useEffect, useState } from 'react';
import { Text } from '../../../components/styles/Styles';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/formatDateTime';
import addDecimals from '../../../utils/addDecimals';

const Orders = ({ orders, text }: any) => {
  const history = useNavigate();
  const [fOrders, setFOrders] = useState([]) as any;

  useEffect(() => {
    setFOrders(orders);
  }, [orders]);

  const filteredOrders = fOrders?.filter((order: any) =>
    order?._id?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <section
        className='mx-auto p-3 mt-3 mb-4 w-100'
        style={{ maxWidth: '450px' }}
      >
        <div
          className='px-2 py-1'
          style={{
            border: '1px solid #ededed',
            borderRadius: '12px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            background: '#f9f9f9',
          }}
        >
          <i className='fas fa-times' style={{ color: 'red' }}></i>
          <h6 className='mb-0'>Order contains item that requires shipping</h6>
        </div>
        <div
          className='px-2 py-1 my-1'
          style={{
            border: '1px solid #ededed',
            borderRadius: '12px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            background: '#f9f9f9',
          }}
        >
          <i className='fas fa-check' style={{ color: 'green' }}></i>
          <h6 className='mb-0'>Order has been shipped</h6>
        </div>
        <div
          className='px-2 py-1'
          style={{
            border: '1px solid #ededed',
            borderRadius: '12px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            background: '#f9f9f9',
          }}
        >
          <Text>Digital Producs</Text>
          <h6 className='mb-0'>Order does not require shipping</h6>
        </div>
      </section>
      <Table striped hover responsive size='sm'>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>CUSTOMER NAME</th>
            <th>EMAIL</th>
            <th
              onClick={() => setFOrders(filteredOrders.reverse())}
              style={{ cursor: 'pointer' }}
            >
              DATE
            </th>
            <th>ORDER TOTAL</th>
            <th>ORDER ITEMS</th>
            <th>IS SHIPPED</th>
            <th>VIEW/EDIT</th>
          </tr>
        </TableHead>
        <tbody>
          {fOrders
            ?.slice()
            ?.reverse()
            ?.map((order: any) => (
              <TableRow
                key={order?._id}
                style={{
                  background:
                    order?.requiresShipping && !order?.isShipped
                      ? '#ffeeee'
                      : '',
                }}
              >
                <td>
                  <Text>{order?._id}</Text>
                </td>
                <td style={{ minWidth: '150px' }}>{order?.name}</td>
                <td>
                  <Text>{order?.email}</Text>
                </td>
                <td style={{ minWidth: '175px' }}>
                  <Text>{formatDateTime(order?.createdAt)}</Text>
                </td>
                <td>
                  <Text>{addDecimals(order?.totalPrice)}</Text>
                </td>
                <td>
                  {order?.orderItems?.map((item: any, i: number) => (
                    <Text key={i}>{item?.productName}</Text>
                  ))}
                </td>
                <td>
                  <Text>
                    {order?.requiresShipping ? (
                      order?.isShipped ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )
                    ) : (
                      'Digital Products'
                    )}
                  </Text>
                </td>

                <td>
                  <StyledEditBtn
                    onClick={() => history(`/admin/order/${order?._id}`)}
                  >
                    <i
                      style={{ color: '#9761aa' }}
                      className='fas fa-expand'
                    ></i>
                  </StyledEditBtn>
                </td>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Orders;
