import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { AuthContextType } from '../contexts/AuthContext';

export interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Outlet />
  );
}
