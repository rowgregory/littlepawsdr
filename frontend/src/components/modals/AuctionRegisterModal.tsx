import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type AuctionRegisterModalProps = {
  open: boolean;
  handleClose: any;
  theme: any;
  customCampaignLink: string;
};

const AuctionRegisterModal: FC<AuctionRegisterModalProps> = ({
  open,
  handleClose,
  theme,
  customCampaignLink,
}) => {
  return (
    <Modal show={open} onHide={handleClose} centered>
      <div className='bg-white rounded-xl p-4 sm:p-8 w-full relative'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <i className={`fa-solid fa-user text-2xl ${theme?.text} mr-3`}></i>
            <p className='font-Matter-Medium text-xl'>Have An Account?</p>
          </div>
          <i
            onClick={handleClose}
            className='absolute top-2 right-2 fa-solid fa-xmark cursor-pointer'
          ></i>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-5'>
          <Link
            className={`${theme?.border} border-4  ${theme?.darker} text-white text-center w-full rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:no-underline hover:${theme?.text}`}
            to='/auth/login'
            state={{
              cameFromAuction: true,
              customCampaignLink,
            }}
          >
            Login
          </Link>
          <Link
            className={`${theme?.border} border-4 ${theme?.text} text-center w-full rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:no-underline hover:${theme?.text}`}
            to='/auth/register'
            state={{
              cameFromAuction: true,
              customCampaignLink,
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuctionRegisterModal;
