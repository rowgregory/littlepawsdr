import styled from 'styled-components';
import { Text } from '../../styles/Styles';

const Key = styled.div`
  border: 1px solid #ededed;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: #f9f9f9;
  h6, div {
    font-family: Rust;
  }
`;

const OrderKey = () => {
  return (
    <section className='mx-auto p-3 mt-3 mb-4 w-100' style={{ maxWidth: '450px' }}>
      <Key className='px-2 py-1'>
        <i className='fas fa-times' style={{ color: 'red' }}></i>
        <h6 className='mb-0'>Order contains item that requires shipping</h6>
      </Key>
      <Key className='px-2 py-1 my-1'>
        <i className='fas fa-check' style={{ color: 'green' }}></i>
        <h6 className='mb-0'>Order has been shipped</h6>
      </Key>
      <Key className='px-2 py-1'>
        <Text>Digital Producs</Text>
        <h6 className='mb-0'>Order does not require shipping</h6>
      </Key>
    </section>
  );
};

export default OrderKey;
