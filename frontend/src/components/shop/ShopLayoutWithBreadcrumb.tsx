import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface ShopLayoutWithBreadcrumbProps {
  breadcrumb: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[5]};
  margin: 0 auto;
  padding: 2.5rem 0 0 0;
`;

export const ShopLayoutWithBreadcrumb: FC<ShopLayoutWithBreadcrumbProps> = ({
  breadcrumb,
  children,
}) => {
  return (
    <>
      <aside>{breadcrumb}</aside>
      <Main>{children}</Main>
    </>
  );
};
