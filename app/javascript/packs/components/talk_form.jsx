import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

class TalkForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectedChannelId = this.props.selectedChannelId
    const userName = this.props.userName
    return (
      <div>
        <form onSubmit={(e) => this.props.handleSendTalk(e, selectedChannelId, document.querySelector("#SendButton").value, userName)}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                fullWidth={true}
                id="SendButton"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="raised"
                color="primary"
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default TalkForm
