import { Documents } from '@/api'
import DocumentTable from '@/comps/DocumentTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/documents')({
    component: DocumentsPage,
})

function DocumentsPage() {
    const { projectId } = Route.useParams()
    const documents = useQuery(Documents.list(0, 20, { filter: `project="${projectId}"` }))
    return (
        <Box>
            <TitleHeader title="Project Documents" />
            <DocumentTable documents={documents} />
        </Box>
    )
}