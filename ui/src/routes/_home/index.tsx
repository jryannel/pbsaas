import { Projects } from '@/api'
import ProjectTable from '@/comps/ProjectTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/')({
    component: HomePage,
})

function HomePage() {
    const projects = useQuery(Projects.list(0, 20))
    return (
        <Box>
            <TitleHeader title="Recent Projects" />
            <ProjectTable projects={projects} />
        </Box>

    )
}