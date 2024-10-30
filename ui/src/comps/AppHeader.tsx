import { Burger, Button, Group, Title } from "@mantine/core";
import { IconGraph } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import UserAction from "./UserAction";

export default function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    return (
        <Group m="md" justify="space-between">
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Button component={Link} to="/" leftSection={<IconGraph size={32} />} variant="transparent">
                    <Title order={4}>PBSaas</Title>
                </Button>
            </Group>
            <Group>
                <UserAction />
            </Group>
        </Group>
    )
}