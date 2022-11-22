import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteDonation } from '../actions/donationActions';
import { deleteECard } from '../actions/eCardActions';
import { deleteEvent } from '../actions/eventActions';
import { deleteBlog } from '../actions/blogActions';
import { deleteNewsletterEmail } from '../actions/newsletterActions';
import { deleteProduct } from '../actions/productActions';
import { deleteRaffleWinner } from '../actions/raffleWinnerActions';
import { deleteUser } from '../actions/userActions';
import { deleteEducationTip } from '../actions/educationTipActions';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
  RightBtn,
  Title,
} from './ContinueSessionModal';
import { deleteManuallyAddedUser } from '../actions/manuallyAddUserActions';

const DeleteModal = ({ actionFunc, show, handleClose, id, publicId }: any) => {
  const dispatch = useDispatch();
  const getAction = async () => {
    switch (actionFunc) {
      case 'Event':
        if (publicId) {
          await axios.post(`/api/remove-upload/${publicId}`);
        }
        dispatch(deleteEvent(id));
        handleClose();
        break;
      case 'User':
        dispatch(deleteUser(id));
        handleClose();
        break;
      case 'Product':
        // if (publicId) {
        //   await axios.post(`/api/remove-upload/${publicId}`);
        // }
        dispatch(deleteProduct(id));
        handleClose();
        break;
      case 'Newsletter Email':
        dispatch(deleteNewsletterEmail(id));
        handleClose();
        break;
      case 'ECard':
        // if (publicId) {
        //   await axios.post(`/api/remove-upload/${publicId}`);
        // }
        dispatch(deleteECard(id));
        handleClose();
        break;
      case 'Donation':
        dispatch(deleteDonation(id));
        handleClose();
        break;
      case 'Raffle Winner':
        if (publicId) {
          await axios.post(`/api/remove-upload/${publicId}`);
        }
        dispatch(deleteRaffleWinner(id));
        handleClose();
        break;
      case 'Blog':
        if (publicId) {
          await axios.post(`/api/remove-upload/${publicId}`);
        }
        dispatch(deleteBlog(id));
        handleClose();
        break;
      case 'Education Tip':
        if (publicId) {
          await axios.post(`/api/remove-upload/${publicId}`);
        }
        dispatch(deleteEducationTip(id));
        handleClose();
        break;
      case 'Manually Added User':
        if (publicId) {
          await axios.post(`/api/remove-upload/${publicId}`);
        }
        dispatch(deleteManuallyAddedUser(id));
        handleClose();
        break;
      default:
        return;
    }
  };

  const checkForVowel = (word: string) => {
    const firstLetter = word?.charAt(0);
    const isVowel = ['A', 'E', 'I', 'O'].includes(firstLetter);
    if (isVowel) return 'an ';
    return 'a ';
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Content>
        <Header closeButton>
          <Title>
            You are about to <span>DELETE</span> {checkForVowel(actionFunc)}
            {actionFunc}
          </Title>
        </Header>
        <Body>Are you sure?</Body>
        <Footer>
          <LeftBtn onClick={handleClose}>No</LeftBtn>
          <RightBtn onClick={getAction}>Yes</RightBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export default DeleteModal;
