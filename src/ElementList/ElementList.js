import { useSelector } from 'react-redux';



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

export default ElementList;
