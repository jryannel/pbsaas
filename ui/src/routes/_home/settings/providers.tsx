import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/settings/providers')({
    component: ProvidersSettings
})

function ProvidersSettings() {
    return (
        <Box>
            <TitleHeader title="KI Provider Settings" />
        </Box>
    )
}