import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/stacks')({
    component: () => <div>Hello /projects/$projectId/stacks!</div>
})