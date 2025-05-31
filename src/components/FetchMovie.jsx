import React, { useState, useEffect } from 'react';

function FetchMovieAPI() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [movieDetails, setMovieDetails] = useState({})

  useEffect(() => {
    fetchMoviesAndGenres()
  }, [])

  async function fetchMoviesAndGenres() {
    try {
      //  now playing movies
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        // `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP®ion=JP`
      )
      const movieData = await movieResponse.json()
      setMovies(movieData.results || [])
      

      // genres
      const genreResponse = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      const genreData = await genreResponse.json()
      setGenres(genreData.genres || [])
      

      // upcoming
      const upcomingResponse = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP®ion=JP`
      )
      const upcomingData = await upcomingResponse.json()
      setUpcoming(upcomingData.results || [])
      console.log('Upcoming:', upcomingData.results)


    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  async function fetchMovieDetails(id) {
    try {
      
      if (movieDetails[id]) {
        return movieDetails[id]
      }

      // movie details
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        // `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP`
      )
      const movieData = await movieResponse.json()
      

      // credits
      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      const creditsData = await creditsResponse.json()

      // Extract director and cast
      const director = creditsData.crew?.find((member) => member.job === 'Director')?.name 
      const cast = creditsData.cast?.slice(0, 6).map((member) => member.name).join(', ')

      const details = { ...movieData, director, cast }
      setMovieDetails((prev) => ({ ...prev, [id]: details }))
      return details
      
    } catch (error) {
      console.error('Failed to fetch movie details:', error)
      return null
    }
  }

  return { movies, genres, upcoming, fetchMovieDetails }
}

export default FetchMovieAPI;