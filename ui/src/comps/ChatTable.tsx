import { Chat, ChatList } from "@/api";
import { Anchor } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DataTable, DataTableColumn } from "mantine-datatable";

const columns: DataTableColumn<Chat>[] = [
    { accessor: 'name', title: "Chat", render: (data) => <Anchor component={Link} to={`/projects/$projectId/chats/${data.id}`}>{data.name}</Anchor> },
    { accessor: 'description' },
    { accessor: 'project' },
]

type Props = {
    chats: UseQueryResult<ChatList>
}

export default function ChatTable({ chats }: Props) {
    return (
        <DataTable records={chats.data?.items} columns={columns} />
    )
}