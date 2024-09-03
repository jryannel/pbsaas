import { Anchor, Box, Button, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Users } from '../../api'

export const Route = createFileRoute('/auth/login')({
    component: Login,
})

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type FormData = z.infer<typeof formSchema>

function Login() {

    const form = useForm<FormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(formSchema),
    })

    function onSubmit(values: FormData) {
        Users.col.authWithPassword(values.email, values.password).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container size='xs'>
            <Stack gap='md'>
                <Title>Login</Title>
                <Box>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack gap='md'>
                            <TextInput label="Email" {...form.getInputProps('email')} />
                            <TextInput label="Password" {...form.getInputProps('password')} />
                            <Text>Don't have an account yet? <Anchor href="/auth/register">Register here now.</Anchor></Text>
                            <Group justify="right">
                                <Button variant="primary" type="submit">Login</Button>
                            </Group>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    )
}

