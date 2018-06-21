import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Menu, { MenuItem } from 'material-ui/Menu';
import Emoji from 'react-emoji-render';
import Message from './message';

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
    marginBottom: '6px'
  },
  channelCard: {
    boxShadow: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  channelCardContent: {
    paddingTop: '0px',
    paddingBottom: '0px',
    '&:lastChild': {
      paddingBottom: '0px',
    }
  },
  channelHeader: {
    marginTop: '26px',
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
  },
  profile: {
    float: 'right',
    fontSize: '12px',
  },
  accountIcon: {
    float: 'right',
    marginTop: '-16px',
    marginRight: '10px',
  },
  accountAvatar: {
    height: '32px',
    width: '32px',
  },
  deleteMessage: {
    '&:hover': {
      borderStyle: 'solid',
      borderColor: '#2d2d2d',
      borderWidth: '1px',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      cursor: 'pointer'
    }
  },
  createdAt: {
    marginLeft: '10px',
    color: '#bbb',
  }
});

class Channel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      willDeleteTalkId: 0,
      willDeleteMessage: "",
      anchorEl: null,
    }
  }

  componentDidUpdate() {
    if (this.props.talks.length > 0) {
      document.getElementById('note-' + this.props.talks[this.props.talks.length - 1].id).scrollIntoView()
    }
  }

  handleClickOpen(e, talk) {
    this.setState({
      open: true,
      willDeleteTalkId: talk.id,
      willDeleteMessage: talk.note,
    })
  }

  handleClickClose() {
    this.setState({
      open: false,
      willDeleteTalkId: 0,
      willDeleteMessage: ""
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  deleteTalk(e, talk_id) {
    this.props.handleDeleteTalk(e, talk_id)
    this.handleClickClose()
  }

  render() {
    const selectedChannelName = this.props.selectedChannelName
    const talks = this.props.talks.map(function (talk) {
        return (
          <Message
            talk={talk}
            handleClickOpen={(e, talk) => this.handleClickOpen(e, talk)}
            userId={this.props.userId}
            handleUpdateTalk={(e, talkId, message) => this.props.handleUpdateTalk(e, talkId, message)}
            key={talk.id}
          />
        )
      }.bind(this)
    )

    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);

    return (
      <div className={this.props.classes.allScroll}>
        <Typography className={this.props.classes.channelHeader}>
          {'#' + selectedChannelName}
          <IconButton
            className={this.props.classes.accountIcon}
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            <Avatar className={this.props.classes.accountAvatar} src={this.props.userIconUrl}/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem>Login as {this.props.userName}</MenuItem>
            <MenuItem><a href="/profiles">Profile</a></MenuItem>
            <MenuItem onClick={() => this.props.handleLogout()}>Logout</MenuItem>
          </Menu>
        </Typography>
        <List className={this.props.classes.scroll}>
          {talks}
        </List>
        <Dialog
          open={this.state.open}
          onClose={(e) => this.handleClickClose(e)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete message</DialogTitle>
          <DialogContent>
            「
            <Emoji text={this.state.willDeleteMessage}/>
            」
            <br/>
            この発言を削除します。よろしいですか？
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClickClose(e)} color="primary">Cancel</Button>
            <Button onClick={(e) => this.deleteTalk(e, this.state.willDeleteTalkId)}>Delete Message</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Channel.propTypes = {
  className: PropTypes.string,
  selectedChannelName: PropTypes.string,
  selectedChannelId: PropTypes.number,
  handleLogout: PropTypes.func,
  userId: PropTypes.number,
  userName: PropTypes.string,
  userIconUrl: PropTypes.string,
  handleDeleteTalk: PropTypes.func,
  handleUpdateTalk: PropTypes.func,
}

export default withStyles(styles)(Channel);
