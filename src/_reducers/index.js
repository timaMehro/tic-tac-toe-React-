import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { gameRegistration } from './game.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  gameRegistration,
  users,
  alert
});

export default rootReducer;