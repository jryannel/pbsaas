import { Card, Container, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register_success')({
    component: RegisterSuccess,
})

function RegisterSuccess() {

    return (
        <Container size="xs" mt="xl">
            <Stack gap="xl">
                <Title>Register Success</Title>
                <Text>Please check your email for the verification link. You can close this window now.</Text>
                <Card>
                    <Text c="dimmed">If you did not receive the email, please check your spam folder.</Text>
                    <Text c="dimmed">If you still have not received the email, please contact us.</Text>
                </Card>
            </Stack>
        </Container>
    )
}