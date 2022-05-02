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
  selectProjectRootDirectory,
  selectSchemaFile,
  createDockerFile
} from "../utility/fileExplorer";

const DockerConfig = () => {
  const form = useForm({
    initialValues: {
      project: "",
      schema: "",
      imageName: "",
      databaseName: "",
      databaseUser: "",
      databasePass: "",
      databasePort: 5432
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

      {/**
       * onSubmit function is incomplete
       */}
      <form
        onSubmit={form.onSubmit(values =>
          createDockerFile(values.project, values)
        )}
      >
        <TextInput
          required
          label="Project Root"
          placeholder="Project folder path"
          {...form.getInputProps("project")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("project")}
              setPath={selectProjectRootDirectory}
            />
          }
        />
        <Space h="sm" />

        <TextInput
          required
          label="Schema File"
          placeholder="Schema file path"
          {...form.getInputProps("schema")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("schema")}
              setPath={selectSchemaFile}
            />
          }
        />
        <Space h="sm" />

        <TextInput
          required
          label="Database Name"
          placeholder="Specify name of database"
          {...form.getInputProps("databaseName")}
        />
        <Space h="sm" />

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Database Username"
              placeholder="Username"
              {...form.getInputProps("databaseUser")}
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
              {...form.getInputProps("databasePass")}
            />
          </Grid.Col>
        </Grid>
        <Space h="sm" />

        <TextInput
          required
          label="Image Name"
          placeholder="Docker image name"
          {...form.getInputProps("imageName")}
        />
        <Space h="sm" />

        <div style={{ width: "25%" }}>
          <NumberInput
            required
            hideControls
            label="Port"
            min={1}
            max={9999}
            placeholder="Database port"
            {...form.getInputProps("databasePort")}
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
