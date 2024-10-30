import { TitleHeader } from '@/comps/TitleHeader'
import { Box, Button, Card, Group, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_home/projects/new')({
    component: () => <div>Hello /_home/projects/new!</div>
})

const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
})

type FormData = z.infer<typeof schema>

function NewProject() {

    const form = useForm<FormData>({
        initialValues: {
            name: '',
            description: '',
        },
        validate: zodResolver(schema),
    })

    function onSubmit(values: FormData) {
        console.log(values)
    }

    return (
        <Box>
            <TitleHeader title="New Project" />
            <Card>
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <TextInput label="Name" {...form.getInputProps('name')} />
                        <TextInput label="Description" {...form.getInputProps('description')} />
                        <Group justify="right">
                            <Button variant="primary" type="submit">Create</Button>
                        </Group>
                    </Stack>
                </form>
            </Card>

        </Box>
    )
}