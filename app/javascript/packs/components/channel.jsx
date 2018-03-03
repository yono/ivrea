import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  all: {
    height: '85%',
    minHeight: '85%',
  },
  allScroll: {
    height: '85%',
    minHeight: '85%',
    overflow: 'auto',
  }
});

class Channel extends React.Component {

  render() {
    const talks = this.props.talks.map(function (talk) {
        return (
          <ListItem key={talk.id} value={talk.id}>
            <Card>
              <CardContent>
                <Typography>{talk.user_name + ' ' + talk.created_at}</Typography>
                <Typography className={styles.title}>
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
        <List className={this.props.classes.allScroll}>
          {talks}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Channel);
