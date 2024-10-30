import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/settings/teams')({
    component: () => <div>Hello /_app/settings/teams!</div>
})