const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/add-item', async (req, res) => {
  const { user_id, item_name, category, price, quantity, is_published } = req.body;

  
  if (!user_id || !item_name || !category || !price || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO store_items (user_id, item_name, category, price, quantity, is_published) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, item_name, category, price, quantity, is_published]
    );

    res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
