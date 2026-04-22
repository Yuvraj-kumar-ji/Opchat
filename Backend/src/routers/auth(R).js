import express from 'express';
import { Register,Login,Logout,updateProfile,checkAuth } from '../controllers/auth(C).js';
import { protectedRoute } from '../middlewares/authcheck(Mw).js';
import { limiter } from '../middlewares/ERL(Mw).js';

const router = express.Router();

router.use(limiter);

router.post('/Register', Register);

router.post('/Login', Login);

router.post('/Logout', Logout);

router.get('/check', protectedRoute, checkAuth);

router.put('/updateProfile',protectedRoute, updateProfile);

export default router;