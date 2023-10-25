import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface ShopLayoutWithBreadcrumbProps {
  breadcrumb: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
  /* max-width: ${({ theme }) => theme.breakpoints[5]}; */
  margin: 0 auto;
  /* background: #e9eded; */
  /* min-height: calc(100vh - 559px); */
  /* padding: 1rem; */
  padding-top: 56px;
  min-height: 100vh;
`;

export const ShopLayoutWithBreadcrumb: FC<ShopLayoutWithBreadcrumbProps> = ({
  breadcrumb,
  children,
}) => {
  return (
    <>
      {/* <aside>{breadcrumb}</aside> */}
      <Main>{children}</Main>
    </>
  );
};
