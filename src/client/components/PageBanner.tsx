import { Grid, MediaQuery, Burger, Text, useMantineTheme } from "@mantine/core";
import DarkModeButton from "./DarkModeButton";
import PropTypes from "prop-types";

const PageBanner = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  return (
    <Grid align="center">
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Grid.Col span={1}>
          <Burger
            opened={opened}
            onClick={() => setOpened(o => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </Grid.Col>
      </MediaQuery>

      <Grid.Col span={5} offset={1}>
        <Text>Application Header</Text>
      </Grid.Col>
      <Grid.Col span={1} offset={4}>
        <DarkModeButton />
      </Grid.Col>
    </Grid>
  );
};

PageBanner.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func
}

export default PageBanner;
