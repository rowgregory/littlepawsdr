import React, { ReactNode, FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NoItemsDefault from '../common/NoItemsDefault';

interface ShopLayoutWithBreadcrumbProps {
  breadcrumb: ReactNode;
  children: ReactNode;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryBg};
`;

const Aside = styled.aside``;

const Path = styled.path`
  fill: ${({ theme }) => theme.text};
`;

const NoProducts = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 256 230'
      width='200px'
      height='200px'
    >
      <Path
        d='M61.2,106h37.4v31.2H61.2V106z M61.2,178.7h37.4v-31.2H61.2V178.7z M61.2,220.1h37.4v-31.2H61.2V220.1z M109.7,178.7H147
	v-31.2h-37.4V178.7z M109.7,220.1H147v-31.2h-37.4V220.1z M158.2,188.9v31.2h37.4v-31.2H158.2z M255,67.2L128.3,7.6L1.7,67.4
	l7.9,16.5l16.1-7.7v144h18.2V75.6h169v144.8h18.2v-144l16.1,7.5L255,67.2z'
      />
    </svg>
  );
};

export const ShopLayoutWithBreadcrumb: FC<ShopLayoutWithBreadcrumbProps> = ({
  breadcrumb,
  children,
}) => {
  const state = useSelector((state: any) => state);
  const productRef = useRef() as any;

  // useEffect(() => {
  //   if (state?.productList?.products?.length === 0) {
  //     productRef.current = true;
  //   } else {
  //     productRef.current = false;
  //   }
  // }, [state]);
  // if (productRef.current) {
  //   return <NoItemsDefault items='products' Icon={NoProducts} />;
  // }

  return (
    <Container>
      <Aside>{breadcrumb}</Aside>
      <Main>{children}</Main>
    </Container>
  );
};
