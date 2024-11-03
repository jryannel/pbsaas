import { Team, TeamList } from "@/api";
import { Anchor } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DataTable, DataTableColumn } from "mantine-datatable";

const projectColumns: DataTableColumn<Team>[] = [
    { accessor: 'name', title: "Team", render: (data) => <Anchor component={Link} to={`/teams/${data.id}`}>{data.name}</Anchor> },
    { accessor: 'description' },
    { accessor: 'owner' },
]

type Props = {
    teams: UseQueryResult<TeamList>
}

export default function TeamTable({ teams }: Props) {
    return (
        <DataTable records={teams.data?.items} columns={projectColumns} />
    )
}