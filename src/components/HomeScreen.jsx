import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewDay, viewMonthAgenda, viewMonthGrid, viewWeek
  } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'



export default function HomeScreen() {

  const [userName, setUserName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
      // Get user info from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.name) {
          setUserName(user.name); // Set the user's name in state
      }
  }, []);

  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  }

  const getFormattedDate = () => {
      const currentDate = new Date(Date.now());
    
      const year = currentDate.getFullYear();          // Get the year (e.g., 2023)
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the month and format as two digits
      const day = String(currentDate.getDate() + 1).padStart(2, '0');         // Get the day and format as two digits
    
      return `${year}-${month}-${day}`;  // Combine the values into the desired format
    };

    const calendarConfig = {
      calendars: {
          personal: {
              colorName: 'personal',
              lightColors: {
                main: '#f9d71c',
                container: '#fff5aa',
                onContainer: '#594800',
              },
              darkColors: {
                main: '#fff5c0',
                onContainer: '#fff5de',
                container: '#a29742',
              },
          }
      },
      callbacks: {
          onClickDate(date){
              console.log('onClickDate', date)
          },
          onRangeUpdate(range) {
              console.log('new calendar range start date', range.start)
              console.log('new calendar range end date', range.end)
            }
      }
    }

  const eventsServicePlugin = createEventsServicePlugin()
    

  const calendar = useCalendarApp({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      defaultView: viewMonthGrid.name,
      plugins: [eventsServicePlugin, createEventModalPlugin()],
      calendarConfig,
      events: [
        {
          id: '1',
          title: 'Event 1',
          start: getFormattedDate(),
          end: getFormattedDate(),
          calendarId: 'personal'
        },
      ],
    })


    return (
        <>
            <h1>Calendr Screen</h1>
            <h3>Welcome {userName}, to Calendr!</h3>
            <button onClick={handleLogout}>Logout</button>
            <div className='custom'>
                <ScheduleXCalendar calendarApp={calendar}/>
            </div>
        </>
    )
}