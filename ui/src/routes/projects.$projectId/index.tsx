import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/')({
    component: () => <div>Hello /_app/projects/$projectId/!</div>
})