/**
 * Application uses Mantine form hook as part of application state flow.
 * useState is used under the hood, and values can be retrieved.
 * ref: https://mantine.dev/form/use-form/
 */
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Paper,
  PasswordInput,
  Space,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { EyeOff, EyeCheck } from "tabler-icons-react";

import FileSearchButton from "../containers/FileSearchButton";
import {
  selectFile,
  setDockerFile
} from "../utility/fileExplorer";
import { useAppSelector } from "../utility/hooks.types";

const DockerConfig = () => {
  const { from, user, host, database, password, port, rootDir, schema } = useAppSelector(state => state.envConfig)
  /**
   * shape does match DockerFile type
   * remove rootDir, modify DockerFile type
   * ProjectConfig is setting rootDir
   */
  const form = useForm({
    initialValues: {
      from: "postgres:latest",
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgres",
      port: 5432,
      rootDir: rootDir,
      schema: ""
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

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Docker Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form
        onSubmit={form.onSubmit(values => console.log(setDockerFile(values)))}
      >

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

        <TextInput
          required
          label="Image Name"
          placeholder="Docker image name"
          {...form.getInputProps("from")}
        />
        <Space h="sm" />

        <div style={{ display: "flex", gap: "15px", width: "55%" }}>
          <NumberInput
            required
            hideControls
            label="Port"
            min={1}
            max={9999}
            placeholder="Database port"
            {...form.getInputProps("port")}
          />

          <TextInput
            required
            label="Host"
            placeholder="Host name"
            {...form.getInputProps("host")}
          />
        </div>
        <Space h="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DockerConfig;
