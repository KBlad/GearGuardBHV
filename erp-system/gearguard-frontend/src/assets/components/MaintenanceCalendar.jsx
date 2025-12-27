import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch logic here...
    // (Keep your existing fetch logic)
  }, []);

  const handleDateClick = (arg) => {
    alert('Create new maintenance for: ' + arg.dateStr);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}> {/* Centering Wrapper */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto" /* Crucial: Prevents boxes from stretching vertically */
        aspectRatio={1.5} /* Optional: Controls width-to-height ratio */
      />
    </div>
  );
};

export default MaintenanceCalendar;