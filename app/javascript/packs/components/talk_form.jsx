import React from 'react';
import PropTypes from 'prop-types';
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
    width: '98%',
    height: '40px',
    paddingLeft: '10px',
    marginLeft: '30px',
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 14,
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
    fontSize: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
    marginLeft: '30px',
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
    // 入力フォームの上に @ の候補を出すために候補の数に応じて描画位置を動的に切り替える
    const height = 40 + (this.state.suggessions.length * 40)
    const suggessionsHeightPx = `-${height}px`
    const containerOpen = Object.assign(autoSuggestTheme.suggestionsContainerOpen, {marginTop: suggessionsHeightPx})
    const suggestTheme = Object.assign(autoSuggestTheme, {suggestionsContainerOpen: containerOpen})
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
                theme={suggestTheme}
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

TalkForm.propTypes = {
  selectedChannelId: PropTypes.number,
  selectedChannelName: PropTypes.string,
  handleSendTalk: PropTypes.func,
  userId: PropTypes.number,
  accounts: PropTypes.array,
}

export default withStyles(styles)(TalkForm)
