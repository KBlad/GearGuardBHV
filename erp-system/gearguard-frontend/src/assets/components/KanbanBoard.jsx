// import React, {useState} from "react";
// import {DragDropContext} from '@hello-pangea/dnd';

// export default function KanbanBoard()
// {
//     const [completed, setCompleted] = useState([]);
//     const [incomplete, setIncomplete] = useState([]);
//     return (
//         <DragDropContext>
//             <h2 style={{textAlign: "center"}}>PROGRESS BOARD</h2>

//             <div
//               style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   flexDirection: "row",
//               }}></div>
//         </DragDropContext>
//     )
// }

import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import styled from "styled-components";
import Column from "./Column.jsx";
import { initialData } from "./mockData.jsx"; // Importing from the same folder

// const BoardContainer = styled.div`
//   display: flex;
//   padding: 20px;
//   background-color: #f0f2f5;
//   min-height: 100vh;
//   gap: 20px;
//   overflow-x: auto;
//   align-items: flex-start;
// `;

const BoardContainer = styled.div`
  display: flex;
  padding: 40px; /* More breathing room */
  background-color: #ffffff; /* Pure white background */
  min-height: 100vh;
  gap: 24px;
  overflow-x: auto;
  align-items: flex-start;
  font-family: 'Inter', sans-serif; /* Cleaner font if avail, or inherits system */
`;

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // Case 1: Reordering within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      }));
      return;
    }

    // Case 2: Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));

    console.log(`Moved request ${draggableId} to ${finish.title}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </BoardContainer>
    </DragDropContext>
  );
}