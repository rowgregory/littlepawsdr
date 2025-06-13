import React from 'react';
import toFixed from '../../../utils/toFixed';

interface AuctionItem {
  name: string;
  photos: { url: string }[];
  currentBid: number;
}

interface WinningBid {
  auctionItems: AuctionItem[]; // plural now
  subtotal: number;
  shipping: number;
  totalPrice: number;
}

interface PaymentDetailsProps {
  winningBid: WinningBid;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ winningBid }) => (
  <div className='bg-white rounded-xl w-full mt-3.5 lg:mt-0 mb-4'>
    <div className='flex flex-col'>
      {winningBid.auctionItems.map((item, index) => (
        <div key={index} className='flex items-center justify-between my-3'>
          <figure className='flex items-center'>
            <img src={item.photos[0]?.url} className='w-16 h-16 rounded-lg object-cover' alt={`Auction Item ${item.name}`} />
            <figcaption className='ml-4 font-Matter-Medium'>{item.name}</figcaption>
          </figure>
          <p className='font-Matter-Regular'>${toFixed(item.currentBid)}</p>
        </div>
      ))}

      <div className='w-full h-[0.5px] bg-gray-100 mb-4'></div>

      <div className='flex items-center justify-between mb-3'>
        <p className='font-Matter-Regular'>Subtotal</p>
        <p className='font-Matter-Regular'>${toFixed(winningBid.subtotal)}</p>
      </div>

      <div className='flex items-center justify-between mb-3'>
        <p className='font-Matter-Regular'>Shipping Fee</p>
        <p className='font-Matter-Regular'>${toFixed(winningBid.shipping)}</p>
      </div>

      <div className='flex items-center justify-between mt-3.5'>
        <p className='font-Matter-Medium'>Total</p>
        <p className='font-Matter-Medium'>${toFixed(winningBid.totalPrice)}</p>
      </div>
    </div>
  </div>
);

export default PaymentDetails;
