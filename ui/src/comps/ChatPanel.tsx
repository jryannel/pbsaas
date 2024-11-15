import { Chat } from "@/api";
import { Card, Code, Divider, Paper, Stack, TextInput } from "@mantine/core";
import { TitleHeader } from "./TitleHeader";

type Props = {
    chat: Chat
}

type ChatContent = {
    message: string
    content: [
        { text: string, role: string },
    ]
}
export default function ChatPanel({ chat }: Props) {
    const content = chat.content as unknown as ChatContent[]
    console.log("content", content)
    return (
        <Paper>
            <TitleHeader title={chat.name} description={chat.description} />
            {content.map((item, index) => (
                <Card key={index} shadow="sm">
                    <Stack>
                        <Code>{item.message}</Code>
                        <Divider />
                        {item.content.map((content, index) => (
                            <Code key={index}>
                                {content.text}
                            </Code>
                        ))}
                    </Stack>
                </Card>
            ))}
            <Card shadow="sm">
                <TextInput
                    placeholder="Type your message here"
                    onChange={(e) => console.log(e.target.value)}
                />
            </Card>
        </Paper >
    )
}
