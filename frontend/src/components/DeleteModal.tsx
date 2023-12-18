// import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
import { deleteWelcomeWienerProduct } from '../actions/welcomeWienerProductActions';
import { deleteWelcomeWienerDachshund } from '../actions/welcomeWienerDachshundActions';

const DeleteModal = ({ actionFunc, show, handleClose, id }: any) => {
  const dispatch = useDispatch();
  const getAction = async () => {
    switch (actionFunc) {
      case 'Event':
        dispatch(deleteEvent(id));
        handleClose();
        break;
      case 'User':
        dispatch(deleteUser(id));
        handleClose();
        break;
      case 'Product':
        dispatch(deleteProduct(id));
        handleClose();
        break;
      case 'Newsletter Email':
        dispatch(deleteNewsletterEmail(id));
        handleClose();
        break;
      case 'ECard':
        dispatch(deleteECard(id));
        handleClose();
        break;
      case 'Raffle Winner':
        dispatch(deleteRaffleWinner(id));
        handleClose();
        break;
      case 'Blog':
        dispatch(deleteBlog(id));
        handleClose();
        break;
      case 'Education Tip':
        dispatch(deleteEducationTip(id));
        handleClose();
        break;
      case 'Board Member':
        dispatch(deleteManuallyAddedUser(id));
        handleClose();
        break;
      case 'Welcome Wiener Product':
        dispatch(deleteWelcomeWienerProduct(id));
        handleClose();
        break;
      case 'Welcome Wiener Dachshund':
        dispatch(deleteWelcomeWienerDachshund(id));
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
        <Header closeButton placeholder={null}>
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
