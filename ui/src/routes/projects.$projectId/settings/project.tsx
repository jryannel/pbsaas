import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/settings/project')({
  component: () => <div>Hello /projects/$projectId/settings/project!</div>
})