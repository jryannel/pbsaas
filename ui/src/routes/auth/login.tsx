
import { Anchor, Box, Button, Container, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { notifyError } from '../../helper/notify'
import { useAuth } from '../../hooks/useAuth'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type FormData = z.infer<typeof formSchema>


export const Route = createFileRoute('/auth/login')({
    beforeLoad: ({ context }) => {
        console.log('auth/login route beforeLoad')
        if (context.auth.isValid()) {
            throw redirect({ to: '/' })
        }
    },
    component: Login,
})


function Login() {
    const auth = useAuth()
    const nav = useNavigate()

    const form = useForm<FormData>({
        initialValues: {
            email: '',
            password: ''
        },
        validate: zodResolver(formSchema),
    })

    async function onSubmit(values: FormData) {
        try {
            await auth.login(values.email, values.password)
            nav({ to: '/' })
        } catch (err: any) {
            notifyError(err.message)
        }

    }



    return (
        <Container size='xs'>
            <Stack gap='md'>
                <Title>Login</Title>
                <Box>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack gap='md'>
                            <TextInput label="Email" {...form.getInputProps('email')} />
                            <PasswordInput label="Password" {...form.getInputProps('password')} />
                            <Stack gap="0">
                                <Text>Don't have an account yet? <Anchor component={Link} to="/auth/register">Register here now.</Anchor></Text>
                                <Text>Forgot your password? <Anchor component={Link} to="/auth/reset">Reset here.</Anchor></Text>
                            </Stack>
                            <Group justify="right">
                                <Button variant="primary" type="submit">Login</Button>
                            </Group>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container >
    )
}

