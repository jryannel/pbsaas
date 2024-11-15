import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/stacks/$stackId/dossiers_$dossierId')({
    component: () => <div>Hello /projects/$projectId/stacks/$stackId/dossiers_$dossierId!</div>
})