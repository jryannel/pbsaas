import { Anchor, Box, Button, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Users } from '../../api'

export const Route = createFileRoute('/auth/register')({
    component: Register,
})


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})


type FormData = z.infer<typeof formSchema>

function Register() {
    const form = useForm<FormData>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(formSchema),
    })

    const create = useMutation(Users.create())
    function onSubmit(values: FormData) {
        create.mutate({ data: values })
    }

    return (
        <Container size='xs'>
            <Box>
                <Stack gap='md'>
                    <Title>Register</Title>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack gap='md'>
                            <TextInput label="Email" {...form.getInputProps('email')} />
                            <TextInput label="Password" {...form.getInputProps('password')} />
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