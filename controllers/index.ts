import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { serializeTask, serializeTaskList } from "../utilities";

// PRISMA CLIENT
const prisma = new PrismaClient();

// API ROUTE CONTROLLERS
export async function getAllTasks(req: Request, res: Response) {
  const todos = await prisma.todo.findMany();
  res.json(serializeTaskList(todos));
}

export async function addTask(req: Request, res: Response) {
  try {
    const data = req.body;

    if (!data.title || !data.color) {
      res.status(400).json({ message: "'title' and 'color' are required" });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: {
        title: data.title,
        color: data.color,
      },
    });

    res.status(201).json(serializeTask(newTodo));
  } catch (err) {
    console.log("ERROR", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: String(err) });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "'id' must be a number" });
      return;
    }

    console.log("data", data);
    if (!data.title || !data.color || data.completed === undefined) {
      res
        .status(400)
        .json({ message: "'title', 'color' and 'completed' are required" });
      return;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data,
    });
    res.json(serializeTask(updatedTodo));
  } catch (err) {
    console.log("ERROR", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: String(err) });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "'id' must be a number" });
      return;
    }

    await prisma.todo.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log("ERROR", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: String(err) });
  }
}
