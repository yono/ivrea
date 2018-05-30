import React from 'react';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  user: {
    fontSize: 14,
    paddingBottom: 4,
  },
  title: {
    marginTop: 16,
    fontSize: 14,
  },
  all: {
    height: '90%',
    minHeight: '90%',
  },
  allScroll: {
    height: '90%',
    minHeight: '90%',
    overflow: 'auto',
  },
  scroll: {
    height: '85%',
    minHeight: '85%',
    overflow: 'auto',
  },
  channelListItem: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  channelCard: {
    boxShadow: 'none',
  },
  channelCardContent: {
    paddingTop: '0px',
    paddingBottom: '0px',
    '&:lastChild': {
      paddingBottom: '0px',
    }
  },
  channelHeader: {
    marginTop: '20px',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingLeft: '30px',
    borderBottom: 'thin solid #ddd',
  },
  logout: {
    float: 'right',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    fontSize: '12px',
  }
});

class Channel extends React.Component {

  componentDidUpdate() {
    if (this.props.talks.length > 0) {
      document.getElementById('note-' + this.props.talks[this.props.talks.length - 1].id).scrollIntoView()
    }
  }

  render() {
    const selectedChannelName = this.props.selectedChannelName
    const talks = this.props.talks.map(function (talk) {
        return (
          <ListItem className={this.props.classes.channelListItem} id={'note-' + talk.id} key={talk.id} value={talk.id}>
            <Card className={this.props.classes.channelCard}>
              <CardContent className={this.props.classes.channelCardContent}>
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={this.props.userIconUrl}/>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={this.props.classes.user}>
                    {talk.user_name + ' ' + talk.created_at}
                    </Typography>
                    <Typography>
                      {talk.note}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ListItem>
        )
      }.bind(this)
    )

    return (
      <div className={this.props.classes.allScroll}>
        <Typography className={this.props.classes.channelHeader}>
          {'#' + selectedChannelName}
          <Button className={this.props.classes.logout} onClick={() => this.props.handleLogout()}>Logout</Button>
        </Typography>
        <List className={this.props.classes.scroll}>
          {talks}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Channel);
