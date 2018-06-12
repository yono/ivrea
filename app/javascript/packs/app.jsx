import React from 'react';
import { render } from 'react-dom';
import Main from './components/main'

function App() {
  return (
    <div style={{height: '100%', minHeight: '100%'}}>
      <Main/>
    </div>
  );
}

let e = document.createElement('div')
e.className = 'root'
render(<App />, document.body.appendChild(e));
