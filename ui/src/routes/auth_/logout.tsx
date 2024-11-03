import { Container, Text } from '@mantine/core'
import { useTimeout } from '@mantine/hooks'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../hooks/useAuth'

export const Route = createFileRoute('/auth/logout')({
    beforeLoad: ({ context }) => {
        console.log('auth/logout route beforeLoad')
        if (!context.auth.isValid()) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: Logout,
})

function Logout() {
    const nav = useNavigate()
    const auth = useAuth()
    useTimeout(() => {
        auth.logout()
        nav({ to: '/auth/login' })

    }, 1000, { autoInvoke: true })
    return (
        <Container size='xs'>
            <Text>You have been logged out.</Text>
        </Container>
    )
}
