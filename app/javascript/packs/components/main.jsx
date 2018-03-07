import axios from 'axios'
import React from 'react';
import Grid from 'material-ui/Grid';
import ChannelList from './channel_list'
import Channel from './channel'
import TalkForm from './talk_form'
import { withStyles } from 'material-ui/styles';

const styles = {
  sideBar: {
    color: '#fff',
    backgroundColor: '#4d394b',
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
      channels: [],
      selectedChannelId: 0,
      selectedChannelName: "",
      talks: [],
      userName: "",
      formValue: "",
    }
  }

  componentDidMount() {
    this.subscriptChannel();
    axios.get('/channels.json').then((response) => {
      const channels = response.data
      const selectedChannelId = channels[0].id
      const selectedChannelName = channels[0].name
      axios.get("/channels/" + selectedChannelId + "/talks.json").then((response) => {
        const talks = response.data
        axios.get("/sessions.json").then((response) => {
          const userName = response.data
          this.setState({talks: talks,
                         channels: channels,
                         selectedChannelId: selectedChannelId,
                         selectedChannelName: selectedChannelName,
                         userName: userName})
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
            this.setState({talks: this.state.talks.concat([talk])})
          }
        },
        post(channelId, message, userName) {
          this.perform('post', {channel_id: channelId,
                                message: message,
                                user_name: userName});
        }
      }
    );
    App.sample.received = App.sample.received.bind(this);
  }

  handleClickChannel(i, name) {
    const selectedChannelId = i
    const selectedChannelName = name
    axios.get('/channels.json').then((response) => {
      const channels = response.data
      axios.get("/channels/" + selectedChannelId + "/talks.json").then((response) => {
        this.setState({talks: response.data,
                       channels: channels,
                       selectedChannelId: selectedChannelId,
                       selectedChannelName: selectedChannelName})
      }).catch((response) => {
        console.log(response)
      })
    }).catch((response) => {
      console.log(response)
    })
  }

  handleSendTalk(e, i, _talk, userName) {
    e.preventDefault()
    if (_talk === "") {
      return
    }
    App.sample.post(i, _talk, userName)
  }

  handleLogout() {
    axios.delete('/sessions.json').then((response) => {
      window.location.reload()
    }).catch((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className={this.props.classes.all}>
        <Grid container className={this.props.classes.all}>
          <Grid item xs={3} className={this.props.classes.sideBar}>
            <ChannelList
              channels={this.state.channels}
              selectedChannelId={this.state.selectedChannelId}
              handleClickChannel={(i, name) => this.handleClickChannel(i, name)}
            />
          </Grid>
          <Grid item xs={9} className={this.props.classes.all}>
            <Channel
              talks={this.state.talks}
              className={this.props.classes.allScroll}
              selectedChannelName={this.state.selectedChannelName}
              handleLogout={() => this.handleLogout()}
            />
            <TalkForm
              selectedChannelId={this.state.selectedChannelId}
              selectedChannelName={this.state.selectedChannelName}
              handleSendTalk={(e, i, _talk, userName) => this.handleSendTalk(e, i, _talk, userName)}
              userName={this.state.userName}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Main)
