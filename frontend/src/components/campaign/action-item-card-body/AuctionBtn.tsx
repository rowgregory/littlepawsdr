const AuctionButton = ({ item, handleButtonClick, theme }: any) => (
  <button
    onClick={handleButtonClick}
    className={`h-10 w-full py-2.5 font-Matter-Medium flex items-center justify-center duration-200 border-[1px] ${theme?.border} rounded-md hover:no-underline hover:text-[#fff] hover:${theme.darker}`}
  >
    {item?.itemBtnText}
    {item?.isFixed && `$${item?.buyNowPrice}`}
  </button>
);

export default AuctionButton;
