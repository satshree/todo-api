import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Fuse from "fuse.js";

import { serializeTask, serializeTaskList } from "../utilities";

// PRISMA CLIENT
const prisma = new PrismaClient();

// API ROUTE CONTROLLERS

/**
 * API Controller that returns list of all tasks
 * @param req
 * @param res
 */
export async function getAllTasks(req: Request, res: Response) {
  const options = {
    includeScore: true,
    keys: ["title"],
  };

  const todos = (await prisma.todo.findMany()).sort((p, n) => {
    if (p.level < n.level) {
      return 1;
    } else if (p.level > n.level) {
      return -1;
    }

    return 0;
  });

  const q = req.query.q;

  if (!q) {
    res.json(serializeTaskList(todos));
  } else {
    const fuse = new Fuse(todos, options);
    const result = fuse.search(q.toString());

    res.json(serializeTaskList(result.map((newList) => newList.item)));
  }
}

/**
 * API Controller that adds task to the database
 * @param req
 * @param res
 * @returns
 */
export async function addTask(req: Request, res: Response) {
  try {
    const data = req.body;

    console.log("Data", data);

    if (!data.title || !data.color) {
      res.status(400).json({ message: "'title' and 'color' are required" });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: {
        title: data.title,
        color: data.color,
        level: data.level,
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

/**
 * API Controller that updates the given task. ID must be provided through URL parameter.
 * @param req
 * @param res
 * @returns
 */
export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "'id' must be a number" });
      return;
    }

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

/**
 * API Controller that deletes the given task. ID must be provided through URL parameter.
 * @param req
 * @param res
 * @returns
 */
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
