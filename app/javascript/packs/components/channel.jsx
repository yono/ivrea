import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';

class Channel extends React.Component {
  render() {
    const talks = this.props.talks.map(function (talk) {
        return (
          <ListItem key={talk.id} value={talk.id}>
            <ListItemText primary={talk.note}/>
          </ListItem>
        )
      }.bind(this)
    )

    return (
      <div>
        <List>
          {talks}
        </List>
      </div>
    )
  }
}

export default Channel
