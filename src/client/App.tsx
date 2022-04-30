import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./reducers/counterSlice";
import {Button, Paper, Text , MantineProvider, Center, Header, Navbar, AppShell, useMantineTheme} from '@mantine/core'
import AppShellTest  from './components/Appshell'

const App = () => {
  

  const theme = useMantineTheme();

  return (
    <div id="container">
    
        
        <AppShellTest/>
       
        
    </div>
  );
};

export default App;
