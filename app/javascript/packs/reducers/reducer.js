const initialState = {
  channels: [],
  selectedChannelId: 0,
  selectedChannelName: "",
  talks: [],
  userName: "",
  formValue: "",
}

export default function Reducer(state=initialState, action) {
  switch(action.type){
    case "test":
      return state
    case "setFormValue":
      console.log(action.currentState)
      return Object.assign({}, state, {
        formValue: action.currentState
      })
      //return state
    default:
      return state;
  }
}
