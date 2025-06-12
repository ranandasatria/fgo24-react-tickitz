import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import NavbarAdmin from '../components/NavbarAdmin';
import { Chart } from 'chart.js/auto';
import FetchMovieAPI from '../components/FetchMovie';

function Dashboard() {
  const bookedTickets = useSelector((state) => state.bookedTicket.bookedTicket) || []
  const localMovies = useSelector((state) => state.movies.localMovies) || []
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])

  const salesChartRef = useRef(null)
  const ticketChartRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const { genres: fetchedGenres, movies: fetchedMovies } = FetchMovieAPI()
      setGenres(fetchedGenres || [])
      setMovies(fetchedMovies || [])
    }
    fetchData()
  }, [])

  const [selectedMovie, setSelectedMovie] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const locations = ['Yogyakarta', 'Jakarta', 'Bandung']

  useEffect(() => {
    const ctxSales = document.getElementById('salesChart').getContext('2d')
    const ctxTicket = document.getElementById('ticketSalesChart').getContext('2d')

    if (salesChartRef.current) {
      salesChartRef.current.destroy()
    }
    if (ticketChartRef.current) {
      ticketChartRef.current.destroy()
    }

    const salesData = prepareSalesData()
    const ticketData = prepareTicketData()

    salesChartRef.current = new Chart(ctxSales, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales ($)',
          data: salesData,
          fill: true,
          backgroundColor: 'rgba(163, 191, 250, 0.5)',
          borderColor: '#4B5EAA',
          borderWidth: 2,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    ticketChartRef.current = new Chart(ctxTicket, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Ticket Sales ($)',
          data: ticketData,
          fill: true,
          backgroundColor: 'rgba(163, 191, 250, 0.5)',
          borderColor: '#4B5EAA',
          borderWidth: 2,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    return () => {
      if (salesChartRef.current) {
        salesChartRef.current.destroy()
      }
      if (ticketChartRef.current) {
        ticketChartRef.current.destroy()
      }
    }
  }, [selectedMovie, selectedCategory, selectedLocation, genres, movies])

  const prepareSalesData = () => {
    const monthlySales = Array(6).fill(0) 
    bookedTickets.forEach(ticket => {
      if (selectedMovie && ticket.movie !== selectedMovie) return
      const month = new Date(ticket.date).getMonth()
      if (month >= 0 && month <= 5) {
        monthlySales[month] += ticket.total
      }
    })
   
    if (bookedTickets.length === 0) {
      monthlySales[2] = 300 
      monthlySales[3] = 600 
    }
    return monthlySales
  }

  const prepareTicketData = () => {
    const monthlySales = Array(6).fill(0) 
    bookedTickets.forEach(ticket => {
      if (selectedCategory && getCategory(ticket.movie) !== selectedCategory) return
      if (selectedLocation && ticket.selectedLocation !== selectedLocation) return
      const month = new Date(ticket.date).getMonth()
      if (month >= 0 && month <= 5) {
        monthlySales[month] += ticket.total
      }
    })

    if (bookedTickets.length === 0) {
      monthlySales[2] = 300 
      monthlySales[3] = 600 
    }
    return monthlySales
  }

  const getCategory = (movieTitle) => {
    const localMovie = localMovies.find(m => m.movieTitle === movieTitle)
    if (localMovie) return localMovie.category
    const tmdbMovie = movies.find(m => m.title === movieTitle)
    if (tmdbMovie) {
      const genre = genres.find(g => tmdbMovie.genre_ids.includes(g.id))
      return genre ? genre.name : 'Unknown'
    }
    return 'Unknown'
  };

  const uniqueMovies = [...new Set(bookedTickets.map(ticket => ticket.movie))];
  const uniqueCategories = [...new Set(bookedTickets.map(ticket => getCategory(ticket.movie)))];

  return (
    <>
      <NavbarAdmin />
      <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-lg sm:text-xl font-medium text-gray-700 mb-6">Dashboard</h1>
          <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Sales Chart</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <select
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Movies Name</option>
                {uniqueMovies.map(movie => (
                  <option key={movie} value={movie}>{movie}</option>
                ))}
              </select>
              <select
                value="Weekly"
                disabled
                className="p-2 border rounded opacity-50"
              >
                <option value="Weekly">Weekly</option>
              </select>
              <button
                onClick={() => {
                  setSelectedMovie('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Filter
              </button>
            </div>
            <div className="h-64">
              <canvas id="salesChart"></canvas>
            </div>
          </div>
          <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Ticket Sales</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Category</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSelectedMovie('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Filter
              </button>
            </div>
            <div className="h-64">
              <canvas id="ticketSalesChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;