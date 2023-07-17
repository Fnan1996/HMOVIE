import './App.css';
import { useEffect, useState } from 'react';
import FilmList from './Components/FilmList';

import 'bootstrap/dist/css/bootstrap.min.css';
import RemoveFavorites from "./Components/RemoveFavorites";
import AddFavorites from './Components/AddFavorites';

import { Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Favoraite from './pages/Favoraite';
import Header from './Components/Header';
import Footer from './Components/Footer';




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
    <Header searchFilm={searchFilm} setSearchFilm={setSearchFilm}  />
    <Routes>
      <Route  element={<Homepage  films={films} 
       favoritesChosen={addFavoriteFilm}
       favorites={AddFavorites} />} />
       <Route path='/' element={<Homepage>
        <FilmList
       films={films} 
       favoritesChosen={addFavoriteFilm}
       favorites={AddFavorites}/>
       </Homepage>} >       
       </Route>
      <Route path='/favorate'  element={<Favoraite>
        {<FilmList className="FilmList "
       films={favoriteFilms} 
       favoritesChosen={removeFavoriteFilm}
       favorites={RemoveFavorites}/>} 
      </Favoraite>} />
    </Routes>
    <Footer />
 </div>
 </>
 
 
 ); 
} 
 


export default App;
