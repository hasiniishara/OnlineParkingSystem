import { Router } from 'express';
import { createParkingSlot,getAllParkingSlots, bookParkingSlot } from '../controller/parkingController';
import { checkRoles }  from '../middleware/checkRole';
const passport = require('passport');

const router = Router();

router.post('/createParkingSlot', passport.authenticate("jwt", { session: false }), checkRoles(["Admin"]) as any, createParkingSlot);

router.get("/viewAll", passport.authenticate("jwt", { session: false }), getAllParkingSlots);

router.patch("/:id", passport.authenticate("jwt", { session: false }), bookParkingSlot);

export default router;