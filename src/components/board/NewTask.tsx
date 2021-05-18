import {
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState, ReactElement } from "react";
import { TaskState } from "./data/data";

interface Props {
  isOpen: boolean;
  close: () => void;
  addTask: (
    title: string,
    content: string,
    asignee: string,
    updateId?: string
  ) => void;
}

export interface Task extends Data {
  id: string;
}

export interface Data {
  title: string;
  content: string;
  asignee: string;
  status?: typeof TaskState[number];
}

export default function NewTask({
  isOpen,
  close,
  addTask,
}: Props): ReactElement {
  const [task, setTask] = useState<Task>({
    id: "",
    content: "",
    title: "",
    status: "Requested",
    asignee: "",
  });

  const setTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      keepMounted
      style={{ padding: "30px" }}
    >
      <DialogTitle>Add new Story</DialogTitle>
      <DialogContentText>Fill in the forms to add a new task</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Title"
        name="title"
        type="text"
        fullWidth
        value={task.title}
        onChange={setTaskHandler}
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Content"
        name="content"
        type="text"
        fullWidth
        value={task.content}
        onChange={setTaskHandler}
      />
      <Button onClick={() => addTask(task.title, task.content, task.asignee)}>
        Submit
      </Button>
    </Dialog>
  );
}
