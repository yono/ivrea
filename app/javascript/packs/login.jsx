import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

function Login() {
  const token = document.querySelector('meta[name=csrf-token]').getAttribute('content')
  return (
    <div>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper style={{padding: '20px', marginTop: '40px'}}>
          <Typography>
            Login
          </Typography>
          <form action='/sessions' method='post' style={{margin: 'auto'}}>
            <TextField
              id='session_email'
              name='session[email]'
              placeholder='Email'
            />
            <TextField
              type='password'
              id='session_password'
              name='session[password]'
              placeholder='Password'
            />
            <input type='hidden' name='authenticity_token' value={token} />
            <Button variant='raised' color='primary' type='submit'>
              Start
            </Button>
          </form>
          </Paper>
          <p><a href="/registrations/new">ユーザー登録</a></p>
          <p><a href="/password_resets/new">パスワードを忘れた場合</a></p>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

let e = document.createElement('div')
e.className = 'root'
render(<Login />, document.body.appendChild(e));
