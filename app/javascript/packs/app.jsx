import React from 'react';
import { render } from 'react-dom';
import Grid from 'material-ui/Grid';
import Main from './components/main'
import { withStyles } from 'material-ui/styles';

const styles = {
  all: {
    height: '100%',
    minHeight: '100%',
  }
};

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{height: '100%', minHeight: '100%'}}>
        <Main
        channels={this.props.channels}
        selectedChannelId={this.props.selectedChannelId}
        selectedChannelName={this.props.selectedChannelName}
        talks={this.props.talks}
        userName={this.props.userName}
        formValue={this.props.formValue}
        setFormValue={(e) => this.props.setFormValue(e)}
        />
      </div>
    )
  }
}

// let e = document.createElement('div')
// e.className = 'root'
// render(<App />, document.body.appendChild(e));
export default App
