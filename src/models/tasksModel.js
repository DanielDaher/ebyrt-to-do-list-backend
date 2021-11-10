const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async (userId) => {
  const query = { userId: ObjectId(userId) };
  const db = await connection();
  const tasks = await db.collection('tasks').find(query).toArray();
  return tasks;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const tasks = await db.collection('tasks').findOne(ObjectId(id));
  return tasks;
};

const create = async ({ task, status, createdAt, userId }) => {
  const query = {
    task,
    status,
    createdAt,
    userId,
  };

  const db = await connection();
  await db.collection('tasks').insertOne(query);
  return 'task inserted successfully';
};

const updateTaskById = async ({ task, status, id }) => {
  const findTask = { _id: ObjectId(id) };
  const query = { $set: { task, status } };

  const db = await connection();
  const updateInfos = db.collection('tasks').findOneAndUpdate(findTask, query, { returnNewDocument: true });
  return updateInfos;
};

const removeTaskById = async (id) => {
  const db = await connection();
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  return 'task deleted succesfully'; 
};

module.exports = {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};