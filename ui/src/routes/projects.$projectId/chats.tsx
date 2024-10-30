import { Chats } from '@/api'
import ChatTable from '@/comps/ChatTable'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId/chats')({
    component: ChatsPage,
})

function ChatsPage() {
    const chats = useQuery(Chats.list(0, 20))
    return (
        <Box>
            <TitleHeader title='Project Chats' />
            <ChatTable chats={chats} />
        </Box>
    )
}