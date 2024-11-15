import { TextInput } from "@mantine/core";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";

const actions: SpotlightActionData[] = [
  { id: '1', label: 'Action 1', onClick: () => alert('Action 1') },
  { id: '2', label: 'Action 2', onClick: () => alert('Action 2') },
  { id: '3', label: 'Action 3', onClick: () => alert('Action 3') },
];

export default function SearchAction() {
  return (
    <>
      <TextInput placeholder="Search" leftSection={<IconSearch size={16} />} onClick={spotlight.open} size="xs" inputSize="xs" radius="sm" />
      <Spotlight
        actions={actions}
        highlightQuery
        nothingFound="Nothing found..."
        searchProps={{
          leftSection: <IconSearch size={16} />,
          placeholder: 'Search',
        }}

      />

    </>
  );
}
