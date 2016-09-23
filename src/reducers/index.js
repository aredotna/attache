import auth from './auth';
import global from './global';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  global,
});

export default rootReducer;
