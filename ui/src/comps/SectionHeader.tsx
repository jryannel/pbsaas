import { Group, Paper, Stack, Text, Title } from "@mantine/core";

type SectionHeaderProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function SectionHeader({ title, description, children }: SectionHeaderProps) {
  return (
    <Paper>
      <Stack gap={0}>
        <Group justify="space-between">
          <Title order={5}>{title}</Title>
          <Group justify="flex-end" gap={0}>
            {children}
          </Group>
        </Group>
        <Text c='dimmed' fz="xs">{description}</Text>
      </Stack >
    </Paper >
  );
}
