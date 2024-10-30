import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

export default function LogoutAction() {
    const auth = useAuth()
    return (
        <Button onClick={auth.logout}>Logout</Button>
    )
}