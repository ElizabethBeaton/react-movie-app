import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../services/api";


function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
        } catch (err) {
            console.log(err)
            setError("Failed to load movies..")
        }
        finally {
            setLoading(false)
        }
    }
    loadPopularMovies()
  }, [])


  const handleSearch = async (e) => {
    e.preventDefault() // stops the page from updating so now when i click search, it doesnt clear the input
    if (!searchQuery.trim()) return // makng sure user isnt just chearching for an empty string
    if (loading) return // wont allow us to search if already searching with something else

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    }
    catch (err){
        console.log(err);
        setError("Failed to search movies..")
    }
    finally {
        setLoading(false)
    }

  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies ..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // how to update a state from an input element
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message"> {error}</div>}

      {loading ? ( <div className="loading">Loading..</div> // if loading, display loading, otherwise show movie
      ) : (

      <div className="movie-grid">
        {movies.map(
          (
            movie // using .map function which is going to iterate over all the value in the array, and for all values, itll take it and pass it through the function. this function then returns some jsx code, in this case returning a component, and then display this for every movie
          ) => (
            <MovieCard movie={movie} key={movie.id} /> // key is needed
          ) )}
      </div>
    )}
    </div>
  );
}

export default Home;
