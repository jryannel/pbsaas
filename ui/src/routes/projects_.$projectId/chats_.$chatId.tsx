import { Chats } from '@/api'
import ChatPanel from '@/comps/ChatPanel'
import { TitleHeader } from '@/comps/TitleHeader'
import { Box, Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/projects/$projectId/chats/$chatId')({
    component: ChatPage,
})

function ChatPage() {
    const { chatId } = Route.useParams()
    const chat = useQuery(Chats.one(chatId))
    return (
        <Box>
            <TitleHeader title="Project Chat" />
            {chat.isLoading && <Loader />}
            {chat.isError && <p>Error: {chat.error.message}</p>}
            {chat.data && <ChatPanel chat={chat.data} />}
        </Box>
    )
}