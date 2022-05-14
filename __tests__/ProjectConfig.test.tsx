/**
 * @jest-environment jsdom
 */
import React from "React";
import { Provider } from "react-redux";
import UserEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import {store} from "../src/client/store"

import ProjectConfig from "../src/client/components/ProjectConfig";

describe("Unit tests for ProjectConfig component", () => {
  let component;
  
  beforeAll(() => {
    component = render(
    <Provider store={store}>
    <ProjectConfig />
    </Provider>
    );
  });

  it("displays title: 'Project Configuration'", () => {
    const title = component.getByText("Project Configuration");

    // expect(title).toBe("Project Configuration")
    
  });
});
