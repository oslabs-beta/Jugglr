import {
  Box,
  Space,
  Paper,
  Title,
  TextInput,
  Grid,
  PasswordInput,
  Group,
  Button
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { EyeOff, EyeCheck } from "tabler-icons-react";

import FileSearchButton from "../containers/FileSearchButton";
import { setEnvConfig } from "../reducers/envConfigSlice";
import { selectFile, setDockerFile } from "../utility/fileExplorer";
import { useAppDispatch, useAppSelector } from "../utility/hooks.types";

const DatabaseConfig = () => {
  const reduxState = useAppSelector(
    state => state.envConfig
  );
  const dispatch = useAppDispatch();
  /**
   * shape does match DockerFile type
   * remove rootDir, modify DockerFile type
   * ProjectConfig is setting rootDir
   */
  const form = useForm({
    initialValues: {
      user: reduxState.user,
      database: reduxState.database,
      password: reduxState.password,
      schema: reduxState.schema
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
   * set Redux state and call electron to create DockerFile
   * at given location with provided details
   * @fix onSubmit app is rerendered
   * @todo use return value to render non-blocking notification
   * @param {object} values
   * @returns {boolean}
   */
   const setStateAndCall = async values => {
    dispatch(setEnvConfig(values));
    return await setDockerFile(reduxState);
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Database Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form onSubmit={form.onSubmit(values => setStateAndCall(values))}>
        <TextInput
          required
          label="Schema File"
          placeholder="Schema file path"
          {...form.getInputProps("schema")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("schema")}
              setPath={selectFile}
            />
          }
        />
        <Space h="sm" />

        <TextInput
          required
          label="Database Name"
          placeholder="Specify name of database"
          {...form.getInputProps("database")}
        />
        <Space h="sm" />

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Database Username"
              placeholder="Username"
              {...form.getInputProps("user")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <PasswordInput
              required
              label="Password"
              placeholder="Password"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
              }
              {...form.getInputProps("password")}
            />
          </Grid.Col>
        </Grid>
        <Space h="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Create DockerFile</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DatabaseConfig;
