import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const CardHeader = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  padding: 14px 24px;
  border-bottom: 5px solid #f7f7f7;
`;

export const CardBody = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  padding: 14px 24px;
`;

export const OrderImg = styled(Card.Img)`
  max-width: 100px;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  margin-right: 16px;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 3px solid ${({ theme }) => theme.colors.quinary};
  width: 100%;
  margin-bottom: 26px;
`;
export const Tab = styled.div<{ active?: any }>`
  display: flex;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  background: ${({ theme, active }) => (active ? theme.colors.quinary : '')};
  color: ${({ active }) => (active ? '#fff' : '')};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.quinary};
    color: #fff;
  }
`;
