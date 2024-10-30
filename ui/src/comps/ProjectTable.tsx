import { Project, ProjectList } from "@/api";
import { Anchor } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DataTable, DataTableColumn } from "mantine-datatable";

const projectColumns: DataTableColumn<Project>[] = [
    { accessor: 'name', title: "Project", render: (data) => <Anchor component={Link} to={`/projects/${data.id}`}>{data.name}</Anchor> },
    { accessor: 'description' },
    { accessor: 'owner' },
]

type Props = {
    projects: UseQueryResult<ProjectList>
}

export default function ProjectTable({ projects }: Props) {
    return (
        <DataTable records={projects.data?.items} columns={projectColumns} />
    )
}