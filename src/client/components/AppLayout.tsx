/**
 * Stateful component uses Mantine AppShell
 * AppShell takes props header, navbar, footer, aside for ease of layout
 * ref: https://mantine.dev/core/app-shell/
 */
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMediaQuery, usePagination } from "@mantine/hooks";
import {
  AppShell,
  Navbar,
  Header,
  Container,
  useMantineTheme,
  Title,
  Image,
  Paper,
  Footer,
  Button
} from "@mantine/core";
import { Help } from 'tabler-icons-react'
import DarkModeButton from "./DarkModeButton";
import StartupConfig from "./StartupConfig";
import NavbarButtons from "./NavbarButtons";
import BurgerIcon from "../containers/BurgerIcon";
import ProjectConfig from "./ProjectConfig";
import DatabaseConfig from "./DatabaseConfig";
import ContainerConfig from "./RunConfig";
import LoadDataConfig from "./LoadDataConfig";
import FooterButtons from "./FooterButtons";


const AppLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isSmallView = useMediaQuery("(min-width: 993px");
  const page = usePagination({ total: 5, initialPage: 1 });
  const navigate = useNavigate();
  const endpoints = {
    1: "/",
    2: "/database",
    3: "/startup",
    4: "/run",
    5: "/loadData"
  };

  useEffect(() => {
    navigate(endpoints[page.active]);
  }, [page.active]);

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
          <NavbarButtons navigate={page.setPage} />
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                marginLeft: 35,
                columnGap: 35
              }}
            >
              <Image
                src="src/client/assets/jugglr-logo.png"
                radius="lg"
                width={70}
              ></Image>
              <Paper>
                <Title
                  style={{
                    fontFamily: "Kollektif Regular, sans-serif",
                    fontSize: 45,
                    color: "#228be6"
                  }}
                >
                  Jugglr
                </Title>
              </Paper>
              
            </div>
            
            <div style={{ marginLeft: "auto", marginRight: "50px", display:"flex", gap: "20px"}}>
            <div>
             <a href="https://github.com/oslabs-beta/Jugglr/blob/dev/docs/Jugglr%20Documentation.md" target="_blank">
               <Help 
               size={26}
              strokeWidth={2}
              color={'#406abf'}> 
                <Button>
                </Button>
              </Help >
            </a>
            </div>
              <DarkModeButton />
            </div>
          </div>
        </Header>
      }
      footer={
        <Footer height={60}>
          <FooterButtons
            page={page.active}
            prev={page.previous}
            next={page.next}
          />
        </Footer>
      }
    >
      <Container>
        <Routes>
          <Route path="/" element={<ProjectConfig navigate={page.next} />} />
          <Route
            path="/database"
            element={<DatabaseConfig navigate={page.next} />}
          />
          <Route path="/startup" element={<StartupConfig />} />
          <Route path="/run" element={<ContainerConfig />} />
          <Route path="/loadData" element={<LoadDataConfig />} />
        </Routes>
      </Container>
    </AppShell>
  );
};

export default AppLayout;
