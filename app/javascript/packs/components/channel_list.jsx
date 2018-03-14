import React from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
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
  addChannel: {
    float: 'right',
    backgroundColor: '#4d394b',
    color: '#fff',
    borderColor: '#fff',
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none',
    },
    '&hover': {
      backgroundColor: '#4d394b',
      color: '#cac4c9',
    }
  }
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClickOpen() {
    this.setState({ open: true })
  }

  handleClickClose() {
    this.setState({ open: false })
  }

  handleCreateChannel() {
    name = document.querySelector("#channelName").value
    this.props.handleCreateChannel(name)
    this.handleClickClose()
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
      <Dialog
        open={this.state.open}
        onClose={(e) => this.handleClickClose(e)}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Create a channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="channelName"
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => this.handleClickClose(e)} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => this.handleCreateChannel(e)} color="primary">
            Create Channel
          </Button>
        </DialogActions>
      </Dialog>
        <List className={this.props.classes.all}
          subheader={<ListSubheader component="div" className={this.props.classes.channelHeader}>
          Channels
          <Button
            variant="fab"
            className={this.props.classes.addChannel}
            onClick={(e) => this.handleClickOpen(e)}
            aria-label="add">+</Button>
          </ListSubheader>}
        >
          {channelItems}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(ChannelList)
