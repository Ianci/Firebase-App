import React, { useState } from 'react';
import { useHistory} from 'react-router-dom'
const Search = () => {

    const [ search, setSearch ] = useState('')
    const history = useHistory()
   
    console.log(history)


    const handleSubmit = e => {
        e.preventDefault()
        if(search.trim() === "")return;
        //Redireccionando
        history.push({
            pathname: `/searchproject`,
            search: `?q=${search}`,
            hash: "#project",
            state: { fromDashboard: true }
        })
    }
    
    return ( 
        <form className="form"
        onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" name="search" className="form-input"
            onChange={e => setSearch(e.target.value)}/>
            <button type="submit" className="form-btn"
            >Search</button>
        </form> 
     );
}
 
export default Search;

