import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import { FileSearch } from "tabler-icons-react";

const FileSearchButton = ({ setField,  setPath}) => {

  return (
    <Button
      variant="outline"
      size="sm"
      mr={25}
      style={{ borderRadius: "0 5px 5px 0" }}
      onClick={ async () => {
        const response: any = await setPath();
        setField(response);
      }}
    >
      <FileSearch />
    </Button>
  );
}

FileSearchButton.propTypes = {
  setField: PropTypes.func,
  setPath: PropTypes.func
}

export default FileSearchButton;