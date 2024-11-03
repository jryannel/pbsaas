import { Projects, Teams } from '@/api'
import ProjectTable from '@/comps/ProjectTable'
import TeamTable from '@/comps/TeamTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
    component: HomePage,
})

function HomePage() {
    const projects = useQuery(Projects.list(0, 20))
    const teams = useQuery(Teams.list(0, 20))
    return (
        <Box>
            <Stack gap="md">
                <TitleHeader title="My Projects" />
                <ProjectTable projects={projects} />
                <TitleHeader title="My Teams" />
                <TeamTable teams={teams} />
            </Stack>
        </Box>

    )
}