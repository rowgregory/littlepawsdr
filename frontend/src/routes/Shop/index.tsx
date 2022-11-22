import { FC } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ShopLayoutWithBreadcrumb } from '../../components/shop/ShopLayoutWithBreadcrumb';
import ProductDetails from './ProductDetails';
import Shop from './Shop';

export const PageTitle = styled.div`
  padding: 0.5rem 48px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.text};
`;

export const Breadcrumb = styled.div`
  width: fit-content;
  a {
    cursor: pointer;
    color: #fff;
    padding: 0.5rem;
    border: 1px solid transparent;
    text-decoration: none;
    :active {
      border: 1px dashed #fff;
    }
  }
`;

const ShopRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <ShopLayoutWithBreadcrumb
      breadcrumb={
        // <PageTitle>
        <Breadcrumb>
          <Link to='/shop'>LPDR Shop</Link>
        </Breadcrumb>
        // </PageTitle>
      }
    >
      <Switch>
        <Route exact path={path} component={() => <Shop />} />
        <Route path={`${path}/product/:id`} component={ProductDetails} />
      </Switch>
    </ShopLayoutWithBreadcrumb>
  );
};

export default ShopRoutes;
