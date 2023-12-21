import CreateEvent from './pages/CreateEvent'
import CategoryView from './pages/CategoryView'
import EditEvent from './pages/EditEvent'
import EventDetails from './pages/EventDetails'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './App.css'

import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const [eventFormData, setEventFormData] = useState({
    name: '',
    category: 'Important',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const clearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    axios.get('http://localhost:5005/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events: ', error)
      })
  }, []);

  const handleDeleteEvent = (eventId) => {
    axios.delete(`http://localhost:5005/events/${eventId}`)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
      })
      .catch((error) => {
        console.error('Error deleting event: ', error)
      })
  }

  const handleUpdateEvent = (editedEvent) => {
    setEvents((prevEvents) => {
      const index = prevEvents.findIndex((event) => event.id === editedEvent.id);

      if (index !== -1) {
        // Create a new array with the edited event at the found index
        const updatedEvents = [...prevEvents];
        updatedEvents[index] = editedEvent;
        return updatedEvents;
      }

      return prevEvents;
    })
  }

  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }
  return (
    <div className='app-container'>
      <Navbar className='navbar' onSearch={handleSearch} searchQuery={searchQuery} />
      <div className='main-container' >
        <div className='sidebar' >
        <Sidebar />
        </div>
        <div className='main-page' >
          <Routes >
            <Route path="/" element={<Home events={events} onDelete={handleDeleteEvent} searchQuery={searchQuery} clearSearch={clearSearch} />} />
            <Route path="/create" element={<CreateEvent eventFormData={eventFormData} setEventFormData={setEventFormData} onCreateEvent={handleCreateEvent} />} />
            <Route path="/category" element={<CategoryView />} />
            <Route path="/:id" element={<EventDetails />} />
            <Route path="/:id/edit" element={<EditEvent updateEvent={handleUpdateEvent} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
