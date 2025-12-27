// import React, { useState } from 'react';
// // Updated paths to match your "assets/components" folder structure
// import MaintenanceCalendar from './assets/components/MaintenanceCalendar';
// import KanbanBoard from './assets/components/KanbanBoard';
// import './App.css';

// function App() {
//   // State to switch between the two required views
//   const [view, setView] = useState('calendar');

//   return (
//     <div className="App">
//       <header style={{ padding: '20px', backgroundColor: '#242424', color: 'white' }}>
//         <h1>GearGuard ERP System</h1>
//         <nav>
//           <button 
//             onClick={() => setView('calendar')}
//             style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}>
//             Calendar (Preventive)
//           </button>
//           <button 
//             onClick={() => setView('kanban')}
//             style={{ padding: '10px', cursor: 'pointer' }}
//           >
//             Kanban Board
//           </button>
//         </nav>
//       </header>

//       <main style={{ padding: '20px' }}>
//         {view === 'calendar' ? (
//           <div>
//             <h2>Preventive Maintenance Schedule</h2>
//             {/* Requirement: Display all Preventive maintenance requests  */}
//             {/* Requirement: Allow users to click a date to schedule a new request [cite: 63] */}
//             <MaintenanceCalendar />
//           </div>
//         ) : (
//           <div>
//             <h2>Maintenance Workflow</h2>
//             {/* Requirement: Group by Stages (New | In Progress | Repaired | Scrap) [cite: 55] */}
//             <KanbanBoard />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
// Updated imports based on your file structure
import MaintenanceCalendar from './assets/components/MaintenanceCalendar.jsx';
import KanbanBoard from './assets/components/KanbanBoard.jsx';

function App() {
  const [view, setView] = useState('kanban'); // Default to Kanban for easier testing

  // -- Styles for the "Delightful" Header --
  const headerStyle = {
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eef0f2',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const brandStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.5px',
  };

  const navButtonStyle = (isActive) => ({
    padding: '8px 16px',
    marginLeft: '12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    // Logic: Active button is blue, inactive is grey/transparent
    backgroundColor: isActive ? '#e6f7ff' : 'transparent',
    color: isActive ? '#007bff' : '#555',
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* 1. The Clean White Header */}
      <header style={headerStyle}>
        <div style={brandStyle}>GearGuard</div>
        <nav>
          <button 
            onClick={() => setView('calendar')}
            style={navButtonStyle(view === 'calendar')}
          >
            Calendar
          </button>
          <button 
            onClick={() => setView('kanban')}
            style={navButtonStyle(view === 'kanban')}
          >
            Kanban Board
          </button>
        </nav>
      </header>

      {/* 2. Main Content Area */}
      <main>
        {view === 'calendar' ? (
          <div style={{ padding: '40px' }}>
            <h2 style={{ marginBottom: '20px', fontWeight: '600', color: '#333' }}>
              Preventive Schedule
            </h2>
            <MaintenanceCalendar />
          </div>
        ) : (
          <div>
            {/* The KanbanBoard already handles its own padding/layout */}
            <KanbanBoard />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;