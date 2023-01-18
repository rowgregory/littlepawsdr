import React from 'react';
import { Image } from 'react-bootstrap';
import { formatDate } from '../../utils/formatDate';
import {
  DonatorInitials,
  ItemName,
  RecentTransactionItemContainer,
} from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';

const RecentTransactionItem = ({ viewTransaction, item }: any) => {
  return (
    <RecentTransactionItemContainer onClick={() => viewTransaction(item)}>
      <div className='d-flex'>
        {item?.donationAmount ? (
          <DonatorInitials>
            {item?.firstName[0]}
            {item?.lastName[0]}
          </DonatorInitials>
        ) : (
          <Image
            src={item?.orderItems ? item?.orderItems[0].image : item?.image}
            alt=''
            width='50px'
            height='50px'
            className='mr-3'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='d-flex flex-column align-items-start'>
          <div className='d-flex'>
            <ItemName>
              {item?.orderItems
                ? item?.orderItems[0].name
                : item?.donationAmount
                ? 'Donation'
                : item?.name}
            </ItemName>
            {item?.donationAmount && (
              <Text>
                &nbsp;- {item?.firstName[0]}.{item.lastName}
              </Text>
            )}
          </div>

          <Text
            fontWeight={300}
            color='#c1c1c1'
            className='d-flex justify-content-end'
          >
            {formatDate(new Date(item?.createdAt))}
          </Text>
        </div>
      </div>

      <Text color='#9761aa' fontWeight={600}>
        + $
        {(item?.donationAmount
          ? item?.donationAmount
          : item?.totalPrice
        )?.toFixed(2)}
      </Text>
    </RecentTransactionItemContainer>
  );
};

export default RecentTransactionItem;
