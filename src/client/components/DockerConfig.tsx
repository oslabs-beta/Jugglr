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
import { SetStateAction, useState } from "react";
import { FileSearch } from "tabler-icons-react";
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

  const rightSectionButton = (
    <Button
      variant="subtle"
      size="sm"
      mr={25}
      style={{ borderRadius: "0 5px 5px 0" }}
      onClick={ async () => {
        const response: any = await selectProjectRootDirectory();
        form.setFieldValue("project", response);
      }}
    >
      <FileSearch />
    </Button>
  );

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
          label="Project"
          placeholder="Project folder path"
          {...form.getInputProps("project")}
          rightSection={rightSectionButton}
        />
        <Space h="sm" />

        <TextInput
          required
          label="Schema"
          placeholder="Schema file path"
          {...form.getInputProps("schema")}
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
