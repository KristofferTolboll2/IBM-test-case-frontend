import React, { ReactElement, RefObject } from "react";
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { Button } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  columnKey: string;
  draggableProps: DraggableProvidedDraggableProps;
  isDragging: boolean;
  title: string;
  content: string;
  asignee?: string;
  provided: DraggableProvided;
  id: string;
  deleteTaskHandler: (columnKey: string, taskId: string) => void;
}

export default function Card({
  title,
  columnKey,
  id,
  asignee,
  content,
  isDragging,
  draggableProps,
  provided,
  deleteTaskHandler,
}: Props): ReactElement {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: "none",
        padding: 16,
        margin: "0 0 8px 0",
        minHeight: "50px",
        backgroundColor: isDragging ? "#263B4A" : "#456C86",
        color: "white",
        ...draggableProps.style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          style={{
            width: "30%",
            float: "right",
            margin: "1rem",
            padding: "10px",
            color: "white",
          }}
          onClick={() => deleteTaskHandler(columnKey, id)}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          style={{
            width: "30%",
            float: "right",
            margin: "1rem",
            padding: "10px",
            color: "white",
          }}
        >
          Edit
        </Button>
      </div>
      <h3>{title}</h3>
      <p style={{ fontSize: "14px" }}>{content}</p>
      to bo completed by <i>{asignee}</i>
    </div>
  );
}
