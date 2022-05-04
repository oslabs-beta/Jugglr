/**
 * Stateful component uses Mantine AppShell
 * AppShell takes props header, navbar, footer, aside for ease of layout
 * ref: https://mantine.dev/core/app-shell/
 */
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import {
  AppShell,
  Navbar,
  Header,
  Container,
  useMantineTheme
} from "@mantine/core";

import DockerConfig from "./DockerConfig";
import DarkModeButton from "./DarkModeButton";
import StartupConfig from "./StartupConfig";
import NavbarButtons from "./NavbarButtons";
import BurgerIcon from "../containers/BurgerIcon";
import ProjectConfig from "./ProjectConfig";
import ContainerConfig from "./RunConfig"
import LoadDataConfig from "./LoadDataConfig"


const AppLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isSmallView = useMediaQuery("(min-width: 993px");
  const navigate = useNavigate();
  const endpoints = { 0: "/", 1: "/docker", 2: "/startup" ,3:"/run", 4:"/loadData" };

  /**
   * function created to give NavBarButtons pseudo-ordering
   * using the above endpoints record for controlling browser's URL
   * @param index
   * @returns void
   */
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
              width: "100%",
              paddingLeft: "10px"
            }}
          >
            <BurgerIcon
              opened={opened}
              color={theme.colors.gray[6]}
              isSmallView={isSmallView}
              setOpened={setOpened}
            />

            <div style={{ marginLeft: "auto", marginRight: "50px" }}>
              <DarkModeButton />
            </div>
          </div>
        </Header>
      }
    >
      <Container>
        <Routes>
          <Route path="/" element={<ProjectConfig />} />
          <Route path="/docker" element={<DockerConfig />} />
          <Route path="/startup" element={<StartupConfig />} />
          <Route path="/run" element={<ContainerConfig/>}/>
          <Route path="/loadData" element={<LoadDataConfig/>}/>
        </Routes>
      </Container>
    </AppShell>
  );
};

export default AppLayout;
