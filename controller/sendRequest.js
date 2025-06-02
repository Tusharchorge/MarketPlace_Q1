
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/send-request', async (req, res) => {
    const { sender_user_id, receiver_user_id, item_id } = req.body;
    
    if (!sender_user_id || !receiver_user_id || !item_id) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    try {
        
        const [item] = await pool.query('SELECT * FROM marketplace_items WHERE id = ? AND status = "active"', [item_id]);
        
        if (item.length === 0) {
        return res.status(404).json({ error: 'Item not found or not active.' });
        }
    
         
        const [result] = await pool.query(
        'INSERT INTO marketplace_connect_requests (sender_user_id, receiver_user_id, item_id, status) VALUES (?, ?, ?, ?)',
        [sender_user_id, receiver_user_id, item_id, 'pending']
        );
    
        res.status(201).json({ message: 'Connect request sent successfully', requestId: result.insertId });
    } catch (error) {
        console.error('Error sending connect request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
);
module.exports = router;