// don
import '@mantine/core/styles.css';
import "@mantine/notifications/styles.css";
import 'mantine-datatable/styles.layer.css';


import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ActionIcon, Button, createTheme, MantineProvider, NavLink, ThemeIcon } from '@mantine/core';

// Import the generated route tree
import { queryClient } from './api/query';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';


// Create a new router instance
const router = createRouter({
  routeTree, context: {
    breadcrumbs: []
  }
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: 'light',
      },
    }),
    NavLink: NavLink.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
  },
});

// Render the app
const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>

      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
