import { Image } from 'react-bootstrap';
import { Flex, Text } from '../styles/Styles';
import { formatDateTime } from '../../utils/formatDateTime';
import { LoadingImg } from '../LoadingImg';
import addDecimals from '../../utils/addDecimals';
import styled from 'styled-components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const RecentTransactionItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 8px;
  gap: 2px;
  border-radius: 8px;
  :hover {
    background: #f6f9fe;
    cursor: pointer;
  }
`;

export const ItemAmount = styled.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;

const ProductImg = styled(Image)`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

interface RecentTransactionItemProps {
  item: any;
  loading: boolean;
}

const EmailText = styled.div`
font-weight: 300;
color: #c1c1c1;
font-size: 12px;
max-width: 140px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const RecentTransactionItem: FC<RecentTransactionItemProps> = ({
  item,
  loading,
}: any) => {
  const history = useNavigate();
  const viewTransaction = (item: any) => {
    history(`/admin/order/${item?._id}`);
  };
  const imgSrc =
    item?.orderItems[0]?.dachshundImage ?? item?.orderItems[0]?.productImage;
  return (
    <RecentTransactionItemContainer onClick={() => viewTransaction(item)}>
      {loading ? (
        <LoadingImg w='60px' h='60px' />
      ) : (
        <ProductImg src={imgSrc} alt='Donation Item' />
      )}
      <Flex className='flex-column align-items-start'>
        <ItemAmount>
          {loading ? (
            <LoadingImg w='100%' h='20px' />
          ) : (
            `${item?.totalItems} item${item?.totalItems > 1 ? 's' : ''}`
          )}
        </ItemAmount>
        {!loading && (
          <Flex flexDirection='column'>
            <EmailText>
              {item?.email}
            </EmailText>
            <Text
              fontWeight={300}
              color='#6a6a6a'
              className='d-flex justify-content-end'
              fontSize='10px'
            >
              {formatDateTime(item?.createdAt)}
            </Text>
          </Flex>
        )}
      </Flex>
      {!loading && (
        <Flex
          justifyContent='center'
          alignItems='center'
          color='#9761aa'
          className='font-weight-bold'
        >
          + {addDecimals(item?.totalPrice)}
        </Flex>
      )}
    </RecentTransactionItemContainer>
  );
};

export default RecentTransactionItem;
