const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});


router.post("/", async (req, res) => {
  const board = new Board({ name: req.body.name });
  await board.save();
  res.status(201).json(board);
});


router.get("/:id/tasks", async (req, res) => {
  const tasks = await Task.find({ boardId: req.params.id });
  res.json(tasks);
});


router.post("/:id/tasks", async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.id });
  await task.save();
  res.status(201).json(task);
});

module.exports = router;