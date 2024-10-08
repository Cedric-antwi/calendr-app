import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function HomeScreen() {

  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]) // arr of event objects
  const navigate = useNavigate()

  useEffect(() => {
      // Get user info from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.name) {
          setUserName(user.name); // Set the user's name in state
      }
      const token = localStorage.getItem('token');
      if (token) {
          setToken(token);
      }
  }, []);

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

 const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

 function createEventId() {
  return String(eventGuid++)
}


const handleNewEvent = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch(`${process.env.CALENDR_APP_API_URL}/events/new`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "hardcoded event",
        calendarId: currentUser.id
    })
    })
  } catch (error) {
    console.error('Error creating new event:', error)
  }
}


// ==========


  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  }

    return (
        <>
            <h1>Calendr Screen</h1>
            <h3>Welcome {userName}, to Calendr!</h3>
            <button onClick={handleLogout}>Logout</button>
            <br></br>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
        </>
    )
}