import { Router } from 'express';
import { createParkingSlot } from '../controller/parkingController';
import { checkRoles }  from '../middleware/checkRole';
const passport = require('passport');

const router = Router();

router.post('/createParkingSlot', passport.authenticate("jwt", { session: false }), checkRoles(["Admin"]) as any, createParkingSlot);

export default router;