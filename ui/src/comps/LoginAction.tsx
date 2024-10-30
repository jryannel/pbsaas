import { Button } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

export default function LoginAction() {
    const nav = useNavigate()

    function onClick() {
        nav({ to: '/auth/login' })
    }

    return <Button onClick={onClick}>Login</Button>
}