import axios from 'axios'
import React from 'react';
import Grid from 'material-ui/Grid';
import ChannelList from './channel_list'
import Channel from './channel'
import TalkForm from './talk_form'
import { withStyles } from 'material-ui/styles';
import NotificationSystem from 'react-notification-system';

const styles = {
  sideBar: {
    color: '#fff',
    backgroundColor: '#2D2D2D',
    height: '100%',
    minHeight: '100%',
  },
  all: {
    height: '100%',
    minHeight: '100%',
  },
  allScroll: {
    height: '100%',
    minHeight: '100%',
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props)
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
    this.state = {
      channels: [{id: 0, name: '', talks: []}],
      selectedChannelId: 0,
      selectedChannelName: "",
      userId: 0,
      userName: "",
      formValue: "",
      _notificationSystem: null,
    }
    this._addNotification = this._addNotification.bind(this);
    this.callbackFunc = this.callbackFunc.bind(this)
  }

  callbackFunc(channel) {
    this.handleClickChannel(channel.id, channel.name);
  }

  _addNotification(channel, talk) {
    this.state._notificationSystem.addNotification({
      title: `#${channel.name}`,
      message: `${talk.user_name}: ${talk.note}`,
      level: "success",
    })
  }

  componentDidMount() {
    this.subscriptChannel();
    this.subscriptChannelList();
    axios.get('/channels.json').then((response) => {
      const channels = response.data
      const selectedChannelId = channels[0].id
      const selectedChannelName = channels[0].name
      axios.get(`/channels/${selectedChannelId}/talks.json`).then((response) => {
        const talks = response.data
        axios.get("/sessions.json").then((response) => {
          const user = response.data
          const userId = user.id
          const userName = user.name
          this.setState({
            channels: channels.map(function (channel) {
              if (channel.id === selectedChannelId) {
                return {id: channel.id, name: channel.name, talks: talks};
              } else {
                return {id: channel.id, name: channel.name, talks: []};
              }
            }),
            selectedChannelId: selectedChannelId,
            selectedChannelName: selectedChannelName,
            userId: userId,
            userName: userName,
            _notificationSystem: this.refs.notificationSystem,})
        }).catch((response) => {
          console.log(response)
        })
      }).catch((response) => {
        console.log(response)
      })
    }).catch((response) => {
      console.log(response)
    })
  }

  subscriptChannel() {
    App.sample = App.cable.subscriptions.create("ChatChannel", {
        connected() {
        },
        disconnected() {
        },
        received(data) {
          const talk = data
          if (talk.channel_id === this.state.selectedChannelId) {
            const targetChannelIndex = this.state.channels.findIndex(function(o) { return o.id === talk.channel_id }.bind(this));
            const targetChannel = this.state.channels[targetChannelIndex];
            const channel = {id: this.state.selectedChannelId, name: this.state.selectedChannelName, talks: targetChannel.talks.concat([talk])};
            var _channels = this.state.channels.slice();
            _channels.splice(targetChannelIndex, 1, channel);
            this.setState({channels: _channels});
          } else {
            if (talk.note.indexOf(`@${this.state.userName}`) != -1) {
              const targetChannelIndex = this.state.channels.findIndex(function(o) { return o.id === talk.channel_id }.bind(this));
              const targetChannel = this.state.channels[targetChannelIndex];
              this._addNotification(targetChannel, talk);
            }
          }
        },
        post(channelId, message, userId) {
          this.perform('post', {channel_id: channelId,
                                message: message,
                                user_id: userId});
        }
      }
    );
    App.sample.received = App.sample.received.bind(this);
  }

  subscriptChannelList() {
    App.channelList = App.cable.subscriptions.create("ChannelChannel", {
      connected() {
      },
      disconnected() {
      },
      received(data) {
        const channel = data
        this.setState({channels: this.state.channels.concat([{id: channel.id, name: channel.name, talks: []}])})
      }
    });
    App.channelList.received = App.channelList.received.bind(this);
  }

  // FIXME ロジックが煩雑なのでリファクタしたい
  handleClickChannel(i, name) {
    const selectedChannelId = i
    const selectedChannelName = name
    const selectedChannelTalks = this.state.channels.find(function(o) {return o.id === selectedChannelId}.bind(this)).talks
    if (selectedChannelTalks.length > 0) {
      const selectedChannelLastTalkId = selectedChannelTalks[selectedChannelTalks.length - 1].id;
      axios.get(`/channels/${selectedChannelId}/talks.json?after=${selectedChannelLastTalkId}`).then((response) => {
        const newTalks = response.data;
        if (newTalks.length === 0) {
          this.setState({selectedChannelId: selectedChannelId,
                         selectedChannelName: selectedChannelName})
        } else {
          const targetChannelIndex = this.state.channels.findIndex(function(o) { return o.id === selectedChannelId }.bind(this));
          const targetChannel = this.state.channels[targetChannelIndex];
          const channel = {id: selectedChannelId, name: selectedChannelName, talks: targetChannel.talks.concat([newTalks])};
          var _channels = this.state.channels.slice();
          _channels.splice(targetChannelIndex, 1, channel);
          this.setState({channels: _channels,
                         selectedChannelId: selectedChannelId,
                         selectedChannelName: selectedChannelName})
        }
      }).catch((response) => {
        console.log(response)
      })
    } else {
      axios.get(`/channels/${selectedChannelId}/talks.json`).then((response) => {
        const newTalks = response.data;
        if (newTalks.length === 0) {
          this.setState({selectedChannelId: selectedChannelId,
                         selectedChannelName: selectedChannelName})
        } else {
          const targetChannelIndex = this.state.channels.findIndex(function(o) { return o.id === selectedChannelId }.bind(this));
          const targetChannel = this.state.channels[targetChannelIndex];
          const channel = {id: selectedChannelId, name: selectedChannelName, talks: targetChannel.talks.concat(newTalks)};
          var _channels = this.state.channels.slice();
          _channels.splice(targetChannelIndex, 1, channel);
          this.setState({channels: _channels,
                         selectedChannelId: selectedChannelId,
                         selectedChannelName: selectedChannelName})
        }
      }).catch((response) => {
        console.log(response)
      })
    }
  }

  handleSendTalk(e, i, _talk, userId) {
    e.preventDefault()
    if (_talk === "") {
      return
    }
    App.sample.post(i, _talk, userId)
  }

  handleCreateChannel(channelName) {
    const name = channelName
    axios.post('/channels.json', {channel: {name: name}}).then((response) => {
      return
    }).catch((response) => {
      console.log(reponse)
    })
  }

  handleLogout() {
    axios.delete('/sessions.json').then((response) => {
      window.location.reload()
    }).catch((response) => {
      console.log(response)
    })
  }

  render() {
    const channel = this.state.channels.find(function(o) { return o.id === this.state.selectedChannelId }.bind(this))
    const talks = channel.talks
    return (
      <div className={this.props.classes.all}>
        <Grid container className={this.props.classes.all}>
          <Grid item xs={3} className={this.props.classes.sideBar}>
            <ChannelList
              channels={this.state.channels}
              selectedChannelId={this.state.selectedChannelId}
              handleClickChannel={(i, name) => this.handleClickChannel(i, name)}
              handleCreateChannel={(name) => this.handleCreateChannel(name)}
            />
          </Grid>
          <Grid item xs={9} className={this.props.classes.all}>
            <Channel
              talks={talks}
              className={this.props.classes.allScroll}
              selectedChannelName={this.state.selectedChannelName}
              handleLogout={() => this.handleLogout()}/>
            <TalkForm
              selectedChannelId={this.state.selectedChannelId}
              selectedChannelName={this.state.selectedChannelName}
              handleSendTalk={(e, i, _talk, userId) => this.handleSendTalk(e, i, _talk, userId)}
              userId={this.state.userId} />
          </Grid>
        </Grid>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}

export default withStyles(styles)(Main)
