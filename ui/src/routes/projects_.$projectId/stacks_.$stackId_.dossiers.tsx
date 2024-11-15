import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/stacks/$stackId/dossiers')({
    component: () => <div>Hello /projects/$projectId/stacks/$stackId/dossiers!</div>
})