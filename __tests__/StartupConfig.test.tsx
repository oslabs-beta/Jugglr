/**
 * @jest-environment jsdom
 */
 import React from "React";
 import { Provider } from "react-redux";
 import UserEvent from "@testing-library/user-event";
 import { render, screen, waitFor } from "@testing-library/react";
 import {store} from "../src/client/store" 
 import StartupConfig from "../src/client/components/StartupConfig";
 import '@testing-library/jest-dom/extend-expect'
 import {ipcMain, ipcRenderer} from "./electron-mock"
//  import  "../src/preload"

 

 


 
 describe("Unit tests for StartupConfig component", () => {
   let component;
 
   beforeEach(() => {
    component = render(
    <Provider store={store}>
    <StartupConfig />
    </Provider>
    );
  });
 
   it("Start up screen renders properly with two headers: 'Image Configuration', 'Create New Image', and 'Container Configuration'", async () => {
    const headings = await component.findAllByRole('heading')
    expect(headings.length).toBe(2)
    expect(headings[0]).toHaveTextContent("Image Configuration");
    expect(headings[1]).toHaveTextContent("Container Configuration")
    expect(headings[2]).toBe(undefined)
   })
   
  it("renders two buttons with the texts 'Create New Image' and 'Run New Container'", async ()=>{
      const buttons = await component.findAllByRole('button')
      expect(buttons.length).toBe(2)
      expect(buttons[0]).toHaveTextContent('Create New Image')
      expect(buttons[1]).toHaveTextContent('Run New Container')
      expect(buttons[2]).toBe(undefined)
   })
 });
 