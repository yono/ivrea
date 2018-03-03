import React from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: 'primary'
  },
});

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
              <ListItemText primary={"# " + channel.name}/>
            </ListItem>
          )
        } else {
          return (
            <ListItem button key={channel.id} value={channel.id} onClick={() => this.props.handleClickChannel(channel.id)}>
              <ListItemText primary={"# " + channel.name}/>
            </ListItem>
          )
        }
      }.bind(this)
    )

    return (
      <div>
        <List
          subheader={<ListSubheader component="div" className={styles.title}>Channels</ListSubheader>}
        >
          {channelItems}
        </List>
      </div>
    )
  }
}

export default ChannelList
