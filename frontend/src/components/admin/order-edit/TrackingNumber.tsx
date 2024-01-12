import { useState } from 'react';
import { Flex, Text } from '../../styles/Styles';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { submitTrackingNumber } from '../../../actions/orderActions';
import { Container } from './styles';

const TrackingNumber = ({ order, setEnterTrackingNumber, enterTrackingNumber, loading }: any) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const dispatch = useDispatch();
  return (
    <>
      {order?.requiresShipping && (
        <Container>
          <Text
            fontWeight={400}
            cursor='pointer'
            onClick={() => setEnterTrackingNumber(!enterTrackingNumber)}
            marginBottom={enterTrackingNumber ? '16px' : '0px'}
          >
            {order?.trackingNumber ? `Tracking Number: ${order?.trackingNumber}` : 'Enter tracking number'}
          </Text>
          {enterTrackingNumber && (
            <Flex alignItems='center'>
              <Form.Group controlId='trackingNumber' className='mb-0 mr-3 w-100'>
                <Form.Control
                  name='trackingNumber'
                  type='text'
                  value={trackingNumber || ''}
                  onChange={(e: any) => setTrackingNumber(e.target.value)}
                  style={{ border: '1px solid #c4c4c4' }}
                />
              </Form.Group>
              {loading ? (
                <Spinner animation='border' size='sm' />
              ) : (
                <i
                  onClick={() => {
                    if (trackingNumber !== '') {
                      dispatch(submitTrackingNumber(trackingNumber, order?._id));
                    }
                  }}
                  className='fas fa-check'
                  style={{ color: 'green', cursor: 'pointer' }}
                ></i>
              )}
            </Flex>
          )}
        </Container>
      )}
    </>
  );
};

export default TrackingNumber;
