import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/settings/account')({
    component: Account,
})

function Account() {
    return (
        <Box>
            <TitleHeader title="Account Settings" />
        </Box>
    )
}