import { Projects } from '@/api'
import AppHeader, { BreadcrumbItem } from '@/comps/AppHeader'
import NavBar, { NavItemData } from '@/comps/NavBar'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFile, IconHome, IconMessages, IconSettings, IconStack } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const navItems: NavItemData[] = [
    { label: 'Project', icon: <IconHome />, to: '' },
    { label: 'Documents', icon: <IconFile />, to: 'documents' },
    { label: 'Chats', icon: <IconMessages />, to: 'chats' },
    { label: 'Card Stacks', icon: <IconStack />, to: 'stacks' },
    { label: 'Settings', icon: <IconSettings />, to: 'settings' },
]


export const Route = createFileRoute('/projects/$projectId')({
    beforeLoad: ({ context }) => {
        console.log('projects/$projectId route beforeLoad')
        if (!context.auth.isValid()) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: Layout,
})

function Layout() {
    const { projectId } = Route.useParams()
    const project = useQuery(Projects.one(projectId, { expand: "team" }))
    const bcItems: BreadcrumbItem[] = [
        { label: `${project.data?.expand?.team.name}`, to: `/teams/${project.data?.expand?.team.id}` },
        { label: `${project.data?.name}`, to: `/projects/${projectId}` },
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
                <NavBar items={navItems} from='/projects/$projectId/' />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )

}