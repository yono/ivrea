import React from 'react';
import { render } from 'react-dom';
import Grid from 'material-ui/Grid';
import Header from './components/header'
import Main from './components/main'

function App() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Header/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Main/>
        </Grid>
      </Grid>
    </div>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));
