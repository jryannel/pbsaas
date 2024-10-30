import AppHeader from '@/comps/AppHeader'
import NavBar, { NavItemData } from '@/comps/NavBar'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconAdjustments, IconFile, IconFolder, IconHome, IconSettings } from '@tabler/icons-react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const navItems: NavItemData[] = [
    { label: 'Project', icon: <IconHome />, to: '/projects/$projectId/', children: [] },
    { label: 'Documents', icon: <IconFile />, to: '/projects/$projectId/documents', children: [] },
    {
        label: 'Settings', icon: <IconSettings />, to: '/settings', children: [
            { label: 'General', to: '/projects/$projectId/settings/general', icon: < IconAdjustments /> },
            { label: 'Project', to: '/projects/$projectId/settings/project', icon: < IconFolder /> },
        ]
    },
]

export const Route = createFileRoute('/projects/$projectId')({
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