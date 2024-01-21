import { useState } from 'react';
import { Flex, Text } from '../../styles/Styles';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { submitTrackingNumber } from '../../../actions/orderActions';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';

const TrackingNumber = ({ order, loading }: any) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const dispatch = useDispatch();

  return order?.requiresShipping ? (
    <Flex flexDirection='column' justifyContent='space-between' height='100%'>
      <Text p='6px 12px' width='100%' fontSize='22px' fontFamily='Rust' background='#d6d6d6'>
        Tracking Number
      </Text>
      <Flex flexDirection='column' padding='6px 12px' width='100%'>
        <Text fontFamily='Rust' cursor='pointer'>
          {order?.trackingNumber ? `Tracking Number: ${order?.trackingNumber}` : 'Enter tracking number'}
        </Text>
        <Flex alignItems='center' width='100%'>
          {loading ? (
            <JumpingRumpLoader color='#eec4fc' />
          ) : (
            <Form.Group controlId='trackingNumber' className='mr-3 w-100'>
              <Form.Control
                name='trackingNumber'
                type='text'
                value={trackingNumber || ''}
                onChange={(e: any) => setTrackingNumber(e.target.value)}
                style={{ border: '1px solid #ededed' }}
              />
            </Form.Group>
          )}
          {loading ? (
            <Spinner animation='border' size='sm' style={{ color: '#eec4fc' }} />
          ) : (
            <i
              onClick={() => {
                if (trackingNumber !== '') {
                  dispatch(submitTrackingNumber(trackingNumber, order?._id));
                }
              }}
              className='fa-solid fa-paper-plane'
              style={{ color: 'green', cursor: 'pointer' }}
            ></i>
          )}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex justifyContent='center' alignItems='center' fontFamily='Rust'>
      Tracking number not applicable
    </Flex>
  );
};

export default TrackingNumber;
