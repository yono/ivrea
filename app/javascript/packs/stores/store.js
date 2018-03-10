import { createStore,  applyMiddleware } from 'redux';
import Reducer from '../reducers/reducer';
import { createLogger } from 'redux-logger';

const initialState = {
  channels: [],
  selectedChannelId: 0,
  selectedChannelName: "",
  talks: [],
  userName: "",
  formValue: "",
}

export default function configureStore() {
  // const logger = createLogger({ logger: console });
  //const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
  //const store = createStoreWithMiddleware(Reducer);
  const store = createStore(Reducer, initialState)
  return store;
}
