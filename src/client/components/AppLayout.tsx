import { useState } from "react";
import { AppShell, Navbar, Header, Text, useMantineTheme } from "@mantine/core";
import NavSteps from "./NavSteps";
import PageBanner from "./PageBanner";

const AppLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1]
        }
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 400 }}
        >
          <NavSteps />
        </Navbar>
      }
      header={
        <Header height={70} p="lg">
          <PageBanner opened={opened} setOpened={setOpened} />
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default AppLayout;
