import { Router } from 'express';
import { register, login, employeeProfile, verifyToken } from '../controller/authController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/:id', employeeProfile);

router.get('/verifyToken', verifyToken);

export default router;
