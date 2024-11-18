const AuctionButton = ({ item, handleButtonClick, theme }: any) => {
  return item?.totalQuantity === 0 && item.isFixed ? (
    <div className='flex items-center'>
      <div
        className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1 rounded-md border-gray-200 bg-gray-100`}
      >
        ${item?.buyNowPrice}
      </div>
      <div className='flex-flex col'>
        <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item has sold out</p>
      </div>
    </div>
  ) : (
    <button
      onClick={handleButtonClick}
      className={`h-10 w-full py-2.5 font-Matter-Medium flex items-center justify-center duration-200 border-[1px] ${theme?.border} rounded-md hover:no-underline hover:text-[#fff] hover:${theme.darker}`}
    >
      {item?.itemBtnText}
      {item?.isFixed && `⚡ $${item?.buyNowPrice}`}
    </button>
  );
};

export default AuctionButton;
