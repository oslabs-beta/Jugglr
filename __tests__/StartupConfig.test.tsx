/**
 * @jest-environment jsdom
 */
 import React from "React";
 import { Provider } from "react-redux";
 import { render, screen, waitFor } from "@testing-library/react";
 import {store} from "../src/client/store" 
 import StartupConfig from "../src/client/components/StartupConfig";
 import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";
//  import {ipcMain, ipcRenderer} from "./electron-mock"
//  import "../src/preload"
//  const { contextBridge } = require("electron");


 
 describe("Unit tests for StartupConfig component", () => {
   let component;
  //  const {dropDownImage, port} = useAppSelector(state => state.envConfig)

   beforeEach(() => {
    component = render(
    <Provider store={store}>
    <StartupConfig />
    </Provider>
    );
  });
 
   xit("Start up screen renders properly with two headers: 'Image Configuration', 'Create New Image', and 'Container Configuration'", async () => {
    const headings = await screen.findAllByRole('heading')
    expect(headings.length).toBe(2)
    expect(headings[0]).toHaveTextContent("Image Configuration");
    expect(headings[1]).toHaveTextContent("Container Configuration")
    expect(headings[2]).toBe(undefined)
   })
   
  xit("renders two buttons with the texts 'Create New Image' and 'Run New Container'", async ()=>{
      const buttons = await screen.findAllByRole('button')
      expect(buttons.length).toBe(2)
      expect(buttons[0]).toHaveTextContent('Create New Image')
      expect(buttons[1]).toHaveTextContent('Run New Container')
      expect(buttons[2]).toBe(undefined)
   })

   it("defauls port value to 5432", ()=>{
    const portNum = screen.getByText("Port")
    expect(portNum.nextSibling.firstChild).toHaveDisplayValue('5432')
    

   })
   
   xit("updates local state when new image is created",()=>{
    // userEvent.type(screen.getByRole)
   })
  
 })

 ;
 