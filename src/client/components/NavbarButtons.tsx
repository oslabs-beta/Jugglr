import PropTypes from "prop-types";
import { UnstyledButton, Text, Group, ThemeIcon } from "@mantine/core";
import { BrandDocker, CloudStorm, Database } from "tabler-icons-react";

const NavbarButtons = ({ navigate }) => {
  const buttonStyles = theme => {
    return {
      display: "block",
      width: "100%",
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
      }
    };
  };

  return (
    <>
      <UnstyledButton
        onClick={() => navigate(0)}
        sx={theme => buttonStyles(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <BrandDocker />
          </ThemeIcon>
          <Text size="md">Docker</Text>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => navigate(1)}
        sx={theme => buttonStyles(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <Database />
          </ThemeIcon>
          <Text size="md">Database</Text>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => navigate(2)}
        sx={theme => buttonStyles(theme)}
      >
        <Group>
          <ThemeIcon variant="light" style={{ background: "none" }}>
            <CloudStorm />
          </ThemeIcon>
          <Text size="md">Startup</Text>
        </Group>
      </UnstyledButton>
    </>
  );
};

NavbarButtons.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default NavbarButtons;
