const SearchBox = (props) => {
    return ( 
        <div>
            <input
            
            type="text" 
            className="form-control"
            placeholder="Search for a film"
            value={props.value}
            onChange={(event)=>props.setSearchFilm(event.target.value)}
            />
        </div>
     );
}
 
export default SearchBox;