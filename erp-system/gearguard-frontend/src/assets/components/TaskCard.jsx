import React from "react";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { FaUserCircle, FaExclamationTriangle, FaClock } from "react-icons/fa";
import { format, isPast, parseISO } from "date-fns";

// const Card = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 16px;
//   margin-bottom: 12px;
//   box-shadow: ${(props) => (props.$isDragging ? "0 10px 20px rgba(0,0,0,0.15)" : "0 2px 5px rgba(0,0,0,0.05)")};
//   border: 1px solid #e0e0e0;
//   transition: box-shadow 0.2s ease;
//   border-left: ${(props) => (props.$isOverdue ? "4px solid #ff4d4f" : "4px solid transparent")};

//   &:hover {
//     box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//   }
// `;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  
  /* Delightful Shadow: Soft and diffused */
  box-shadow: ${(props) => 
    props.$isDragging 
      ? "0 10px 20px rgba(0,0,0,0.1)" 
      : "0 1px 3px rgba(0,0,0,0.05)"};
      
  border: 1px solid #f0f0f0; /* Very subtle border */
  transition: all 0.2s ease;
  
  /* Overdue indicator (left border) */
  border-left: ${(props) => (props.$isOverdue ? "4px solid #ff4d4f" : "1px solid #f0f0f0")};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08); /* Lift effect on hover */
    transform: translateY(-2px);
  }
`;


const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 12px;
  color: #666;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f0f2f5;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 500;
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.$isOverdue ? "#d32f2f" : "#666")};
  font-weight: ${(props) => (props.$isOverdue ? "bold" : "normal")};
`;

const Task = ({ task, index }) => {
  const isOverdue = isPast(parseISO(task.date));

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
          $isOverdue={isOverdue}
        >
          <CardHeader>
            {task.subject}
            {isOverdue && <FaExclamationTriangle color="#ff4d4f" title="Overdue" />}
          </CardHeader>
          
          <div style={{ fontSize: "12px", color: "#888" }}>ID: {task.id}</div>

          <CardMeta>
            <Badge>
              <FaUserCircle size={14} color="#007bff" />
              {task.technician}
            </Badge>

            <DateBadge $isOverdue={isOverdue}>
              <FaClock size={12} />
              {format(parseISO(task.date), "MMM d")}
            </DateBadge>
          </CardMeta>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;