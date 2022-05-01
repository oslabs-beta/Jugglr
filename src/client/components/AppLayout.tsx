import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Burger,
  Container,
  Tabs,
  MediaQuery,
  useMantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon
} from "@mantine/core";

import DockerConfig from "./DockerConfig";
import DatabaseConfig from "./DatabaseConfig";
import DarkModeButton from "./DarkModeButton";
import StartupConfig from "./StartupConfig";
import { BrandDocker } from "tabler-icons-react";

const AppLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const endpoints = { 0: "/", 1: "/database", 2: "/startup" };

  const urlChange = (index: number) => {
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
        <Navbar
          p="md"
          hiddenBreakpoint="xl"
          hidden={!opened}
          width={{ sm: 0, lg: 0 }}
        >
          {/**
           * Move this its own component
           */}
          <UnstyledButton
            sx={theme => ({
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0]
              }
            })}
          >
            <Group>
              <ThemeIcon color="white" variant="light">
                <BrandDocker />
              </ThemeIcon>
              <Text size="lg">Docker</Text>
            </Group>
          </UnstyledButton>
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

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <div style={{ width: "50%" }}>
                <Tabs
                  grow
                  variant="pills"
                  onTabChange={(tabIndex: number) => urlChange(tabIndex)}
                >
                  <Tabs.Tab label="Docker" />
                  <Tabs.Tab label="Database" />
                  <Tabs.Tab label="Startup" />
                </Tabs>
              </div>
            </MediaQuery>

            <DarkModeButton />
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
