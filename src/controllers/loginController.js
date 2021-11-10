const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

   const secret = 'seusecretdetoken';

   const validateInputFields = (userName, password) => {
    if (!userName || !password) return true;
    return false;
  };
  
  const validateLogin = (user, password) => {
    if (!user || user.password !== password) return true;
    return false;
  };

const makeSingature = async (req, res) => {
  try {
  const { userName, password } = req.body;

  if (validateInputFields(userName, password)) { 
    return res.status(401).json({ message: 'All fields must be filled' }); 
  }

  const user = await usersModel.getByName(userName);

  if (validateLogin(user, password)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  makeSingature,
};