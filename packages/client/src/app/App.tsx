import type { JSX } from 'react';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp, ConfigProvider } from 'antd';

import { appTheme } from 'app/app-theme';
import ErrorBoundary from 'common/components/ErrorBoundary';
import Routes from 'common/routes/Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = (): JSX.Element => (
  <StrictMode>
    <ConfigProvider theme={appTheme}>
      <AntdApp>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </QueryClientProvider>
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);

export default App;
