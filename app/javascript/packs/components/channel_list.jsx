import React from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = {
  channelHeader: {
    fontSize: 14,
    color: '#fff',
  },
  selectedChannel: {
    color: '#fff',
    backgroundColor: '#4c9689',
  },
  channel: {
    color: '#fff',
  },
  all: {
    height: '100%',
    minHeight: '100%',
  },
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectedChannelId = this.props.selectedChannelId
    const channelItems = this.props.channels.map(function (channel) {
        if (channel.id === selectedChannelId) {
          return (
            <ListItem key={channel.id} value={channel.id} className={this.props.classes.selectedChannel} onClick={() => this.props.handleClickChannel(channel.id, channel.name)}>
              <ListItemText disableTypography={true} primary={"# " + channel.name}/>
            </ListItem>
          )
        } else {
          return (
            <ListItem button key={channel.id} value={channel.id} className={this.props.classes.channel} onClick={() => this.props.handleClickChannel(channel.id, channel.name)}>
              <ListItemText disableTypography={true} primary={"# " + channel.name}/>
            </ListItem>
          )
        }
      }.bind(this)
    )

    return (
      <div className={this.props.classes.all}>
        <List className={this.props.classes.all}
          subheader={<ListSubheader component="div" className={this.props.classes.channelHeader}>Channels</ListSubheader>}
        >
          {channelItems}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(ChannelList)
