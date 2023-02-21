import { useDispatch } from 'react-redux';
import { useState } from 'react';


function ElementForm() {
    // Track the new element to add in our "local" state
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
        // Form to allow users to add new element
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Element Name"
                value={newElement}
                onChange={event => setNewElement(event.target.value)}
            />
            <button type="submit">Add!</button>
        </form>
    );
  }

  export default ElementForm; 