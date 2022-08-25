import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface AppLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  background: #121212;
`;

const AppLayoutWithSideBar: FC<AppLayoutWithSideBarProps> = ({
  sideBar,
  children,
}): JSX.Element => {
  return (
    <Container>
      <aside>{sideBar}</aside>
      <Main>{children}</Main>
    </Container>
  );
};

export default AppLayoutWithSideBar;
