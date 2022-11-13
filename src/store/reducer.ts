import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import verseReducer from './verse/reducer';

const reducer = combineReducers({
  userInfo: userReducer,
  verse: verseReducer,
});

export default reducer;
