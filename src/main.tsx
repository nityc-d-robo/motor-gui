import React from 'react';
import ReactDOM from 'react-dom/client';
import PlaygroundPage from './App';

import './App.css';
import './blockly/custom_blocks';
import './blockly/custom_category';
import './blockly/blockly-workspace.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PlaygroundPage />
  </React.StrictMode>,
);
