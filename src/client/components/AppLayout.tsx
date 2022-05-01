import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Burger,
  Container,
  MediaQuery,
  useMantineTheme
} from "@mantine/core";

import DockerConfig from "./DockerConfig";
import DatabaseConfig from "./DatabaseConfig";
import DarkModeButton from "./DarkModeButton";
import StartupConfig from "./StartupConfig";
import NavbarButtons from "./NavbarButtons";

const AppLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const endpoints = { 0: "/", 1: "/database", 2: "/startup" };

  const urlNavigation = (index: number) => {
    return navigate(endpoints[index]);
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hidden={!opened} width={{ base: 300 }}>
          <NavbarButtons navigate={urlNavigation} />
        </Navbar>
      }
      header={
        <Header height={90} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <div style={{ marginLeft: "auto", marginRight: "50px" }}>
              <DarkModeButton />
            </div>
          </div>
        </Header>
      }
    >
      <Container>
        <Routes>
          <Route path="/" element={<DockerConfig />} />
          <Route path="/database" element={<DatabaseConfig />} />
          <Route path="/startup" element={<StartupConfig />} />
        </Routes>
      </Container>
    </AppShell>
  );
};

export default AppLayout;
