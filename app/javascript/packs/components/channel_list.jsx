import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';

class ChannelList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectedChannelId = this.props.selectedChannelId
    const channelItems = this.props.channels.map(function (channel) {
        if (channel.id === selectedChannelId) {
          return (
            <ListItem key={channel.id} value={channel.id} onClick={() => this.props.handleClickChannel(channel.id)}>
              <ListItemIcon>
                <StarIcon/>
              </ListItemIcon>
              <ListItemText primary={channel.name}/>
            </ListItem>
          )
        } else {
          return (
            <ListItem key={channel.id} value={channel.id} onClick={() => this.props.handleClickChannel(channel.id)}>
              <ListItemText primary={channel.name}/>
            </ListItem>
          )
        }
      }.bind(this)
    )

    return (
      <div>
        <List>
          {channelItems}
        </List>
      </div>
    )
  }
}

export default ChannelList
