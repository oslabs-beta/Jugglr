import {MantineProvider, Center, Text, Button, Paper, AppShell, Navbar,Header, Footer, useMantineTheme} from '@mantine/core'
import { useState } from "react";
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
// import Home from './Home'
import Create from './Create'
import Run from './Run'

// import { useSelector, useDispatch } from "react-redux";

const AppShellTest = () => {
    
   
      const theme1 = useMantineTheme();
      
    
    return(
        <div>
        <HashRouter>
        <MantineProvider theme={{ fontFamily: 'Trebuchet MS' }}   >
        <AppShell
        // header={
        //   <Header height={70} ><Center><h1>Jugglr</h1> </Center></Header>
        //     }
        // footer ={ 
        //   <Footer height = {25}> </Footer>
        // }
        navbar={<Navbar width={{ base: 200 }} p='xs' height={900} style={{ background: theme1.fn.linearGradient(45, theme1.colors.dark[1], theme1.colors.dark[7]) }}       
        > 
        <div className = 'Navbar' style={{display:'flex',gap:'75%',flexDirection:'column', marginLeft: '7%', marginTop:'15%'}}>
            {/* <Navbar.Section><Text  style= {{color: 'white'}} component={Link} variant="link" to="/home"> Home </Text></Navbar.Section> */}
            <Navbar.Section ><Text style= {{color: 'white'}}component={Link} variant="link" to="/"> Create Docker Image</Text></Navbar.Section>
            <Navbar.Section > <Text style= {{color: 'white'}}component={Link} variant="link" to="/run"> Run Docker Container</Text></Navbar.Section>
        </div>
       
         </Navbar>
  
        
         
         }
     
       style={{background: theme1.fn.linearGradient(125,theme1.colors.gray[0],theme1.colors.gray[6])}}
    //    style={{background: theme1.colors.gray[2]}}
        
       >
        
        
            
        <Routes>
        {/* <Route path='/home' element={<Home/>}/> */}
        <Route path = "/" element={<Create/>}/>
        <Route path="/run" element={<Run/>}/>
        </Routes>
        </AppShell>
        </MantineProvider>
        </HashRouter>
        
        </div>

    )
 }


export default AppShellTest