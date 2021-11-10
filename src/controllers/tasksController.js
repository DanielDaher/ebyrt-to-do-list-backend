const tasksService = require('../services/tasksService');

const getAll = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const tasks = await tasksService.getAll(userId);

    res.status(tasks.statusCode).json(tasks.responseMessage);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const getById = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const task = await tasksService.getById(id);

    res.status(task.statusCode).json(task.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const create = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { task, status } = req.body;
    const insert = await tasksService.create({ task, status, userId });
  
    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, status } = req.body;
    const updateInfos = await tasksService.updateTaskById({ task, status, id });

    res.status(updateInfos.statusCode).json(updateInfos.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const removeTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const removeTask = await tasksService.removeTaskById(id);

    res.status(removeTask.statusCode).json(removeTask.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};