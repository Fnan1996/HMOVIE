import './App.css';
import { useEffect, useState } from 'react';
import FilmList from './Components/FilmList';
import FilmListHeading from './Components/FilmListHeading';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './Components/SearchBox';
import AddFavorites from './Components/AddFavorites';
import RemoveFavorites from './Components/RemoveFavorites';



const App=()=> {
  const [films,setFilms]=useState([]);
  const [searchFilm,setSearchFilm]=useState('');
  const [favoriteFilms,setFavoriteFilms]=useState([]);

const getFilmsRequest = async(searchFilm)=>{
    // make the request to api
    
    const url=`http://www.omdbapi.com/?s=${searchFilm}&apikey=1193bafe`;//${searchFilm}
    const response = await fetch(url);
    //convert the response to json
    const responseJson=await response.json();
    //test the fetched data 
    //console.log(responseJson);
    //change the hardcoded data with the fetched data
   if(responseJson.Search){
    setFilms(responseJson.Search);
   }
    
  };
  
  useEffect(()=>{
    getFilmsRequest(searchFilm);
  },[searchFilm]);

  //get data from local storage
  useEffect(()=>{
    const filmFavorites=JSON.parse(
      localStorage.getItem('your-favorites')//'your-favorites is a key in local storage
      );
      if(filmFavorites){
        setFavoriteFilms(filmFavorites);
      }
      
    
  },[]);


//using this function we can save to so that we can fetch it from local storage
  const saveToLocalStorage=(items)=>{
    localStorage.setItem('your-favorites',JSON.stringify(items))
  }

 const addFavoriteFilm=(film)=>{
  const newFavoriteList=[...favoriteFilms,film];
  setFavoriteFilms(newFavoriteList);
  saveToLocalStorage(newFavoriteList);//saved data from local storage
 }

 const removeFavoriteFilm=(film)=>{
  const newFavoriteList=favoriteFilms.filter(
    (favoriteFilm)=>favoriteFilm.imdbID !== film.imdbID
  );
  setFavoriteFilms(newFavoriteList);
  saveToLocalStorage(newFavoriteList);//remove data from local storage
 }

 return (
  
 <>
 <div className='mom' >
    <div className="row d-flex align-items-end mt-2 mb-4">
      <FilmListHeading heading="hani-Flex"/>
      <SearchBox searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
    </div>
    <hr />
   <div className="container ">
      <FilmList
       films={films} 
       favoritesChosen={addFavoriteFilm}
       favorites={AddFavorites}/>
    </div>
    <hr />
     <div className="row d-flex align-items-start mt-2 mb-4">
       <FilmListHeading heading="Your Favorite"/>      
     </div>

      <div className="container">
      <FilmList className="FilmList "
       films={favoriteFilms} 
       favoritesChosen={removeFavoriteFilm}
       favorites={RemoveFavorites}/>
    </div>  
    <hr />
    
    
 </div>
 </>
 
 
 ); 
} 
 


export default App;
