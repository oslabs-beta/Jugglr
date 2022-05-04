import PropTypes from "prop-types";
import { UnstyledButton, Text, Group, ThemeIcon } from "@mantine/core";
import { BrandDocker, CloudStorm } from "tabler-icons-react";

import { navButtonTheme } from "../themes/themeFunctions";

const NavbarButtons = ({ navigate }) => {

  return (
    <>
      <UnstyledButton
        onClick={() => navigate(0)}
        sx={theme => navButtonTheme(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <BrandDocker />
          </ThemeIcon>
          <Text size="md">Project</Text>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => navigate(1)}
        sx={theme => navButtonTheme(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <BrandDocker />
          </ThemeIcon>
          <Text size="md">Docker</Text>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => navigate(2)}
        sx={theme => navButtonTheme(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <CloudStorm />
          </ThemeIcon>
          <Text size="md">Startup</Text>
        </Group>
      </UnstyledButton>


      <UnstyledButton
        onClick={() => navigate(3)}
        sx={theme => navButtonTheme(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <BrandDocker />
          </ThemeIcon>
          <Text size="md">Docker Run</Text>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => navigate(4)}
        sx={theme => navButtonTheme(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
          <CloudStorm />
          </ThemeIcon>
          <Text size="md">Load Data</Text>
        </Group>
      </UnstyledButton>
    </>
  );
};

NavbarButtons.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default NavbarButtons;
