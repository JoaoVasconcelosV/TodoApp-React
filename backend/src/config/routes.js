const express = require('express');
const todo = require('../api/todo/todo');

module.exports = (server) => {
  
  const router = express.Router();
  server.use('/api', router);

  const todoService = require('../api/todo/todoService');
  todoService.register(router, '/todos');
}