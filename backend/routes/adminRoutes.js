const Users = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find(
            { verified: true },
            { password: 0 }
        );
      
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

router.get('/unverified-users', async (req, res) => {
    try {
        const unverifiedUsers = await Users.find(
            { verified: false },
            { password: 0 }
        );
        
        res.status(200).json(unverifiedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve unverified users.' });
    }
});

module.exports = router;