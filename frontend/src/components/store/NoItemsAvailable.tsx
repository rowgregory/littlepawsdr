import NoShop from '../svg/NoShop';

const NoItemsAvailable = () => {
  return (
    <div className='flex flex-col items-center'>
      <NoShop color='#ccc' />
      <p className='font-Matter-Regular mt-3'>
        Sorry, no products available at the moment. Check back soon!
      </p>
    </div>
  );
};

export default NoItemsAvailable;
