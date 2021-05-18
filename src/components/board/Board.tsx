import React, { ReactElement, useEffect, useState } from "react";
import { columnsFromBackend, TaskState, TypeTaskState } from "./data/data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import NewTask, { Task } from "./NewTask";
import { Button } from "@material-ui/core";
import { getTasks } from "../../api/tasks";
interface Props {}

export default function Board({}: Props): ReactElement {
  const [columns, setColumns] = useState(columnsFromBackend);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    (async () => {
      const tasks = getTasks();
      console.log(tasks);
    })();
  }, []);

  const onDragEnd = (
    result: any,
    columns: any,
    setColumns: (data: any) => void
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source);
    console.log(destination);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const deleteTaskHandler = (columnKey: string, taskId: string) => {
    const copiedColumns = { ...columns };
    const foundColumn = copiedColumns[columnKey];
    foundColumn.items = foundColumn.items.filter((item) => {
      return item.id !== taskId;
    });
    copiedColumns[columnKey] = foundColumn;
    console.log(copiedColumns);
    alert("Task with id " + taskId + "deleted");
    setColumns(copiedColumns);
  };

  console.log(columns);

  const updateTaskHandler = (
    taskId: string,
    title: string,
    content: string,
    asignee: string,
    status?: TypeTaskState
  ) => {
    const parsedStatus: TypeTaskState =
      status !== undefined ? status : "Requested";
    const numericIndex = TaskState.indexOf(parsedStatus);
    const copiedColumns = { ...columns };
    const selectedColumn = Object.entries(copiedColumns)[numericIndex];
    selectedColumn[1].items.findIndex((item) => item.id === taskId);
    setColumns(copiedColumns);
    setShowEditModal(false);
  };

  const addNewTaskHandler = (
    title: string,
    content: string,
    asignee: string,
    status?: TypeTaskState
  ) => {
    const parsedStatus: TypeTaskState =
      status !== undefined ? status : "Requested";
    const numericIndex = TaskState.indexOf(parsedStatus);
    const copiedColumns = { ...columns };
    const newTask: Task = {
      id: uuid(),
      title,
      content,
      asignee,
      status: parsedStatus,
    };

    const selectedColumn = Object.entries(copiedColumns)[numericIndex];
    console.log(numericIndex);
    console.log(selectedColumn);

    selectedColumn[1].items.push(newTask);
    setColumns(copiedColumns);
    setShowCreateModal(false);
    return;
  };

  return (
    <>
      <NewTask
        isOpen={showCreateModal}
        close={() => setShowCreateModal(false)}
        addTask={addNewTaskHandler}
      />
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          size="large"
          color="primary"
          variant="outlined"
          onClick={() => setShowCreateModal(!showCreateModal)}
        >
          Create new task
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId + index}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Card
                                      id={item.id}
                                      columnKey={columnId}
                                      title={item.title}
                                      provided={provided}
                                      draggableProps={provided.draggableProps}
                                      isDragging={snapshot.isDragging}
                                      content={item.content}
                                      asignee={item.asignee}
                                      deleteTaskHandler={deleteTaskHandler}
                                    />
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}
