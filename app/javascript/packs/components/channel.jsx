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
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Emoji from 'react-emoji-render';

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
  },
  profile: {
    float: 'right',
    fontSize: '12px',
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
  }
});

class Channel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      willDeleteTalkId: 0,
      willDeleteMessage: "",
    }
  }

  componentDidUpdate() {
    if (this.props.talks.length > 0) {
      document.getElementById('note-' + this.props.talks[this.props.talks.length - 1].id).scrollIntoView()
    }
  }

  handleClickOpen(e, talkId, message) {
    this.setState({
      open: true,
      willDeleteTalkId: talkId,
      willDeleteMessage: message
    })
  }

  handleClickClose() {
    this.setState({
      open: false,
      willDeleteTalkId: 0,
      willDeleteMessage: ""
    })
  }

  deleteTalk(e, talk_id) {
    this.props.handleDeleteTalk(e, talk_id)
    this.handleClickClose()
  }

  render() {
    const selectedChannelName = this.props.selectedChannelName
    const talks = this.props.talks.map(function (talk) {
        return (
          <ListItem className={this.props.classes.channelListItem} id={'note-' + talk.id} key={talk.id} value={talk.id}>
            <Card className={this.props.classes.channelCard}>
              <CardContent className={this.props.classes.channelCardContent}>
                <Avatar src={talk.icon_url} style={{float: 'left', marginRight: '10px'}}/>
                <div style={{float: 'left', paddingBottom: '16px'}}>
                  <Typography className={this.props.classes.user}>
                    <span style={{fontWeight: 'bold'}}>{talk.user_name}</span>
                    {` ${talk.created_at}`}
                  </Typography>
                  <Typography style={{fontSize: '16px'}}>
                    <Emoji text={talk.note}/>
                  </Typography>
                </div>
                {(() => {
                  if (talk.user_id === this.props.userId) {
                    return (<div style={{float: 'right'}}>
                      <Typography>
                        <Icon
                          className={this.props.classes.deleteMessage}
                          onClick={(e) => this.handleClickOpen(e, talk.id, talk.note)}>
                          clear
                        </Icon>
                      </Typography>
                    </div>
                  )}
                })()}
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
          <Button className={this.props.classes.profile}>
            <a href="/profiles">Profile</a>
          </Button>
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
  handleDeleteTalk: PropTypes.func,
}

export default withStyles(styles)(Channel);
