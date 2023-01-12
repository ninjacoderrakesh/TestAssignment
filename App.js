// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/MainNavigationContainer/NavigationScreens';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import {allReducer} from './src/redux/MainReducer';
import RootSaga from './src/redux/sagas/rootSaga';
import {Provider} from 'react-redux';

function App() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(allReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(RootSaga);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
