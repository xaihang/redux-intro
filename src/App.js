import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';

import './App.css';
import ElementForm from './ElementForm/ElementForm';
import ElementList from './ElementList/ElementList';

function App() {

  const count = useSelector((store) => store.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase</button>
      <button onClick={() => dispatch({ type: 'DECREASE' })}>Decrease</button>
      {/* Form to allow users to add new element */}
      <ElementForm />

      {/* Render the elements list from redux */}
      <ElementList />
    </div>
  );
}

//! original code before refactoring
// function App() {
//   const allReduxStore = useSelector((store) => store);
//   const count = useSelector((store) => store.count);
//   const elementList = useSelector((store) => store.elementList);

//   // Track the new element to add in our "local" state
//   // (yes, we can still use local state!)
//   const [newElement, setNewElement] = useState('');

//   // "dispatch" is how we talk to redux from react
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     // Don't reload on form submit
//     event.preventDefault();

//     // Tell redux that we want to add the new element
//     dispatch({
//       type: 'ADD_ELEMENT',
//       // Pass in the element name, that we're tracking in state
//       // whatever name you named the local state is what will be pass to payload
//       payload: newElement,
//     });

//     // Clear the form field
//     setNewElement('');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {JSON.stringify(allReduxStore)}
//         <p>{count}</p>
//         <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase</button>
//         <button onClick={() => dispatch({ type: 'DECREASE' })}>Decrease</button>
//         <button
//           onClick={() => dispatch({ type: 'ADD_ELEMENT', payload: 'hydrogen' })}
//         >
//           Add Element
//         </button>

//         {/* Form to allow users to add a new element */}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Element Name"
//             value={newElement}
//             onChange={(event) => setNewElement(event.target.value)}
//           />
//           <button type="submit">Add!</button>
//         </form>

//         {/* Render the elements list from redux */}
//         <ul>
//           {elementList.map((element, i) => (
//             <li key={i}>{element}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

export default App;
