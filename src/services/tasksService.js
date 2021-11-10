const tasksModel = require('../models/tasksModel');
const { validateReqBody } = require('./helpers');

const getAll = async (userId) => {
  const tasks = await tasksModel.getAll(userId);
  if (tasks.length < 1) return { statusCode: 200, responseMessage: 'this user has no tasks yet!' };

  return { statusCode: 200, responseMessage: tasks };
};

const getById = async (id) => {
  const task = await tasksModel.getById(id);
  if (!task) return { statusCode: 404, responseMessage: 'task not found!' };

  return { statusCode: 200, responseMessage: task };
};

const create = async ({ task, status, userId }) => {
  const responseMessage = `Invalid info. The fields 'task' and 'status' are required on this body requisition`;
  const validReqBody = validateReqBody({ task, status });

  if (!validReqBody) return { statusCode: 400, responseMessage };

  const insert = await tasksModel.create({ task, status, userId, createdAt: Date.now() });

  return { responseMessage: insert, statusCode: 201 };
};

const updateTaskById = async ({ task, status, id }) => {
  const responseMessage = `Invalid info. The fields 'task' and 'status' are required on this body requisition`;
  const validReqBody = validateReqBody({ task, status });
  const findTask = await tasksModel.getById(id);

  if (!findTask) return { statusCode: 404, responseMessage: 'task not found!' };
  if (!validReqBody) return { statusCode: 400, responseMessage };

  const updateInfos = await tasksModel.updateTaskById({ task, status, id });

  return { responseMessage: updateInfos.value, statusCode: 200 };
};

const removeTaskById = async (id) => {
  const responseMessage = `invalid id, task not found!`;
  const statusCode = 404;
  const findTask = await tasksModel.getById(id);

  if (!findTask) return { statusCode, responseMessage };

  const removeTask = await tasksModel.removeTaskById(id);

  return { responseMessage: removeTask, statusCode: 200 };
};

module.exports = {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};