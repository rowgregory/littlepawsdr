import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ShopLayoutWithBreadcrumb } from '../../components/shop/ShopLayoutWithBreadcrumb';
import ProductDetails from './ProductDetails';
import Shop from './Shop';

const PageTitle = styled.div`
  font-size: 1rem;
  font-family: Trade Gothic, sans-serif;
  padding: 0.5rem 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text};
`;

const Breadcrumb = styled.div`
  width: fit-content;
  font-size: 0.875rem;
  .shop {
    cursor: pointer;
    color: #fff;
    padding: 0.5rem;
    border: 1px solid transparent;
    :active {
      border: 1px dashed #fff;
    }
  }
  .crumb-1 {
    color: #fff;
  }
`;

const ShopRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <ShopLayoutWithBreadcrumb
      breadcrumb={
        <PageTitle>
          <Breadcrumb>
            <div className='shop'>LPDR Shop</div>
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
