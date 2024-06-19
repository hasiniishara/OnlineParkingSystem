import { Router } from 'express';
import { register, login, employeeProfile, updateEmployee, verifyToken } from '../controller/authController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/:id', employeeProfile);

router.patch('/:id', updateEmployee);

router.get('/verifyToken', verifyToken);

export default router;
