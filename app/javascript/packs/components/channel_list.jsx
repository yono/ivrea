import React from 'react';
import PropTypes from 'prop-types';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  channelHeader: {
    fontSize: 16,
    color: '#fff',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  selectedChannel: {
    color: '#fff',
    backgroundColor: '#FF5917',
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
    backgroundColor: '#2D2D2D',
    color: '#fff',
    boxShadow: 'none',
    verticalAlign: 'middle',
    '&:active': {
      boxShadow: 'none',
    },
    '&hover': {
      backgroundColor: '#2D2D2D',
      color: '#cac4c9',
    }
  }
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openCreateDialog: false,
      openDeleteDialog: false,
      willDeleteChannelId: 0,
      willDeleteChannelName: ""
    }
  }

  handleClickOpenCreateDialog() {
    this.setState({ openCreateDialog: true })
  }

  handleClickCloseCreateDialog() {
    this.setState({ openCreateDialog: false })
  }

  handleClickOpenDeleteDialog(e, channelId, channelName) {
    this.setState({ openDeleteDialog: true, willDeleteChannelId: channelId, willDeleteChannelName: channelName })
  }

  handleClickCloseDeleteDialog() {
    this.setState({ openDeleteDialog: false, willDeleteChannelId: 0, willDeleteChannelName: "" })
  }

  handleCreateChannel() {
    name = document.querySelector("#channelName").value
    this.props.handleCreateChannel(name)
    this.handleClickCloseCreateDialog()
  }

  handleDeleteChannel(e) {
    const channelId = this.state.willDeleteChannelId;
    this.props.handleDeleteChannel(channelId);
    this.handleClickCloseDeleteDialog();
  }

  render() {
    const selectedChannelId = this.props.selectedChannelId
    const channelItems = this.props.channels.map(function (channel) {
        if (channel.id === selectedChannelId) {
          return (
            <ListItem key={channel.id} value={channel.id} className={this.props.classes.selectedChannel} onClick={() => this.props.handleClickChannel(channel.id, channel.name)}>
              <ListItemText disableTypography={true} primary={"# " + channel.name}/>
              <Icon onClick={(e) => this.handleClickOpenDeleteDialog(e, channel.id, channel.name)}>clear</Icon>
            </ListItem>
          )
        } else {
          return (
            <ListItem button key={channel.id} value={channel.id} className={this.props.classes.channel} onClick={() => this.props.handleClickChannel(channel.id, channel.name)}>
              <ListItemText disableTypography={true} primary={"# " + channel.name}/>
              <Icon onClick={(e) => this.handleClickOpenDeleteDialog(e, channel.id, channel.name)}>clear</Icon>
            </ListItem>
          )
        }
      }.bind(this)
    )

    return (
      <div className={this.props.classes.all}>
      <Dialog
        open={this.state.openCreateDialog}
        onClose={(e) => this.handleClickCloseCreateDialog(e)}
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
          <Button onClick={(e) => this.handleClickCloseCreateDialog(e)} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => this.handleCreateChannel(e)} color="primary">
            Create Channel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.openDeleteDialog}
        onClose={(e) => this.handleClickCloseDeleteDialog(e)}
        aria-labelledby="form-dialog-delete-title"
        >
        <DialogTitle id="form-dialog-delete-title">Delete a channel</DialogTitle>
        <DialogContent>
          チャンネルを削除すると発言もすべて削除されます。
          {this.state.willDeleteChannelName}を削除してよろしいですか？
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => this.handleClickCloseDeleteDialog(e)} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => this.handleDeleteChannel(e)} color="primary">
            Delete Channel
          </Button>
        </DialogActions>
      </Dialog>
        <List className={this.props.classes.all}
          subheader={<ListSubheader component="div">
          <Typography className={this.props.classes.channelHeader} >Channels
          <Icon
            className={this.props.classes.addChannel}
            onClick={(e) => this.handleClickOpenCreateDialog(e, this.state.willDeleteChannelId)}>add_circle</Icon>
          </Typography>
          </ListSubheader>}
        >
          {channelItems}
        </List>
      </div>
    )
  }
}

ChannelList.propTypes = {
  channels: PropTypes.array,
  selectedChannelId: PropTypes.number,
  handleClickChannel: PropTypes.func,
  handleCreateChannel: PropTypes.func,
  handleDeleteChannel: PropTypes.func,
}

export default withStyles(styles)(ChannelList)
