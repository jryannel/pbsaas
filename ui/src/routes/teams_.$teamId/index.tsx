import { Projects } from '@/api'
import ProjectTable from '@/comps/ProjectTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/$teamId/')({
    component: TeamItemPage,
})

function TeamItemPage() {
    const projects = useQuery(Projects.list(0, 20))
    return (
        <Box>
            <TitleHeader title="Team Dashboard" />
            <ProjectTable projects={projects} />
        </Box>
    )
}