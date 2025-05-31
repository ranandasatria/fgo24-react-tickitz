import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import Button from '../components/Button';

function Ticket() {
  const location = useLocation()
  const navigate = useNavigate()
  const { ticketId } = location.state || {}
  const currentUser = useSelector((state) => state.auth.currentUser)
  const bookedTickets = useSelector((state) => state.bookedTicket.bookedTicket)
  const ticket = bookedTickets.find((t) => t.id === ticketId)


  if (!currentUser) {
    toast.error('Please log in to view your ticket.', {
      style: {
        background: '#ef4444',
        color: '#fff',
      },
    })
    navigate('/login')
    return null
  }


  if (!ticket) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center my-8 px-4 md:px-8 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-red-600">Ticket not found</h3>
        </div>
        <FooterSection />
      </>
    )
  }

  const handleDownload = () => {
    toast.success('Download success!', {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
    })
  }

  const handleDone = () => {
    navigate('/profile')
  }

  const username = currentUser.name || currentUser.email.split('@')[0]
  const displayDateTime = `${ticket.date} at ${ticket.time}`
  const displaySeats = ticket.seats.length > 0 ? ticket.seats.join(', ') : 'None'
  const displayNumTickets =
    ticket.seats.length > 0
      ? `${ticket.seats.length} ${ticket.seats.length === 1 ? 'ticket' : 'tickets'}`
      : '0 tickets'
  const displayTotal = ticket.total ? `$${ticket.total.toFixed(2)}` : '$0.00'

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center my-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex gap-4 items-center justify-center mb-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
              ✓
            </div>
            <p className="body-3-medium text-black-600">Payment Confirmed</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-12 w-full">
          <div className="flex-1 border rounded-xl shadow-lg p-6 bg-white">
            <h3 className="text-2xl font-bold text-black-600 mb-6">Your Ticket</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">Movie</p>
                  <p className="text-base font-semibold">{ticket.movie}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-base font-semibold">{displayDateTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-base font-semibold">{ticket.selectedLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cinema</p>
                  <p className="text-base font-semibold">{ticket.cinema}</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">Number of Tickets</p>
                  <p className="text-base font-semibold">{displayNumTickets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="text-base font-semibold">{displaySeats}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-base font-semibold text-orange-500">{displayTotal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked by</p>
                  <p className="text-base font-semibold">{username}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button variant="secondary" onClick={handleDownload} className="w-full sm:w-auto">
                Download
              </Button>
              <Button variant="primary" onClick={handleDone} className="w-full sm:w-auto">
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}

export default Ticket;