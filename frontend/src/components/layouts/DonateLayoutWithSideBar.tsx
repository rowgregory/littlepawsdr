import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface DonateLayoutWithSideBarProps {
  jumbotron: ReactNode;
  children: ReactNode;
  sideBar: ReactNode;
}

const Content = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 2rem;
    flex: 4;
  }
`;

const SideBar = styled.aside`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex: 1;
    padding: 2rem;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  margin-bottom: 5rem;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-top: 5rem;
    padding: 0;
  }
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
        <SideBar>{sideBar}</SideBar>
      </Content>
    </Container>
  );
};

export default DonateLayoutWithSideBar;
