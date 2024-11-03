import { Documents } from '@/api'
import DocumentTable from '@/comps/DocumentTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/')({
    component: ProjectDashboard
})

function ProjectDashboard() {
    const { projectId } = Route.useParams()
    const documents = useQuery(Documents.list(0, 10, { filter: `project.id="${projectId}"` }))
    return (
        <Box>
            <TitleHeader title="Project Dashboard" />
            <DocumentTable documents={documents} />
        </Box>
    )
}