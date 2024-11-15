import { ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export default function GithubAction() {
  return (
    <ActionIcon component={Link} to="https://github.com/jryannel/pbsaas">
      <IconBrandGithub size={16} />
    </ActionIcon>
  );
}
