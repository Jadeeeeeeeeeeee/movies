import React, { useState, useEffect} from "react";
import axios from 'axios';

function Movies() {
  const [search, setSearch] = useState("iron man");
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null); // Keeping naming conventions correct
  const [localSearch, setLocSearch] = useState("");
  const [poster, setPoster] = useState(null);

  const myApiKey = import.meta.env.VITE_API_KEY; // Variable naming corrected
    
  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?apikey=${myApiKey}&s=${search}&type=movie`)
      .then((res) => {
        if (res.data.Search) {
          setTitle(res.data.Search[0].Title);
          setYear(res.data.Search[0].Year);
          setPoster(res.data.Search[0].Poster);
        } else {
          // Handle case where movie is not found
          setTitle("no movie found");
          setYear("no movie found");
          setPoster(null);
        }
      })
      .catch(error => console.error("There was an error!", error));
  }, [search, myApiKey]); // Dependency array updated

  function setLocalSearch(e) {
    setLocSearch(e.target.value);
  }

  function searchChange() {
    setSearch(localSearch);
  }

  return(
    <>
      <div className="MainContainor"> {/* Corrected the class name back */}
        <div className="Input">
          <input type="text" value={localSearch} onChange={setLocalSearch} />
          <button onClick={searchChange}>search for the movie</button>
        </div>
        {poster && <img src={poster} alt="Movie Poster" className="Img"/>}
        <div className="text">
        <h1>movie: {title || 'Not Found'}</h1>
          <h2>year: {year || 'N/A'}</h2>
        </div>
      </div>
    </>
  );
}

export default Movies;
