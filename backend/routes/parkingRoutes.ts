import { Router } from 'express';
import { createParkingSlot,getAllParkingSlots } from '../controller/parkingController';
import { checkRoles }  from '../middleware/checkRole';
const passport = require('passport');

const router = Router();

router.post('/createParkingSlot', passport.authenticate("jwt", { session: false }), checkRoles(["Admin"]) as any, createParkingSlot);

router.get("/viewAll", passport.authenticate("jwt", { session: false }), getAllParkingSlots);

export default router;