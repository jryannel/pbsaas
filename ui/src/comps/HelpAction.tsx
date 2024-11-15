import { ActionIcon } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";


export default function HelpAction() {
  return (
    <ActionIcon component={Link} to="https://github.com/jryannel/pbsass">
      <IconHelp size={16} />
    </ActionIcon>
  );
}
