import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import { PageLayout } from '../../components/styles/Styles';
import Adoption from './Adoption';

const AdoptRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <PageLayout>
      <Switch>
        <Route exact path={path} component={Adoption} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default AdoptRoutes;
