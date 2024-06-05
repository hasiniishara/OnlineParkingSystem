import { Router } from 'express';
import { register, login, verifyToken } from '../controller/authController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verifyToken', verifyToken);

export default router;
