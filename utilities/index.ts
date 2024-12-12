import moment from "moment";

import { Task, TaskList } from "../models/types";

/**
 * Convert given date string into timestamp
 * @param date
 * @returns timestamp: `number`
 */
export function convertDateToTimestamp(date: string) {
  return Number(moment(date).format("X"));
}

/**
 * Serialize Task into JSON
 * @param data
 * @returns `Task`
 */
export function serializeTask(data: any): Task {
  return {
    id: data["id"],
    title: data["title"],
    color: data["color"],
    completed: data["completed"],
    timestamp: convertDateToTimestamp(data["timestamp"]),
  };
}

/**
 * Serialize list of Task into JSON
 * @param data
 * @returns `TaskList`
 */
export function serializeTaskList(data: any[]): TaskList {
  return data.map((d) => serializeTask(d));
}
