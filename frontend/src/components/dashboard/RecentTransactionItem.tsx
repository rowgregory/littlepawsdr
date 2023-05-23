import { Image } from 'react-bootstrap';
import {
  ItemName,
  RecentTransactionItemContainer,
} from '../styles/DashboardStyles';
import { Flex, Text } from '../styles/Styles';
import { formatDateTime } from '../../utils/formatDateTime';
import { LoadingImg } from '../LoadingImg';

const RecentTransactionItem = ({ viewTransaction, item, loading }: any) => {
  return (
    <RecentTransactionItemContainer onClick={() => viewTransaction(item)}>
      <Flex marginRight='16px'>
        {loading ? (
          <div className='mr-3'>
            <LoadingImg w='50px' h='50px' />
          </div>
        ) : (
          <Image
            src={
              item?.orderItems
                ? item?.orderItems[0].dachshundImage
                : item?.image
            }
            alt='Donation Item'
            width='50px'
            height='50px'
            className='mr-3'
            style={{ objectFit: 'cover' }}
          />
        )}

        <div className='d-flex flex-column align-items-start'>
          <ItemName>
            {loading ? (
              <LoadingImg w='120px' h='20px' />
            ) : item?.orderItems ? (
              item.orderItems.map((orderItem: any) => (
                <span key={orderItem?._id}>
                  {orderItem?.productName} for {orderItem?.dachshundName}
                </span>
              ))
            ) : (
              item?.name
            )}
          </ItemName>
          {!loading && (
            <Flex flexDirection='column'>
              <Text
                fontWeight={300}
                color='#c1c1c1'
                className='d-flex justify-content-end'
                fontSize='12px'
              >
                {item?.emailAddress ?? item?.email}
              </Text>
              <Text
                fontWeight={300}
                color='#c1c1c1'
                className='d-flex justify-content-end'
                fontSize='10px'
              >
                {formatDateTime(item?.createdAt)}
              </Text>
            </Flex>
          )}
        </div>
      </Flex>
      {!loading && (
        <Text color='#9761aa' fontWeight={600}>
          + ${item?.totalPrice?.toFixed(2)}
        </Text>
      )}
    </RecentTransactionItemContainer>
  );
};

export default RecentTransactionItem;
