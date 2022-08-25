import { FC } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ShopLayoutWithBreadcrumb } from '../../components/shop/ShopLayoutWithBreadcrumb';
import ProductDetails from './ProductDetails';
import Shop from './Shop';

const PageTitle = styled.div`
  font-size: 1rem;
  font-family: Trade Gothic, sans-serif;
  padding: 0.5rem 48px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.text};
`;

const Breadcrumb = styled.div`
  width: fit-content;
  font-size: 0.875rem;
  a {
    cursor: pointer;
    color: #fff;
    padding: 0.5rem;
    border: 1px solid transparent;
    :active {
      border: 1px dashed #fff;
    }
    text-decoration: none;
  }
`;

const ShopRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <ShopLayoutWithBreadcrumb
      breadcrumb={
        <PageTitle>
          <Breadcrumb>
            <Link to='/shop'>LPDR Shop</Link>
          </Breadcrumb>
        </PageTitle>
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
