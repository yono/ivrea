import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import Emoji from 'react-emoji-render';

const styles = theme => ({
  user: {
    fontSize: 14,
    paddingBottom: 4,
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

class Message extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      content: "",
    }
    this.handleInput = this.handleInput.bind(this)
    this.hoge = this.hoge.bind(this)
  }

  handleFormOpen(e) {
    this.setState({
      open: true,
      content: this.props.talk.note,
    });
  }

  handleFormClose(e) {
    this.setState({
      open: false,
      content: "",
    })
  }

  handleInput(e) {
    const enter = 13;
    if (e.keyCode != enter) {
      this.setState({content: e.target.value})
    }
  }

  hoge() {
    this.props.handleUpdateTalk(undefined, this.props.talk.id, this.state.content)
    this.setState({
      open: false,
      content: "",
    })
  }

  render() {
    const talk = this.props.talk;
    const open = this.state.open;
    return (
      <ListItem className={this.props.classes.channelListItem} id={'note-' + talk.id} key={talk.id} value={talk.id}>
        <Card className={this.props.classes.channelCard}>
          <CardContent className={this.props.classes.channelCardContent}>
            <Avatar src={talk.icon_url} style={{float: 'left', marginRight: '10px', marginTop: '4px'}}/>
            <div style={{float: 'left', paddingBottom: '16px'}}>
              <Typography className={this.props.classes.user}>
                <span style={{fontWeight: 'bold'}}>{talk.user_name}</span>
                <span className={this.props.classes.createdAt}>{`${talk.created_at}`}</span>
              </Typography>
              {(() => {
                if (open) {
                  return (
                    <div>
                      <input type='text' value={this.state.content} onChange={(e) => this.handleInput(e)}/>
                      <button type="submit" onClick={() => this.hoge()}>保存</button>
                    </div>
                  )
                } else {
                  return (
                    <Typography style={{fontSize: '18px'}}>
                      <Emoji text={talk.note}/>
                    </Typography>
                  )}
                })()}
            </div>
            {(() => {
              if (talk.user_id === this.props.userId && !open) {
                return (<div style={{float: 'right'}}>
                  <Typography>
                    <Icon
                      className={this.props.classes.deleteMessage}
                      onClick={(e) => this.props.handleClickOpen(e, talk)}>
                      clear
                    </Icon>
                  </Typography>
                </div>
              )}
            })()}
            {(() => {
              if (talk.user_id === this.props.userId && !open) {
                return (<div style={{float: 'right'}}>
                  <Typography>
                    <Icon
                      className={this.props.classes.deleteMessage}
                      onClick={(e) => this.handleFormOpen(e)}>
                      create
                    </Icon>
                  </Typography>
                </div>
              )}
            })()}
            {(() => {
              if (talk.user_id === this.props.userId && open) {
                return (<div style={{float: 'right'}}>
                  <Typography>
                    <Icon
                      className={this.props.classes.deleteMessage}
                      onClick={(e) => this.handleFormClose(e)}>
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
  }
}

Message.propTypes = {
  talk: PropTypes.object,
  handleClickOpen: PropTypes.func,
  userId: PropTypes.number,
  handleUpdateTalk: PropTypes.func,
}

export default withStyles(styles)(Message);
