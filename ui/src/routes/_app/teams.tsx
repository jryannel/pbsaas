import { Teams } from '@/api'
import TeamTable from '@/comps/TeamTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/teams')({
    component: TeamsPage,
})

function TeamsPage() {
    const rows = useQuery(Teams.list(0, 10))
    return (
        <Box>
            <TitleHeader title="Teams Settings" />
            <TeamTable teams={rows} />
        </Box>
    )
}