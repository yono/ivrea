import React from 'react';
import { render } from 'react-dom';
import Grid from 'material-ui/Grid';
import Main from './components/main'
import { withStyles } from 'material-ui/styles';

const styles = {
  all: {
    height: '100%',
    minHeight: '100%',
  }
};

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
