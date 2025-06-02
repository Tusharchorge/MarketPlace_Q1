//API to fetch marketplace items with filters

const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

router.get('/marketplace-items', async (req, res) => {
    const { category,price } = req.query;
    try {
        let query = 'SELECT * FROM marketplace_items WHERE status = "active"';
        const params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (price) {
            query += ' AND price <= ?';
            params.push(price);
        }

        const [items] = await pool.query(query, params);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching marketplace items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});

module.exports = router;
