import { v4 as uuid } from "uuid";
import { Task } from "../NewTask";

export const TaskState = ["Requested", "To Do", "In Progress", "Done"];
export type TypeTaskState = typeof TaskState[number];

export const itemsFromBackend: Task[] = [
  {
    id: uuid(),
    title: "First Task",
    content: "First task",
    asignee: "Sam",
    status: "Requested",
  },
  {
    id: uuid(),
    title: "First Task",
    content: "Second task",
    asignee: "Sam",
    status: "Requested",
  },
  {
    id: uuid(),
    title: "First Task",
    content: "Third task",
    asignee: "Bertra",
    status: "Requested",
  },
  {
    id: uuid(),
    title: "First Task",
    content: "Fourth task",
    asignee: "Bertra",
    status: "Requested",
  },
  {
    id: uuid(),
    title: "First Task",
    content: "Fifth task",
    asignee: "Bertra",
    status: "Requested",
  },
];

export const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};
