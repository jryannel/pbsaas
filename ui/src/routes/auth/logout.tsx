import { Container, Text } from '@mantine/core'
import { useTimeout } from '@mantine/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { pb } from '../../api'

export const Route = createFileRoute('/auth/logout')({
    component: Logout,
})

function Logout() {
    const nav = useNavigate()
    useTimeout(() => {
        pb.authStore.clear()
        nav({ to: '/auth/login' })

    }, 1000, { autoInvoke: true })
    return (
        <Container size='xs'>
            <Text>You have been logged out.</Text>
        </Container>
    )
}
