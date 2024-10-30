import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/settings/general')({
    component: () => <div>Hello /projects/$projectId/settings/general!</div>
})