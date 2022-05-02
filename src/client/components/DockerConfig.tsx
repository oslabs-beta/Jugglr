/**
 * Application uses Mantine form hook as part of application state flow.
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

import FileSearchButton from "../containers/FileSearchButton";
import { selectProjectRootDirectory } from "../utility/fileExplorer";
import { useAppSelector } from "../utility/hooks.types";

const DockerConfig = () => {
  const { rootDir, schema, image } = useAppSelector(state => state.envConfig);
  const form = useForm({
    initialValues: {
      project: rootDir,
      schema: schema,
      imageName: image
    }
  });

  const setFieldType = (field: any) => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={50}>
          Docker Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <TextInput
          required
          disabled
          label="Project"
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
          disabled
          label="Schema"
          placeholder="Schema file path"
          {...form.getInputProps("schema")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("schema")}
              setPath={selectProjectRootDirectory}
            />
          }
        />
        <Space h="sm" />

        <TextInput
          required
          label="Image Name"
          placeholder="Docker image name"
          {...form.getInputProps("imageName")}
        />
        <Space h="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DockerConfig;
