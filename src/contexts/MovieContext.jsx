import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if (storedFavs) setFavourites(JSON.parse(storedFavs)) // all out fav movies will be stored into a list, and that list will then be converted into a json string. local storage can only store strings, so we are putting it through json for this reason
    }, [])                                 // above, storing it as a string in local storage because local storage can only store strings

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites)) // so any time out favourite state changes (line 8), we want to update what we are storing in local storage. this useeffect only runs when our favourites changes (adding or removing a favourite)
    }, [favourites])                                       // above, takes our favourites which is an array, and convert it into a string

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]) 
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId)) // generating a new array where we only container all the movies that are not equal to the one we dont want to remove
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }
// anything inside the 'children' can now have access to all that is inside the values object
    return <MovieContext.Provider value={value}>
        {children} 
    </MovieContext.Provider>
}



/*
JSON. parse() is used to convert JSON data into a JavaScript object ,
to make it accessible and modifiable with in the JavaScript code.
JSON stringify() is used to convert a JavaScript object into a JSON formatted string,
that is usually used to send data onto the server, or transmitting it onto the network.
*/