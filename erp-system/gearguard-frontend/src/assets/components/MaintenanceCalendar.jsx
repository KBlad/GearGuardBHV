import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch from your Spring Boot API
    fetch('/api/maintenance-requests')
      .then(res => res.json())
      .then(data => {
        // Filter for Preventive maintenance requests only 
        const preventiveRequests = data.filter(req => req.type === 'Preventive')
          .map(req => ({
            id: req.id,
            title: req.subject, // 
            start: req.scheduledDate, // 
            allDay: true
          }));
        setEvents(preventiveRequests);
      });
  }, []);

  const handleDateClick = (arg) => {
    // Logic to open a modal to schedule a new request 
    alert('Create new maintenance for: ' + arg.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
};

export default MaintenanceCalendar;