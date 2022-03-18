import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { PageLayout } from '../styles/Styles';

interface DonatedLayoutWithNavProps {
  nav: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  display: flex;
`;

export const DonateLayoutWithNav: FC<DonatedLayoutWithNavProps> = ({
  nav,
  children,
}) => {
  return (
    <PageLayout>
      <Section>{nav}</Section>
      <Main>{children}</Main>
    </PageLayout>
  );
};
