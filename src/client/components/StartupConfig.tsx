import { Space, Box, Title, Paper, Button } from "@mantine/core";

const Startup = () => {
  return (
    <Box sx={{ maxWidth: "100%" }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={50}>
          Startup Configuration
        </Title>
      </Paper>
      <Space h={50} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "30vh"
        }}
      >
        <div style={{ width: "30%" }}>
          <Button
            fullWidth
          >
            Start
          </Button>
        </div>

        <div style={{ width: "30%" }}>
          <Button
            fullWidth
          >
            Stop
          </Button>
        </div>

        <div style={{ width: "30%" }}>
          <Button
            fullWidth
            variant="outline"
          >
            Remove
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Startup;
