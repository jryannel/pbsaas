import { pb, Users } from "@/api"
import { Button, Fieldset, Group, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { useShallowEffect } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"


const schema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
})

type FormData = z.infer<typeof schema>

export default function AccountInfoForm() {
    const userId = pb.authStore.model?.id
    const user = useQuery(Users.one(userId))
    const form = useForm<FormData>({
        initialValues: {
            username: '',
            email: '',
        },
        validate: zodResolver(schema),
    })

    useShallowEffect(() => {
        if (user.data) {
            form.setValues({
                username: user.data.username,
                email: user.data.email,
            })
        }
    }, [user])

    function onSubmit(values: FormData) {
        console.log(values)
    }

    return (
        <Fieldset legend="Account Information">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <TextInput label="Username" {...form.getInputProps('name')} />
                    <TextInput label="Email" {...form.getInputProps('email')} readOnly />
                    <Group justify="right">
                        <Button variant="primary" type="submit">Apply</Button>
                    </Group>
                </Stack>
            </form>
        </Fieldset>

    )
}