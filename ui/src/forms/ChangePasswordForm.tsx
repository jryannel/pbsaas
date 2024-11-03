import { Button, Fieldset, Group, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const schema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

type FormData = z.infer<typeof schema>

export default function ChangePasswordForm() {
    const form = useForm<FormData>({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: zodResolver(schema),
    })

    function onSubmit(values: FormData) {
        console.log(values)
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Fieldset legend="Change Password">
                <Stack>
                    <TextInput label="Password" {...form.getInputProps('password')} />
                    <TextInput label="Confirm Password" {...form.getInputProps('confirmPassword')} />
                    <Group justify="right">
                        <Button variant="primary" type="submit">Apply</Button>
                    </Group>
                </Stack>
            </Fieldset>
        </form>
    )
}