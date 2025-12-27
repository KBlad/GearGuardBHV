// import React  from 'react'
// import { Droppable } from "@hello-pangea/dnd";
// import styled from "styled-components";

// const Container = styled.div`
//     background-color: #f4f5f7;
//     border-radius: 2.5px;
//     width: 300px;
//     height: 475px;
//     overflow-y: scroll;
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//     border: 1px solid gray;
// `;

// const Title = styled.h3`
//   padding: 8px;
//   background-color: pink;
//   text-align: center;
// `;

// const TaskList = styled.div`
//       padding: 3px;
//       transition: background-color 0.2 ease;
//       background-color: f4f5f7;
//       flex-grow: 1;
//       min-height: 100px;
// `;

// export default function Column() {
//     return <div>
//         <Title
//             style={{
//                 backgroundColor: "lightblue",
//                 position: "sticky",
//             }}></Title>
//     </div>
// }
import React from "react";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./TaskCard.jsx"; // Importing from the same folder

// const ColumnContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 12px;
//   width: 300px;
//   min-width: 300px;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//   border-top: 5px solid ${(props) => props.$color};
// `;

// const Title = styled.h3`
//   padding: 16px;
//   margin: 0;
//   font-size: 16px;
//   font-weight: 600;
//   color: #333;
//   border-bottom: 1px solid #eee;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const TaskList = styled.div`
//   padding: 16px;
//   flex-grow: 1;
//   min-height: 150px;
//   background-color: ${(props) => (props.$isDraggingOver ? "#f9f9f9" : "white")};
//   transition: background-color 0.2s ease;
// `;

const ColumnContainer = styled.div`
  background-color: #f8f9fa; /* Very subtle grey, almost white */
  border-radius: 12px;
  width: 320px; /* Slightly wider for better look */
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 8px; /* Inner padding for the cards */
  border: 1px solid #eef0f2; /* Soft border instead of heavy shadow */
  
  /* The colored top bar */
  border-top: 4px solid ${(props) => props.$color};
`;

const Title = styled.h3`
  padding: 12px 8px;
  margin: 0 0 10px 0;
  font-size: 15px;
  font-weight: 600;
  color: #444; /* Softer black */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList = styled.div`
  flex-grow: 1;
  min-height: 100px;
  /* Remove background color transition to keep it clean */
  background-color: transparent; 
`;

const COLUMN_COLORS = {
  "New": "#3498db",
  "In Progress": "#f39c12",
  "Repaired": "#2ecc71",
  "Scrap": "#e74c3c"
};

const Column = ({ column, tasks }) => {
  return (
    <ColumnContainer $color={COLUMN_COLORS[column.title] || "#ccc"}>
      <Title>
        {column.title}
        <span style={{ fontSize: "12px", background: "#eee", padding: "2px 8px", borderRadius: "10px" }}>
          {tasks.length}
        </span>
      </Title>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;