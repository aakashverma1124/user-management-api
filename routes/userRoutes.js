const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/users', (req, res) => {
  const { name, email, department_name, salary, position, hire_date } = req.body;
  const query = 'INSERT INTO users (name, email, department_name, salary, position, hire_date) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, email, department_name, salary, position, hire_date];

  db.query(query, values, (err) => {
    if (err) res.status(500).json(err);
    else res.status(201).json({ message: 'User created' });
  });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) res.status(500).json(err);
    else if (results.length === 0) res.status(404).json({ message: 'User not found' });
    else res.status(200).json(results[0]);
  });
});

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(results);
  });
});

router.put('/users/:id', (req, res) => {
  const { name, email, department_name, salary, position, hire_date } = req.body;
  const { id } = req.params;
  const query = `
    UPDATE users SET 
      name = ?, 
      email = ?, 
      department_name = ?, 
      salary = ?, 
      position = ?, 
      hire_date = ? 
    WHERE id = ?`;
  const values = [name, email, department_name, salary, position, hire_date, id];

  db.query(query, values, (err) => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ message: 'User updated' });
  });
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ message: 'User deleted' });
  });
});

module.exports = router;
