import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface GenericPageLayoutProps {
  jumbotron: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;

const GenericPageLayout: FC<GenericPageLayoutProps> = ({
  jumbotron,
  children,
}) => {
  return (
    <>
      <section>{jumbotron}</section>
      <Main>{children}</Main>
    </>
  );
};

export default GenericPageLayout;
