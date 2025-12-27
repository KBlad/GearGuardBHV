// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
// Updated paths to match your "assets/components" folder structure
import MaintenanceCalendar from './assets/components/MaintenanceCalendar';
import KanbanBoard from './assets/components/KanbanBoard';
import './App.css';

function App() {
  // State to switch between the two required views
  const [view, setView] = useState('calendar');

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#242424', color: 'white' }}>
        <h1>GearGuard ERP System</h1>
        <nav>
          <button 
            onClick={() => setView('calendar')}
            style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
          >
            Calendar (Preventive)
          </button>
          <button 
            onClick={() => setView('kanban')}
            style={{ padding: '10px', cursor: 'pointer' }}
          >
            Kanban Board
          </button>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {view === 'calendar' ? (
          <div>
            <h2>Preventive Maintenance Schedule</h2>
            {/* Requirement: Display all Preventive maintenance requests  */}
            {/* Requirement: Allow users to click a date to schedule a new request [cite: 63] */}
            <MaintenanceCalendar />
          </div>
        ) : (
          <div>
            <h2>Maintenance Workflow</h2>
            {/* Requirement: Group by Stages (New | In Progress | Repaired | Scrap) [cite: 55] */}
            <KanbanBoard />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;