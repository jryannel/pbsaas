import { Projects } from '@/api'
import ProjectTable from '@/comps/ProjectTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/$teamId/projects')({
    component: ProjectsPage,
})

function ProjectsPage() {
    const { teamId } = Route.useParams()
    const projects = useQuery(Projects.list(0, 10, { filter: `team = "${teamId}"` }))
    return (
        <Box>
            <TitleHeader title="Projects" />
            <ProjectTable projects={projects} />
        </Box>
    )
}