const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ userName, password }) => {
  const query = {
    userName,
    password,
  };
  const db = await connection();
  await db.collection('users').insertOne(query);
  return 'user created successfully';
};

const getByName = async (userName) => {
  const findUser = { userName };
  const db = await connection();
  const user = await db.collection('users').findOne(findUser);
  return user;
};

module.exports = {
  create,
  getByName,
};

