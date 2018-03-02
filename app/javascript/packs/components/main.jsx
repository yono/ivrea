import axios from 'axios'
import React from 'react';
import Grid from 'material-ui/Grid';
import ChannelList from './channel_list'
import Channel from './channel'
import TalkForm from './talk_form'

class Main extends React.Component {
  constructor(props) {
    super(props)
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
    this.state = {
      channels: [],
      selectedChannelId: 0,
      talks: [],
    }
  }

  componentDidMount() {
    axios.get('/channels.json').then((response) => {
      const channels = response.data
      const selectedChannelId = channels[0].id
      axios.get("/channels/" + selectedChannelId + "/talks.json").then((response) => {
        this.setState({talks: response.data,
                       channels: channels,
                       selectedChannelId: selectedChannelId})
      }).catch((response) => {
        console.log(response)
      })
    }).catch((response) => {
      console.log(response)
    })
  }

  handleClickChannel(i) {
    const selectedChannelId = i
    axios.get('/channels.json').then((response) => {
      const channels = response.data
      axios.get("/channels/" + selectedChannelId + "/talks.json").then((response) => {
        this.setState({talks: response.data,
                       channels: channels,
                       selectedChannelId: selectedChannelId})
      }).catch((response) => {
        console.log(response)
      })
    }).catch((response) => {
      console.log(response)
    })
  }

  handleSendTalk(e, i, _talk) {
    e.preventDefault()
    const selectedChannelId = i
    const talk = _talk
    axios.post('/channels/' + selectedChannelId + '/talks.json', {talk: {note: talk}}).then((response) => {
      axios.get('/channels.json').then((response) => {
        const channels = response.data
        axios.get("/channels/" + selectedChannelId + "/talks.json").then((response) => {
          this.setState({talks: response.data,
                         channels: channels,
                         selectedChannelId: selectedChannelId})
        }).catch((response) => {
          console.log(response)
        })
      }).catch((reponse) => {
        console.log(response)
      })
    }).catch((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <ChannelList
              channels={this.state.channels}
              selectedChannelId={this.state.selectedChannelId}
              handleClickChannel={i => this.handleClickChannel(i)}
            />
          </Grid>
          <Grid item xs={9}>
            <Channel
              talks={this.state.talks}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TalkForm
              selectedChannelId={this.state.selectedChannelId}
              handleSendTalk={(e, i, _talk) => this.handleSendTalk(e, i, _talk)}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Main
