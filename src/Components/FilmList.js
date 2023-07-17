




const FilmList = (props) => {
    const Favorites=props.favorites; 
    return (
     <>
        {props.films.map(
            (film,index)=>
            <div  className="imgLister" key={index}>
                <img className="cc img-fluid" src={film.Poster} alt='Harry Potter Pic'  />
                <div onClick={()=>props.favoritesChosen(film)} className="dd">
                    <Favorites />
                </div>
            </div>
        )}
        </>
     );
}
 
export default FilmList;