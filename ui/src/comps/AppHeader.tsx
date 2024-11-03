import { Anchor, Breadcrumbs, Burger, Group, ThemeIcon } from "@mantine/core";
import { IconGraph } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import UserAction from "./UserAction";


export type BreadcrumbItem = {
    label: string
    to: string
    icon?: JSX.Element
}
export type HeaderProps = {
    opened: boolean
    toggle: () => void
    breadcrumbs?: BreadcrumbItem[]
}

export default function Header({ opened, toggle, breadcrumbs }: HeaderProps) {
    return (
        <Group m="md" justify="space-between">
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Anchor component={Link} to="/">
                    <ThemeIcon size={32}>
                        <IconGraph />
                    </ThemeIcon>
                </Anchor>
                <Breadcrumbs>
                    {breadcrumbs?.map((item, index) => (
                        <Anchor key={index} component={Link} to={item.to}>{item.label}</Anchor>
                    ))}
                </Breadcrumbs>
            </Group>
            <Group align="flex-end">
            </Group>
            <Group>
                <UserAction />
            </Group>
        </Group >
    )
}