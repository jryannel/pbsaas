import { Anchor, Box, Button, Container, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth'

export const Route = createFileRoute('/auth/register')({
    beforeLoad: ({ context }) => {
        console.log('auth/register route beforeLoad')
        if (context.auth.isValid()) {
            throw redirect({ to: '/' })
        }
    },
    component: Register,
})


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})


type FormData = z.infer<typeof formSchema>

function Register() {
    const nav = useNavigate()
    const auth = useAuth()
    const form = useForm<FormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(formSchema),
    })

    async function onSubmit(values: FormData) {
        console.log(values)
        await auth.register(values.email, values.password)
        nav({ to: '/auth/register_success' })
    }

    return (
        <Container size='xs'>
            <Box>
                <Stack gap='md'>
                    <Title>Register</Title>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack gap='md'>
                            <TextInput label="Email" {...form.getInputProps('email')} />
                            <PasswordInput label="Password" {...form.getInputProps('password')} />
                            <Text>Already have an account? <Anchor href="/auth/login">Login here.</Anchor></Text>
                            <Group justify="right">
                                <Button variant="primary" type="submit">Register</Button>
                            </Group>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Container>
    )
}