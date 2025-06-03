const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/items', async (req, res) => {
  const { category, min_price, max_price, is_published } = req.query;

  let query = 'SELECT * FROM store_items WHERE 1=1';
  const values = [];

  if (category) {
    query += ' AND category = ?';
    values.push(category);
  }

  if (min_price) {
    query += ' AND price >= ?';
    values.push(Number(min_price));
  }

  if (max_price) {
    query += ' AND price <= ?';
    values.push(Number(max_price));
  }

  if (is_published !== undefined) {
    query += ' AND is_published = ?';
    values.push(is_published === 'true' ? 1 : 0);
  }

  try {
    const [rows] = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
