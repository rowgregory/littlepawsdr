import { Modal } from 'react-bootstrap';
import { Body, Footer, LeftBtn } from '../../components/ContinueSessionModal';
import AdminActionModalBody from '../../components/dashboard/AdminActionModalBody';
import { useDispatch, useSelector } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import styled from 'styled-components';

export const Content = styled.div<{ shake?: any }>`
  background: ${({ theme }) => theme.bg};
  padding: 16px;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
`;

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
        <Body>
          <div className='pt-5'>
            <AdminActionModalBody />
          </div>
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
