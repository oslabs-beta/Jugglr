import {
  Box,
  Button,
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

const DatabaseConfig = () => {
  const form = useForm({
    initialValues: {
      databaseName: "",
      databaseUser: "",
      databasePass: "",
      databasePort: 5432
    }
  });

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={50}>
          Database Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <TextInput
          required
          label="Name"
          placeholder="Database name"
          {...form.getInputProps("databaseName")}
        />
        <Space h="sm" />

        <TextInput
          required
          label="Username"
          placeholder="Database username"
          {...form.getInputProps("databaseUser")}
        />
        <Space h="sm" />

        <PasswordInput
          required
          label="Password"
          placeholder="Database password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
          }
          {...form.getInputProps("databasePass")}
        />
        <Space h="sm" />

        <NumberInput
          required
          label="Port"
          placeholder="Database port"
          {...form.getInputProps("databasePort")}
        />
        <Space h="sm" />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DatabaseConfig;