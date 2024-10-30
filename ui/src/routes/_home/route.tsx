import AppHeader from '@/comps/AppHeader';
import NavBar, { NavItemData } from '@/comps/NavBar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFolder, IconHome, IconNotification, IconSettings, IconShare, IconUser } from '@tabler/icons-react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';


const navItems: NavItemData[] = [
    { label: 'Dashboard', icon: <IconHome />, to: '/', children: [] },
    { label: 'Projects', icon: <IconFolder />, to: '/projects', children: [] },
    {
        label: 'Settings', icon: <IconSettings />, to: '/settings', children: [
            { label: 'Teams', to: '/settings/teams', icon: < IconShare /> },
            { label: 'Notifications', to: '/settings/notifications', icon: < IconNotification /> },
            { label: 'Account', to: '/settings/account', icon: < IconUser /> },
        ]
    },
]


export const Route = createFileRoute('/_home')({
    beforeLoad: ({ context }) => {
        console.log('_home/route beforeLoad')
        if (!context.auth.isValid()) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: Layout,
})

function Layout() {
    const [opened, { toggle }] = useDisclosure()
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <AppHeader opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar>
                <NavBar items={navItems} />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )

}