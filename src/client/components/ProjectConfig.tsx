/**
 * Application uses Mantine form hook as part of application state flow.
 * useState is used under the hood, and values can be retrieved.
 * ref: https://mantine.dev/form/use-form/
 */
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
import { EnvConfig } from "../../types";

import FileSearchButton from "../containers/FileSearchButton";
import { setEnvConfig } from "../reducers/envConfigSlice";
import {
  selectProjectRootDirectory,
  setProjectRoot
} from "../utility/fileExplorer";
import { useAppDispatch, useAppSelector } from "../utility/hooks.types";

const ProjectConfig = () => {
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

  const setStateAndCall = (values: EnvConfig) => {
    dispatch(setEnvConfig(values));
    setProjectRoot(values);
  }

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Project Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form
        onSubmit={form.onSubmit(values => setStateAndCall(values))}
      >
        <TextInput
          required
          label="Project Root"
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

export default ProjectConfig;
