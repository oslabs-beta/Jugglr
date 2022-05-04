/**
 * Application uses Mantine form hook as part of application state flow.
 * useState is used under the hood, and values can be retrieved.
 * ref: https://mantine.dev/form/use-form/
 */
import {
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  Space,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

import { setEnvConfig } from "../reducers/envConfigSlice";
import { setDockerFile } from "../utility/fileExplorer";
import { useAppDispatch, useAppSelector } from "../utility/hooks.types";

const DockerConfig = () => {
  const reduxSelector  = useAppSelector(state => state.envConfig);
  const dispatch = useAppDispatch();
  /**
   * shape does match DockerFile type
   * remove rootDir, modify DockerFile type
   * ProjectConfig is setting rootDir
   */
  const form = useForm({
    initialValues: {
      from: reduxSelector.from,
      host: reduxSelector.host,
      port: reduxSelector.port
    }
  });

  /**
   * unfinished, potentially call buildImage
   * @param {object} values
   * @returns {void}
   */
  const setStateAndCall = async values => {
    dispatch(setEnvConfig(values));
    console.log(reduxSelector);
    await setDockerFile(reduxSelector);
    
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Docker Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <form onSubmit={form.onSubmit(values => setStateAndCall(values))}>
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
