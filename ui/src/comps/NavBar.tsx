import { NavLink, Stack } from "@mantine/core";
import { Link } from "@tanstack/react-router";


export type NavItemData = {
    label: string
    icon: JSX.Element
    to: string
    children?: NavItemData[]
}

type Props = {
    items: NavItemData[]
    from?: string
}

export default function NavBar({ items, from }: Props) {
    return (
        <Stack m="md">
            {items.map((item, index) => (
                <NavLink
                    component={Link}
                    key={index}
                    to={item.to}
                    label={item.label}
                    leftSection={item.icon}
                    activeOptions={{ exact: true }}
                    from={from}
                >
                    {item.children?.length !== 0 && item.children?.map((child, index) => (
                        <NavLink
                            component={Link}
                            key={index}
                            to={child.to}
                            label={child.label}
                            leftSection={child.icon}
                            activeOptions={{ exact: true }}
                            from={from}
                        />
                    ))}
                </NavLink>
            ))}
        </Stack>
    )
}