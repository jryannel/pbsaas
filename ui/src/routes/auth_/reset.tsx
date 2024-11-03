
import { Box, Button, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Users } from '../../api'



export const Route = createFileRoute('/auth/reset')({
    component: Reset,
})

const FormSchema = z.object({
    email: z.string().email(),
})
type FormData = z.infer<typeof FormSchema>


// Reset password by entering an email address
// A new password reset link will be sent to the email address
function Reset() {
    const form = useForm<FormData>({
        initialValues: {
            email: '',
        },
        validate: zodResolver(FormSchema),
    })
    function onSubmit(values: FormData) {
        Users.col.requestPasswordReset(values.email).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Container size='xs'>
            <Stack gap='md'>
                <Title>Reset Password</Title>
                <Text c="dimmed">Enter your email address and we will send you a link to reset your password.</Text>
                <Box>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack gap='md'>
                            <TextInput label="Email" {...form.getInputProps('email')} />
                            <Group justify="right">
                                <Button variant="primary" type="submit">Reset</Button>
                            </Group>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    )
}
