import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Flex, Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import MyEcardOrders from '../components/my-orders/MyEcardOrders';
import MyWelcomeWienerOrders from '../components/my-orders/MyWelcomeWienerOrders';
import { Link, useLocation } from 'react-router-dom';
import { Tab, TabContainer } from '../components/styles/my-orders/Styles';
import { listECards } from '../actions/eCardActions';
import { Image } from 'react-bootstrap';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { state: page } = useLocation() as any;

  const [orderType, setOrderType] = useState('ecards');

  useEffect(() => {
    if (page === 'ecards' || page?.backTo === 'ecards') setOrderType('ecards');
    if (page === 'products' || page?.backTo === 'products')
      setOrderType('products');
  }, [page]);

  const state = useSelector((state: any) => state);

  const orders = state?.orderListMy?.orders?.welcomeWienerOrders;
  const loading = state?.orderListMy?.loading;
  const ecardOrders = state?.orderListMy?.orders?.ecardOrders;

  const ecardList = state?.eCardList.eCards;

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(listECards());
  }, [dispatch]);

  return (
    <div style={{ padding: '128px 16px' }}>
      <div style={{ maxWidth: '968px', width: '100%', marginInline: 'auto' }}>
        <TabContainer>
          <Tab
            active={orderType === 'ecards'}
            onClick={() => setOrderType('ecards')}
          >
            Ecard Donations
          </Tab>
          <Tab
            active={orderType === 'products'}
            onClick={() => setOrderType('products')}
          >
            Welcome Wiener Donations
          </Tab>
        </TabContainer>

        {orderType === 'ecards' && ecardOrders?.length === 0 ? (
          <Flex alignItems='center' flexDirection='column'>
            <i className='fas fa-envelope mx-auto fa-2x'></i>
            <Text fontSize='16px' maxWidth='520px' textAlign='center'>
              Sending an ecard is a wonderful way to brighten someone's day and
              support a cause. Spread joy while helping dachshunds in need!
            </Text>
            <Flex marginTop='32px'>
              {ecardList
                ?.map((ecard: any, i: number) => (
                  <div key={i}>
                    {loading ? (
                      <LoadingImg w='150px' h='150px' />
                    ) : (
                      <Link
                        to={{
                          pathname: `/e-card-details`,
                          state: { product: ecard },
                        }}
                      >
                        <Image
                          src={ecard?.image}
                          width='150px'
                          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                      </Link>
                    )}
                  </div>
                ))
                .filter((_: any, i: number) => i < 5)}
            </Flex>
          </Flex>
        ) : (
          orderType === 'ecards' &&
          ecardOrders?.map((order: any) => (
            <MyEcardOrders order={order} key={order?._id} />
          ))
        )}
        {orderType === 'products' && orders?.length === 0 ? (
          <Text>You have not donated towards Welcome Wieiners yet.</Text>
        ) : (
          orderType === 'products' &&
          orders?.map((order: any) => (
            <MyWelcomeWienerOrders order={order} key={order?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
