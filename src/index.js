import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//! added for redux component
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

//! reducer = a function
//* 2 para: state and action
//* reducer HAVE to return something
// similar to use state like - but different
// A reducer, at a high level, is just a piece of data,
//akin to a variable. In our case,
//we're tracking how many times a button has been clicked,
// as count.
const count = (state = 0, action) => {
  console.log('hello, i am a reducer', action);

  //* we can inspect the action's 'type' property
  //* to see what our component is trying to do
  if (action.type === 'INCREASE') {
    // console.log(`You clicked increase!`);
    //! The next value of `allReduxStore.count` will be 1 more than the previous value
    return state + 1;
  } else if (action.type === 'DECREASE') {
    // console.log(`You clicked decrease!`);

    // The next value of `reduxStore.count` will be 1 less than the previous value
    return state - 1;
  }
  //! If action.type is anything else, just return the last value of state.
  return state;
};

//! adding a new reducer called elementList
// add this new reducer to the main reducer
const elementList = (state = [], action) => {
  // console.log('i am a different reducer!!');
  if (action.type === 'ADD_ELEMENT') {
    console.log(`The element was ${action.payload}`);
    // state.push(action.payload);
    // return a new array
    //* ... spread allows us to keep the old value while adding to it
    //* useful when need a new array
    return [...state, action.payload];
}
  return state;
};

//! STORE; combine reducers
const storeInstance = createStore(
  combineReducers({
    count,
    elementList
  }),
  applyMiddleware(logger)
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
