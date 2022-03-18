import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { PageLayout } from '../styles/Styles';

interface PageLayoutWithTabsProps {
  tabs: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  display: flex;
`;

const PageLayoutWithTabs: FC<PageLayoutWithTabsProps> = ({
  tabs,
  children,
}) => {
  return (
    <PageLayout>
      <Section>{tabs}</Section>
      <Main>{children}</Main>
    </PageLayout>
  );
};

export default PageLayoutWithTabs;
