import { Teams } from '@/api';
import AppHeader, { BreadcrumbItem } from '@/comps/AppHeader';
import NavBar, { NavItemData } from '@/comps/NavBar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFolder, IconHome, IconSettings } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';


const navItems: NavItemData[] = [
  { label: 'Team', icon: <IconHome />, to: '', children: [] },
  { label: 'Projects', icon: <IconFolder />, to: 'projects', children: [] },
  { label: 'Settings', icon: <IconSettings />, to: 'settings' },
]


export const Route = createFileRoute('/teams/$teamId')({
  beforeLoad: ({ context }) => {
    console.log('_home/route beforeLoad')
    if (!context.auth.isValid()) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: Layout,
})

function Layout() {
  const { teamId } = Route.useParams()
  const team = useQuery(Teams.one(teamId))
  const bcItems: BreadcrumbItem[] = [
    { label: `${team.data?.name}`, to: `/teams/${teamId}` },
  ]
  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} breadcrumbs={bcItems} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar items={navItems} from='/teams/$teamId/' />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )

}