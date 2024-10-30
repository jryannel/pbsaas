import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/settings/notifications')({
    component: Notifications
})

function Notifications() {
    return (
        <Box>
            <TitleHeader title="Notifications Settings" />
        </Box>
    )
}