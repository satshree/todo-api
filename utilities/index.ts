import moment from "moment";

export function convertDateToTimestamp(date: string) {
  return parseInt(moment(date).format("X"));
}

export function serializeTask(data: any) {
  return {
    id: data["id"],
    title: data["title"],
    color: data["color"],
    completed: data["completed"],
    timestamp: convertDateToTimestamp(data["timestamp"]),
  };
}

export function serializeTaskList(data: any[]) {
  return data.map((d) => serializeTask(d));
}
