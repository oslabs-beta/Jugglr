import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import AppShellTest from './components/Appshell';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
   
      <AppShellTest />
    

  </Provider>
);
