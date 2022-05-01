import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { MoonOff, MoonStars } from "tabler-icons-react";

const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "orange" : "gray"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <MoonOff size={20} /> : <MoonStars size={20} />}
    </ActionIcon>
  );
};

export default DarkModeButton;
