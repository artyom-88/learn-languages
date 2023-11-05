import type { JSX } from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';

import LoadingPage from 'common/components/LoadingPage';
import * as routesConstants from 'common/routes/routes-constants';

const MainPage = lazy(() => import('features/MainPage'));

const loadingPage = <LoadingPage />;

const redirectToRoot = <Navigate to={routesConstants.ROOT_URL} />;

const Routes = (): JSX.Element => (
  <Suspense fallback={loadingPage}>
    <ReactRoutes>
      <Route element={<MainPage />} path={routesConstants.ROOT_URL} />
      <Route element={redirectToRoot} path='*' />
    </ReactRoutes>
  </Suspense>
);

export default Routes;
