# REDUX INTRO NOTES

## installation 
```md
$ npm install redux@4 react-redux@7 redux-logger@3
```

## setup
To get redux up and running we need:

A reducer
A store
A Provider
Let's add these to our index.js file, and the we'll talk through them in more detail.

index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// reducer!
const count = (state = 0, action) => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);

    return state;
};

// store!
const storeInstance = createStore(
    count
);

// Provider lets redux and react talk to one another
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## reducer:
At its core, redux is a way to make sharable, app-wide (globally accessible) variables. A reducer, at a high level, is just a piece of data, akin to a variable. In our case, we're tracking how many times a button has been clicked, as count.

......we return the value of the state from a function:
```jsx
const count = (state = 0, action) => {
    return state;
}
```

## STORE / Combine reducers
We also need to add the new reducer to our store. We need a tool to have more than one, though: combineReducers:
```js
const storeInstance = createStore(
    combineReducers(
        {
            count

        }
    )
);
```

## Provider
then wrap your redux inside provider like this:
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
    <App />
    </Provider>
  </React.StrictMode>
);

```

## useSelector
**Access Redux State from Components**
In order to see the redux state data on the DOM, we'll need to hook into it. We have to say which data we care about. The hook is called useSelector which selects data from the store.
- allow you to access data from store to the UI/DOM

```jsx
// useSelector is a hook provided by the react-redux library
import { useSelector } from 'react-redux';

function App () {
    // useSelector accepts a function that tells it what part of the store you want.
    // here we return the whole store
    const reduxStore = useSelector(store => store)

    return (
      <div>
        {/* Render the entire reduxStore to our DOM, as a JS object (JSON) */}
        <pre>{JSON.stringify(reduxStore)}</pre>
      </div>
    );

}

export default App;
```
- reduce store = giant object with keys of reducer name and the value of the 'current' value

- When we use combineReducers each reducer gets its own little bit of space in the overall redux store. They don't get to interact with each other, and each reducer is responsible for updates to its own bit of state.

## Redux Actions
- state is the value of the reducer 
- action is the thing that will change the 'state' and you do that by 'dispath'

Redux provides two things to our reducers: state and an action.

We've talked about how state represents the current value being held in the redux store. Where does action come from?

React components can talk to our redux state by dispatching actions:

```jsx
// Import useDispatch
import { useSelector, useDispatch } from 'react-redux';

function App () {
    // Grab out count value from redux
    const count = useSelector(store => store.count)

    // "dispatch" is how we talk to redux from react
    const dispatch = useDispatch();

    return (
      <div>
        {/* Dispatching an action when a button is clicked*/}
        <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase!</button>

        {/* Render the count from our redux store */}
        <p>Count: {count}</p>
      </div>
    );

}

export default App;
```
- dispatching = triggers all the reducers 

-Actions are objects. They need a property of type that tells our reducer what kind of action it is:
```js
// reducer!
const count = (state = 0, action) => {
    console.log(`Hey!!! I'm a reducer y'all!!!`, action);

    // We can inspect the action's "type" property, 
    // to see what our component is trying to do
    if (action.type === 'INCREASE') {
        console.log(`You clicked increase!`);
    }

    return state;
};
```

- Notice that the type is different for the two actions. We set that up in the button onClick, and can use that to know which button was clicked in the reducers.

- the reducer = in charge of manipulating the DOM; the logics and math are usually done in the reducer (index.js file)

## logger  
- middleware for redux
```js
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';


applyMiddleware(logger);
```

## redux diagram
![redux diagram](./public/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
[reference here](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

## Action Payload
At some point, we'll probably want to start passing more information to our reducer.

We're going to use elements on the periodic table as our example:

```jsx
<button onClick={() => dispatch({ type: 'ADD_ELEMENT', payload: 'hydrogen'})}>Add Element</button>
```

- Let's update our elementList reducer to pick up this dispatched action and log the payload.
```js
const elementList = (state = [], action) => {
    if(action.type === 'ADD_ELEMENT') {
        console.log(`The element was ${action.payload}`);
    }
    return state;
};
```

## Spread
For the elements data, we want to add to an array so we can see all the elements added. How have we added to an array in the past?
```js
const elementList = (state = [], action) => {
  if (action.type === 'ADD_ELEMENT') {
    console.log(`The element was ${action.payload}`);
    state.push(action.payload);
    return state;
  }

  return state;
}
```
- Let's try rendering those elements to the App component, and see if they show up:
```js
const elementList = useSelector(store => store.elementList);

// in return value
<ul>
{elementList.map((element, i) => (
    <li key={i}>{element}</li>
))}
</ul>
```

- we need to...make a new array. It needs to have all our stuff that was in the old array, and add to it our old array.

Spread is a javascript operator that can help! ... -- Spread operator

In a way, what spread does is give us the contents of an array. This is useful so we keep the contents of the old array when we make a new one. Objects too!

```jsx
const myArray = [1,2,3];
console.log(...myArray); // --> 1 2 3
```
- So breaking it down New array: [] Old array contents: ...state new data: action.payload

```js
const elementList = (state = [], action) => {
    if (action.type === 'ADD_ELEMENT') {
        // Create a new array
        // which includes all the values from our previous array
        // AND ALSO the new value in action.payload
        console.log(`The element was ${action.payload}`);
        return [...state, action.payload];
    }

    return state;
};
```

## Using Redux with Forms
Now that we know how to send data to reducers using action.payload, lets setup a <form> to grab data from the user:

1. Create a form with an input tied to local state
2. On form submit, dispatch an ADD_ELEMENT action, with the element name as payload
3. Render the element list to the DOM

```js
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function App() {
    // Grab our count value from the redux store
    const count = useSelector(store => store.count);

    // Grab the elementList array from the redux store
    const elementList = useSelector(store => store.elementList);

    // Track the new element to add in our "local" state
    // (yes, we can still use local state!)
    const [newElement, setNewElement] = useState('');

    // "dispatch" is how we talk to redux from react
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        // Don't reload on form submit
        event.preventDefault();

        // Tell redux that we want to add the new element
        dispatch({
            type: 'ADD_ELEMENT',
            // Pass in the element name, that we're tracking in state
            payload: newElement
        });

        // Clear the form field
        setNewElement('');
    };

    return (
      <div>
        {/* Dispatching an action when a button is clicked*/}
        <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase!</button>
        <button onClick={() => dispatch({ type: 'DECREASE' })}>Decrease!</button>

        {/* Render the count from our redux store */}
        <p>Count: {count}</p>

        {/* Form to allow users to add a new element */}
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Element Name"
                value={newElement}
                onChange={event => setNewElement(event.target.value)}
            />
            <button type="submit">Add!</button>
        </form>

        {/* Render the elements list from redux */}
        <ul>
            {elementList.map((element, i) => (
                <li key={i}>{element}</li>
            ))}
        </ul>
      </div>
    );

}

export default App;
```

- to capture the value user typed into input is:
**event.target.value**

## Child Components
The great thing about redux is that we have a single state object that's shared with every component in our application. So there's no need to pass down props into child components.

- Let's refactor our elements form to use multiple child components. First, we'll extract and <ElementList /> component
```js
function ElementList() {
    // Grab the elementList from the redux store
    const elementList = useSelector(store => store.elementList);

    return (
        // Render the elements list from redux 
        <ul>
            {elementList.map((element, i) => (
                <li key={i}>{element}</li>
            ))}
        </ul>
    );
}
```

