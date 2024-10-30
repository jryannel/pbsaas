
import { Group, Stack, Text, Title } from "@mantine/core";

type Props = {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export function TitleHeader({ title, description, children }: Props) {
    return (
        <Stack gap="md">
            <Group justify="space-between" align="flex-start">
                <Title order={2}>
                    {title}
                </Title>
                <Group align="flex-end">
                    {children}
                </Group>
            </Group>
            <Text c="dimmed" size="sm">
                {description}
            </Text>
        </Stack>
    )
}