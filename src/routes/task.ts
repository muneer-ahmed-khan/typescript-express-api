import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Task } from "../models/task";

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

const API_PREFIX = "/api/task";

// get all tasks
router.get(API_PREFIX + "/", (req: Request, res: Response) => {
  res.json(tasks);
});

// get a specific task with id
router.get(API_PREFIX + "/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    res.status(404).send("Task not found");
  } else {
    res.json(task);
  }
});
// create a task route
router.post(
  API_PREFIX + "/",
  taskValidationRules,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task: Task = {
      id: tasks.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };

    tasks.push(task);

    res.status(201).json(task);
  }
);

// update a specific task with id
router.put(
  API_PREFIX + "/:id",
  taskValidationRules,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
      res.status(404).send("Task not found");
    } else {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed || task.completed;

      res.json(task);
    }
  }
);

// delete a specific task with id
router.delete(API_PREFIX + "/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  console.log(index);

  if (index === -1) {
    res.status(404).send("Task not found");
  } else {
    tasks.splice(index, 1);
    res.status(204).send("done");
  }
});

export default router;
