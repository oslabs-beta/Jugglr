/**
 * Switch to hamburger shelf on small view size < 993px
 */
import PropTypes from "prop-types";
import { Burger } from "@mantine/core";

const BurgerIcon = ({ opened, setOpened, color, isSmallView }) => {
  return (
    <Burger
      hidden={isSmallView}
      opened={opened}
      onClick={() => setOpened((o: boolean) => !o)}
      size="sm"
      color={color}
      mr="xl"
    />
  );
};

BurgerIcon.propTypes = {
  opened: PropTypes.bool,
  color: PropTypes.string,
  isSmallView: PropTypes.bool,
  setOpened: PropTypes.func
};

export default BurgerIcon;
