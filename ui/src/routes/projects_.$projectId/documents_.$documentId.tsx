import { Documents } from '@/api'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/documents/$documentId')({
    component: DocumentPage,
})

function DocumentPage() {
    const { documentId } = Route.useParams()
    const document = useQuery(Documents.one(documentId))
    return (
        <Box>
            <TitleHeader title={`Document ${document.data?.name}`} />


        </Box>
    )
}
