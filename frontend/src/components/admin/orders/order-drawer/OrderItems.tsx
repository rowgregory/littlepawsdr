import EcardItem from './EcardItem';
import LegacyItem from './LegacyItem';
import ProductItem from './ProductItem';
import WelcomeWienerItem from './WelcomeWienerItem';

const OrderItems = ({ orderOpened }: { orderOpened: any }) => {
  return (
    <div className='no-scrollbar'>
      {[
    // If `orderItems` is present, use it, otherwise use the new attributes
    ...(orderOpened?.order?.orderItems || [
      ...(orderOpened?.order?.ecards || []),
      ...(orderOpened?.order?.welcomeWieners || []),
      ...(orderOpened?.order?.products || []),
    ]),
  ]?.map((item: any, i: number) => {
        switch (item?.type) {
          case 'ECARD':
            return <EcardItem key={i} item={item} />;
          case 'WELCOME_WIENER':
            return <WelcomeWienerItem key={i} item={item} />;
          case 'PRODUCT':
            return <ProductItem key={i} item={item} isShipped={orderOpened?.order?.isShipped} />;
          default:
            return <LegacyItem key={i} item={item} />;
        }
      })}
    </div>
  );
};

export default OrderItems;
