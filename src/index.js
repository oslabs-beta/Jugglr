import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
)