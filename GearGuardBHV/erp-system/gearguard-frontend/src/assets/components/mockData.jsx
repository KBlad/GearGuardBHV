export const initialData = {
  tasks: {
    "task-1": { id: "task-1", subject: "Leaking Oil", technician: "Alice", date: "2023-10-25", priority: "High" },
    "task-2": { id: "task-2", subject: "Screen Flicker", technician: "Bob", date: "2025-12-30", priority: "Low" },
    "task-3": { id: "task-3", subject: "Overheating", technician: "Charlie", date: "2023-11-01", priority: "Critical" },
    "task-4": { id: "task-4", subject: "Calibration", technician: "Alice", date: "2025-12-28", priority: "Medium" },
  },
  columns: {
    "col-1": { id: "col-1", title: "New", taskIds: ["task-1", "task-2"] },
    "col-2": { id: "col-2", title: "In Progress", taskIds: ["task-3"] },
    "col-3": { id: "col-3", title: "Repaired", taskIds: ["task-4"] },
    "col-4": { id: "col-4", title: "Scrap", taskIds: [] },
  },
  columnOrder: ["col-1", "col-2", "col-3", "col-4"],
};