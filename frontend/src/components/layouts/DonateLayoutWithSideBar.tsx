import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface DonateLayoutWithSideBarProps {
  jumbotron: ReactNode;
  children: ReactNode;
  sideBar: ReactNode;
}

const Content = styled.div`
  background: #f7f7f7;
`;

const Main = styled.main`
  width: 100%;
  max-width: 768px;
  margin-inline: auto;
`;

const SideBar = styled.aside`
  padding: 96px 0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
  padding: 0;
`;

const DonateLayoutWithSideBar: FC<DonateLayoutWithSideBarProps> = ({
  jumbotron,
  children,
  sideBar,
}) => {
  return (
    <Container>
      <section>{jumbotron}</section>
      <Content>
        <Main>{children}</Main>
      </Content>
      <SideBar>{sideBar}</SideBar>
    </Container>
  );
};

export default DonateLayoutWithSideBar;
