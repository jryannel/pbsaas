import { Button } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export default function NewProjectAction() {
  return (
    <Button leftSection={<IconCirclePlus size={16} />} component={Link} to="/projects/new">
      New Project
    </Button>
  );
}
