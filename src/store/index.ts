import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

const persistConfig = {
  key: 'root', // 储存的标识名
  storage, // 储存方式
  whitelist: ['userInfo'], // 白名单 模块参与缓存
};
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(persistedReducer, composeEnhancers(storeEnhancer));
const persistor = persistStore(store);

export { store, persistor };
