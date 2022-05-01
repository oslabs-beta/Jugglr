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

const DockerConfig = () => {
  const form = useForm({
    initialValues: {
      project: "",
      schema: "",
      imageName: ""
    }
  });

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
          {...form.getInputProps("project")}
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
