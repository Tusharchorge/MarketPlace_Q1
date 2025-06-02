// API to add item to MyStore and optionally publish to marketplace

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

router.post('/add-item', async (req, res) => {
  const { id, user_id, item_name, category, price, quantity, is_published } = req.body;
    try {
         
        const [result] = await pool.query('INSERT INTO my_store_items (id, user_id, item_name, category, price, quantity) VALUES (?, ?, ?, ?, ?, ?)', 
        [id, user_id, item_name, category, price, quantity,is_published]);
       res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });

    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;
