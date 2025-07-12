import React, { useState, useEffect, useMemo } from 'react';
import http from '../lib/http';

function FetchMovieAPI() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (isFetched) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [movieRes, genreRes, upcomingRes] = await Promise.all([
          http().get('/movies/now-showing?page=1&limit=12'),
          http().get('/genres'),
          http().get('/movies/upcoming'),
        ]);

        setMovies(movieRes.data.results?.movies || []);
        setGenres((genreRes.data.results || []).map(g => ({ id: g.id, name: g.genreName })));
        setUpcoming(upcomingRes.data.results || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setMovies([]);
        setGenres([]);
        setUpcoming([]);
      } finally {
        setIsLoading(false);
        setIsFetched(true);
      }
    };

    fetchData();
  }, [isFetched]);

  const fetchMovieDetails = async (id) => {
    try {
      const res = await http().get(`/movies/${id}`);
      return res.data.results || { director: 'Unknown', cast: [] };
    } catch (error) {
      console.error('Fetch movie details error:', error);
      return null;
    }
  };

  return useMemo(() => ({
    movies,
    genres,
    upcoming,
    fetchMovieDetails,
    isLoading,
  }), [movies, genres, upcoming, isLoading]);
}

export default FetchMovieAPI;

// import React, { useState, useEffect } from 'react';

// function FetchMovieAPI() {
//   const [movies, setMovies] = useState([])
//   const [genres, setGenres] = useState([])
//   const [upcoming, setUpcoming] = useState([])
//   const [movieDetails, setMovieDetails] = useState({})

//   useEffect(() => {
//     fetchMoviesAndGenres()
//   }, [])

//   async function fetchMoviesAndGenres() {
//     try {
//       //  now playing movies
//       const movieResponse = await fetch(
//         `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
//         // `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP®ion=JP`
//       )
//       const movieData = await movieResponse.json()
//       setMovies(movieData.results || [])
      

//       // genres
//       const genreResponse = await fetch(
//         `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
//       )
//       const genreData = await genreResponse.json()
//       setGenres(genreData.genres || [])
      

//       // upcoming
//       const upcomingResponse = await fetch(
//         `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP®ion=JP`
//       )
//       const upcomingData = await upcomingResponse.json()
//       setUpcoming(upcomingData.results || [])
//       console.log('Upcoming:', upcomingData.results)


//     } catch (error) {
//       console.error('Failed to fetch data:', error)
//     }
//   }

//   async function fetchMovieDetails(id) {
//     try {
      
//       if (movieDetails[id]) {
//         return movieDetails[id]
//       }

//       // movie details
//       const movieResponse = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
//         // `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ja-JP`
//       )
//       const movieData = await movieResponse.json()
      

//       // credits
//       const creditsResponse = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
//       )
//       const creditsData = await creditsResponse.json()

//       // Extract director and cast
//       const director = creditsData.crew?.find((member) => member.job === 'Director')?.name 
//       const cast = creditsData.cast?.slice(0, 6).map((member) => member.name).join(', ')

//       const details = { ...movieData, director, cast }
//       setMovieDetails((prev) => ({ ...prev, [id]: details }))
//       return details
      
//     } catch (error) {
//       console.error('Failed to fetch movie details:', error)
//       return null
//     }
//   }

//   return { movies, genres, upcoming, fetchMovieDetails }
// }

// export default FetchMovieAPI;