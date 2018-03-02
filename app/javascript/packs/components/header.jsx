import React from 'react';
import { render } from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

function Header() {
  return (
    <header style={{paddingBottom: '100px'}}>
      <AppBar>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Like a Slack
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
