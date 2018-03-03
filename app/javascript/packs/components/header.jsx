import React from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class Header extends React.Component {
  constructor(props) {
    super(props)
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
  }

  handleLogout() {
    axios.delete('/sessions.json').then((response) => {
      window.location.reload()
    }).catch((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <header style={{paddingBottom: '56px'}}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Like a Slack
            </Typography>
            <Button color="inherit" onClick={() => this.handleLogout()}>Logout</Button>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

export default Header;
