import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewDay, viewMonthAgenda, viewMonthGrid, viewWeek
  } from '@schedule-x/calendar'
   
import '@schedule-x/theme-default/dist/index.css'


export default function HomeScreen() {
    const getFormattedDate = () => {
        const currentDate = new Date(Date.now());
      
        const year = currentDate.getFullYear();          // Get the year (e.g., 2023)
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get the month and format as two digits
        const day = String(currentDate.getDate()).padStart(2, '0');         // Get the day and format as two digits
      
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
      }
      

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        defaultView: viewMonthGrid.name,
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
            <button><Link to="/">Logout</Link></button>
            <div>
                <ScheduleXCalendar calendarApp={calendar}/>
            </div>
        </>
    )
}