import { AppShell, Container } from '@mantine/core';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export interface MyRouterContext {
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
      </AppShell.Header>
      <AppShell.Main>
        <Container size='xl' p='md'>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell >
  );
}
