import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { Code, BrandDocker, DatabaseImport } from "tabler-icons-react";

const NavSteps = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current));

  const isLoading = active == 3;

  return (
    <>
      <Stepper
        orientation="vertical"
        size="lg"
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
      >
        <Stepper.Step
          icon={<Code size={25} />}
          label="Project Location"
          description="Provide project details"
        >
          Step 1: Provide the project location
        </Stepper.Step>
        <Stepper.Step
          icon={<BrandDocker size={25} />}
          label="Docker configuration"
          description="Provide Docker details"
        >
          Step 2 content: Provide container details
        </Stepper.Step>
        <Stepper.Step
          icon={<DatabaseImport size={25} />}
          label="Pre-startup"
          description="Provide database details"
          loading={isLoading}
        >
          Step 3 content: Provide database schema
        </Stepper.Step>
        <Stepper.Completed>Initializing Docker container</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
};

export default NavSteps;
