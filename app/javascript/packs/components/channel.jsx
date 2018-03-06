import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
    height: '95%',
    minHeight: '95%',
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
  }
});

class Channel extends React.Component {

  componentDidUpdate() {
    document.getElementById('note-' + this.props.talks[this.props.talks.length - 1].id).scrollIntoView()
  }

  render() {
    const talks = this.props.talks.map(function (talk) {
        return (
          <ListItem className={this.props.classes.channelListItem} id={'note-' + talk.id} key={talk.id} value={talk.id}>
            <Card className={this.props.classes.channelCard}>
              <CardContent className={this.props.classes.channelCardContent}>
                <Typography className={this.props.classes.user}>{talk.user_name + ' ' + talk.created_at}</Typography>
                <Typography>
                  {talk.note}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        )
      }.bind(this)
    )

    return (
      <div className={this.props.classes.allScroll}>
        <List className={this.props.classes.scroll}>
          {talks}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Channel);
