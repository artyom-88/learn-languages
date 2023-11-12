import type { JSX } from 'react';
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import LoadingPage from 'common/components/LoadingPage';
import PageLayout from 'common/components/PageLayout';
import * as routesConstants from 'common/routes/routes-constants';

const MainPage = lazy(() => import('features/MainPage'));
const WordsPage = lazy(() => import('features/words/WordsPage'));
const EditWordForm = lazy(() => import('features/words/EditWordForm'));

const loadingPage = <LoadingPage />;

const routesConfig: RouteObject[] = [
  {
    element: <PageLayout />,
    path: '/',
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        element: <WordsPage />,
        path: `${routesConstants.WORDS_URL}`,
        children: [
          {
            element: <EditWordForm />,
            path: `:${routesConstants.WORD_NAME_PARAM}`,
          },
        ],
      },
      {
        element: <Navigate to={routesConstants.ROOT_URL} />,
        path: '*',
      },
    ],
  },
];

const Routes = (): JSX.Element => {
  const routes = useRoutes(routesConfig);
  return <Suspense fallback={loadingPage}>{routes}</Suspense>;
};

export default Routes;
