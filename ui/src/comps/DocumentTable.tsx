import { Document, DocumentList } from "@/api";
import { Anchor } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DataTable, DataTableColumn } from "mantine-datatable";

const columns: DataTableColumn<Document>[] = [
    { accessor: 'name', title: "Document", render: (data) => <Anchor component={Link} to={`/projects/$projectId/documents/${data.id}`}>{data.name}</Anchor> },
    { accessor: 'description' },
    { accessor: 'project' },
]

type Props = {
    documents: UseQueryResult<DocumentList>
}

export default function ProjectTable({ documents }: Props) {
    return (
        <DataTable records={documents.data?.items} columns={columns} />
    )
}