import type { JSX } from 'react';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { App as AntdApp, ConfigProvider } from 'antd';

import { appTheme } from 'app/app-theme';
import { API_BASE_URL } from 'common/common-constants';
import ErrorBoundary from 'common/components/ErrorBoundary';
import Routes from 'common/routes/Routes';

export const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

const App = (): JSX.Element => (
  <StrictMode>
    <ConfigProvider theme={appTheme}>
      <AntdApp className='flex flex-column full-height full-width'>
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ApolloProvider>
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);

export default App;
