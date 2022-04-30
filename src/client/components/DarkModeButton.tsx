import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { MoonStars, Sun } from "tabler-icons-react";

const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const dark = colorScheme === "dark";
  
  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};

export default DarkModeButton;
