import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Autosuggest from 'react-autosuggest';

const styles = {
  textField: {
    paddingLeft: '30px',
  }
}

const autoSuggestTheme = {
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: '40px',
    paddingLeft: '10px',
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
  <span>{suggestion}</span>
);

class TalkForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formValue: "",
      suggessions: [],
    }
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event, {newValue, method}) {
    const enter = 13
    if (method != 'enter') {
      this.setState({formValue: newValue})
    }
  }

  handleSendTalk(e, selectedChannelId, userId) {
    const message = this.state.formValue
    this.setState({formValue: ""})
    this.props.handleSendTalk(e, selectedChannelId, message, userId)
  }

  getSuggestions(value) {
    const suggessions = this.props.accounts.filter(function(item) {
      return item.indexOf(value) == 0;
    })
    return suggessions;
  }

  onSuggestionsFetchRequested({value, reason}) {
    this.setState({
      suggessions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const selectedChannelId = this.props.selectedChannelId
    const selectedChannelName = this.props.selectedChannelName
    const userId = this.props.userId
    const inputProps = {
      value: this.state.formValue,
      onChange: this.handleInput,
      type: 'search',
      placeholder: `Message #${selectedChannelName}`
    }
    return (
      <div>
        <form onSubmit={(e) => this.handleSendTalk(e, selectedChannelId, userId)}>
          <Grid container>
            <Grid item xs={10}>
              <Autosuggest
                suggestions={this.state.suggessions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={autoSuggestTheme}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                variant="raised"
                color="primary"
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(TalkForm)
