// don
import '@mantine/core/styles.css';
import "@mantine/notifications/styles.css";
import 'mantine-datatable/styles.layer.css';


import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';

// Import the generated route tree
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './api/query';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import { theme } from './theme';


// Create a new router instance
const router = createRouter({
  routeTree, context: {
    auth: undefined!
  }
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}


function App() {
  const auth = useAuth()
  return (
    <RouterProvider router={router} context={{ auth }} />
  )
}

// Render the app
const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <Notifications />
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              <App />
              <TanStackRouterDevtools router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
