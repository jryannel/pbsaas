import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeAction() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon title="toggle theme" onClick={toggleColorScheme}>
      {computedColorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
    </ActionIcon>
  );
}
