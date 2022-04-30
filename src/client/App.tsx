import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import AppLayout from "./components/AppLayout";

const App = () => {
  const [path, setPath] = useState("");
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const handleClick = async () => {
    const response = await selectorModule.openFile();
    console.log("Electron's Response:", response);
    setPath(response);
    console.log("New Path:", path);
  };

  return (
    <div id="container">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }}>
          <AppLayout />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
