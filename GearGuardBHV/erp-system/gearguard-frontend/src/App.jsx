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

// import React, { useState } from 'react';
// // Updated imports based on your file structure
// import MaintenanceCalendar from './assets/components/MaintenanceCalendar.jsx';
// import KanbanBoard from './assets/components/KanbanBoard.jsx';

// function App() {
//   const [view, setView] = useState('kanban'); // Default to Kanban for easier testing

//   // -- Styles for the "Delightful" Header --
//   const headerStyle = {
//     padding: '0 40px',
//     height: '70px',
//     backgroundColor: '#ffffff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottom: '1px solid #eef0f2',
//     position: 'sticky',
//     top: 0,
//     zIndex: 100,
//   };

//   const brandStyle = {
//     fontSize: '20px',
//     fontWeight: '700',
//     color: '#1a1a1a',
//     letterSpacing: '-0.5px',
//   };

//   const navButtonStyle = (isActive) => ({
//     padding: '8px 16px',
//     marginLeft: '12px',
//     borderRadius: '6px',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//     // Logic: Active button is blue, inactive is grey/transparent
//     backgroundColor: isActive ? '#e6f7ff' : 'transparent',
//     color: isActive ? '#007bff' : '#555',
//   });

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
//       {/* 1. The Clean White Header */}
//       <header style={headerStyle}>
//         <div style={brandStyle}>GearGuard</div>
//         <nav>
//           <button 
//             onClick={() => setView('calendar')}
//             style={navButtonStyle(view === 'calendar')}
//           >
//             Calendar
//           </button>
//           <button 
//             onClick={() => setView('kanban')}
//             style={navButtonStyle(view === 'kanban')}
//           >
//             Kanban Board
//           </button>
//         </nav>
//       </header>

//       {/* 2. Main Content Area */}
//       <main>
//         {view === 'calendar' ? (
//           <div style={{ padding: '40px' }}>
//             <h2 style={{ marginBottom: '20px', fontWeight: '600', color: '#333' }}>
//               Preventive Schedule
//             </h2>
//             <MaintenanceCalendar />
//           </div>
//         ) : (
//           <div>
//             {/* The KanbanBoard already handles its own padding/layout */}
//             <KanbanBoard />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch } from 'react-icons/fa'; // Import Icons
import MaintenanceCalendar from './assets/components/MaintenanceCalendar.jsx';
import KanbanBoard from './assets/components/KanbanBoard.jsx';
import Modal from './assets/components/Modal.jsx'; // Import your new Modal


function App() {
  const [view, setView] = useState('kanban');

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        // Make sure your Spring Boot backend is running on port 8080
        const response = await fetch(`http://localhost:8080/api/requests/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    }
  };
  
  // -- State for Modals --
  const [isAddOpen, setAddOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  // -- Styles --
  const headerStyle = {
    padding: '0 40px',
    height: '80px', // Slightly taller for better spacing
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eef0f2',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const actionButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <header style={headerStyle}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a' }}>GearGuard</div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          {/* View Switchers */}
          <nav style={{ background: '#f5f5f5', padding: '5px', borderRadius: '8px', display: 'flex' }}>
            <button 
              onClick={() => setView('calendar')}
              style={{ 
                padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                background: view === 'calendar' ? 'white' : 'transparent',
                color: view === 'calendar' ? '#007bff' : '#666',
                boxShadow: view === 'calendar' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                fontWeight: '600'
              }}
            >
              Calendar
            </button>
            <button 
              onClick={() => setView('kanban')}
              style={{ 
                padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                background: view === 'kanban' ? 'white' : 'transparent',
                color: view === 'kanban' ? '#007bff' : '#666',
                boxShadow: view === 'kanban' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                fontWeight: '600'
              }}
            >
              Board
            </button>
          </nav>

          <div style={{ width: '1px', background: '#e0e0e0', margin: '0 10px' }}></div>

          {/* ACTION BUTTONS (Search & Add) */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(true)}
            style={{ ...actionButtonStyle, background: '#f0f2f5', color: '#555' }}
          >
            <FaSearch /> Search
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddOpen(true)}
            style={{ ...actionButtonStyle, background: '#007bff', color: 'white', boxShadow: '0 4px 12px rgba(0,123,255,0.3)' }}
          >
            <FaPlus /> New Request
          </motion.button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ position: 'relative' }}>
        <AnimatePresence mode='wait'> 
          {view === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '40px' }}
            >
              <MaintenanceCalendar />
            </motion.div>
          ) : (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <KanbanBoard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- MODALS --- */}

      {/* 1. ADD REQUEST MODAL */}
      <Modal isOpen={isAddOpen} onClose={() => setAddOpen(false)} title="Create New Request">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Subject</label>
            <input type="text" placeholder="e.g. Broken Printer" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Equipment</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                  <option>CNC Machine 01</option>
                  <option>Office Printer</option>
                </select>
             </div>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Priority</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                  <option>Low</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
             </div>
          </div>
          <button type="button" style={{ marginTop: '10px', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Request
          </button>
        </form>
      </Modal>

      {/* 2. SEARCH MODAL */}
      {/* <Modal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} title="Search Database">
        <div style={{ position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
          <input 
            type="text" 
            placeholder="Search by ID, Machine, or Technician..." 
            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px' }} 
            autoFocus
          />
        </div>
        <div style={{ marginTop: '20px', color: '#666', fontSize: '14px', textAlign: 'center' }}>
          Press Enter to search...
        </div>
      </Modal> */}
      {/* 2. SEARCH MODAL */}
<Modal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} title="Search Database">
  <div style={{ position: 'relative' }}>
    <FaSearch style={{ position: 'absolute', left: '12px', top: '14px', color: '#999' }} />
    <input 
      type="text" 
      placeholder="Search by ID, Machine, or Technician..." 
      
      // -- NEW: Connect input to state --
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleSearch}
      
      style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '6px',boxSizing: 'border-box', border: '1px solid #ddd', fontSize: '16px' }} 
      autoFocus
    />
  </div>

  {/* -- NEW: Results List -- */}
  <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
    {searchResults.length === 0 ? (
      <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
        {searchQuery ? "No results found" : "Press Enter to search..."}
      </div>
    ) : (
      searchResults.map((req) => (
        <div key={req.id} style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{req.subject}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>ID: {req.id}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', color: '#555' }}>{req.technicianName}</div>
            <div style={{ fontSize: '12px', color: req.status === 'Overdue' ? 'red' : 'green' }}>
              {req.status}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</Modal>

    </div>
  );
}

export default App;