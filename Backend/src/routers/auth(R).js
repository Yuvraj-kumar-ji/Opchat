import express from 'express';

const router = express.Router();

router.get('/Register', (req, res) => {
    res.send('Register API endpoint');
});

router.get('/Login', (req, res) => {
    res.send('Login API endpoint');
});

router.get('/Logout', (req, res) => {
    res.send('Logout API endpoint');
});

export default router;