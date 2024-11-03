import AppHeader, { BreadcrumbItem } from '@/comps/AppHeader';
import NavBar, { NavItemData } from '@/comps/NavBar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFolder, IconHome, IconSettings, IconUsers } from '@tabler/icons-react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';


const navItems: NavItemData[] = [
    { label: 'Dashboard', icon: <IconHome />, to: '/', children: [] },
    { label: 'Projects', icon: <IconFolder />, to: '/projects', children: [] },
    { label: 'Teams', icon: <IconUsers />, to: '/teams', children: [] },
    { label: 'Settings', icon: <IconSettings />, to: '/settings' },
]


export const Route = createFileRoute('/_app')({
    beforeLoad: ({ context }) => {
        if (!context.auth.isValid()) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: Layout,
})

function Layout() {
    const [opened, { toggle }] = useDisclosure()
    const bcItems: BreadcrumbItem[] = [
        { label: 'PBSaas', to: '/' },
    ]
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
                <NavBar items={navItems} />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )

}