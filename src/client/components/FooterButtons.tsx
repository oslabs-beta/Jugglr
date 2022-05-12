import PropTypes from "prop-types";
import { Button } from "@mantine/core";

import { navButtonTheme } from "../themes/themeFunctions";


const FooterButtons = ({ navigate }) => {

  return (
    <>
      <Button
        onClick={() => navigate(0)}
        sx={theme => navButtonTheme(theme)}
      >
        prev
      </Button>

      <Button
        onClick={() => navigate(1)}
        sx={theme => navButtonTheme(theme)}
      >
        next
      </Button>
    </>
  );
};

FooterButtons.propTypes = {
  navigate: PropTypes.func
};

export default FooterButtons;
