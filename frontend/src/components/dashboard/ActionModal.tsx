import { Image, Modal } from 'react-bootstrap';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
} from '../../components/ContinueSessionModal';
import AdminActionModalBody from '../../components/dashboard/AdminActionModalBody';
import Logo from '../../components/assets/logo-transparent.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';

const ActionModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const openOrClose = state.dashboard.modal.openOrClose;

  return (
    <Modal
      show={openOrClose}
      onHide={() => dispatch(openCloseDashboardModal(false))}
      centered
    >
      <Content className='p-0'>
        <Header closeButton className='p-2'>
          <Link
            to='/'
            className='mx-auto'
            onClick={() => dispatch(openCloseDashboardModal(false))}
          >
            <Image src={Logo} alt='LPDR' height='48px' width='auto' />
          </Link>
        </Header>
        <Body>
          <AdminActionModalBody />
        </Body>
        <Footer>
          <LeftBtn onClick={() => dispatch(openCloseDashboardModal(false))}>
            Close
          </LeftBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export default ActionModal;
