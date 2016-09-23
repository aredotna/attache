import { Record } from 'immutable';

const InitialState = Record({
  currentUser: null,
  showState: false,
  currentState: null,
  store: null
});

export default InitialState;
