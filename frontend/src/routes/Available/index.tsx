import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
`;

const AvailableRoutes: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<ListAvailableDogs />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </Container>
  );
};

export default AvailableRoutes;
