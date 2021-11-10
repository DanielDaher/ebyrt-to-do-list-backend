const usersModel = require('../models/usersModel');

const validateReqBody = ({ task, status }) => {
  if (typeof task !== 'string' || task.length < 1) return null;
  if (typeof status !== 'string' || status.length < 1) return null;

  return true;
};

const validatePassword = (password) => {
  if (password.length < 3) return null;

  return true;
};

const validateUserName = async (userName) => {
  const userNameExists = await usersModel.getByName(userName);
  if (userNameExists) return true;

  return null;
};

module.exports = {
  validateReqBody,
  validatePassword,
  validateUserName,
};
