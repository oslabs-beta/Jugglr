/**
 * @jest-environment jsdom
 */
import React from "React";
import { Provider } from "react-redux";
import UserEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import ProjectConfig from "../src/client/components/ProjectConfig";

describe("Unit tests for ProjectConfig component", () => {
  let component;

  beforeAll(() => {
    component = render(<ProjectConfig />);
  });

  it("displays title: 'Project Configuration'", () => {
    const title = component.getByText("Project Configuration");
    console.log(title);
  });
});
