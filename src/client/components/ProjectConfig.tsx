/**
 * Application uses Mantine form hook as part of application state flow.
 * useState is used under the hood, and values can be retrieved.
 * ref: https://mantine.dev/form/use-form/
 */
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Group,
  Paper,
  Space,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

import { EnvConfig } from "../../types";
import FileSearchButton from "../containers/FileSearchButton";
import { setEnvConfig } from "../reducers/envConfigSlice";
import {
  selectProjectRootDirectory,
  setProjectDirectory
} from "../utility/fileExplorer";
import { useAppDispatch, useAppSelector } from "../utility/hooks.types";
import { isEmptyObject } from "../utility/validations";


const ProjectConfig = ({ navigate }) => {
  const { rootDir } = useAppSelector(state => state.envConfig);
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      rootDir: rootDir
    }
  });

  /**
   * Closure for passing setFieldValue hook
   * Child components are designated specific fields
   * where they can modify useForm state
   * @param {string} field
   * @returns {Function -> void}
   */
  const setFieldType = (field: any) => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  };

  /**
   * update Redux state and call backend with given directory
   * then go to database configuration page
   * @todo decouple page change away from component
   * @param {EnvConfig} values
   * @returns {void}
   */
  const setStateAndCall = async (values: EnvConfig): Promise<void> => {
    const response = await setProjectDirectory(values);
    const newState = { ...values, ...response };
    dispatch(setEnvConfig(newState));
    if (!isEmptyObject(response)) {
      showNotification({
        title: "DockerFile found!",
        message: "Database details were preset!"
      });
    }
    navigate(1);
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Project Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form onSubmit={form.onSubmit(values => setStateAndCall(values))}>
        <TextInput
          required
          label="Project's Root Directory"
          placeholder="Project folder path"
          {...form.getInputProps("rootDir")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("rootDir")}
              setPath={selectProjectRootDirectory}
            />
          }
        />
        <Space h="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

ProjectConfig.propTypes = {
  navigate: PropTypes.func
};

export default ProjectConfig;
