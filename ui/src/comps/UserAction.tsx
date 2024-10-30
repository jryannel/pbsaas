import { Button, Menu } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import LoginAction from "./LoginAction";

export default function UserAction() {
    const auth = useAuth()
    if (!auth.user) {
        return <LoginAction />
    }

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button leftSection={<IconUser />}>{auth.user.email}</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item component={Link} to="/auth/settings">Settings</Menu.Item>
                <Menu.Item onClick={auth.logout}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}