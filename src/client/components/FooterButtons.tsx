import PropTypes from "prop-types";
import { Button } from "@mantine/core";


const FooterButtons = ({ page, prev, next }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ flexGrow: 1 }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          justifyItems: "center",
          flexGrow: 2,
          paddingTop: 12
        }}
      >
        <Button
          size="sm"
          onClick={() => prev()}
          variant={page == 1 ? "white" : "light"}
        >
          prev
        </Button>

        <Button
          size="sm"
          onClick={() => next()}
          variant={page == 5 ? "white" : "light"}
        >
          next
        </Button>
      </div>
    </div>
  );
};

FooterButtons.propTypes = {
  page: PropTypes.number,
  prev: PropTypes.func,
  next: PropTypes.func
};

export default FooterButtons;
