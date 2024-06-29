import { Router } from 'express';
import { createParkingSlot,getAllParkingSlots, bookParkingSlot, deleteSlot } from '../controller/parkingController';
import { checkRoles }  from '../middleware/checkRole';
const passport = require('passport');

const router = Router();

router.post('/createParkingSlot', passport.authenticate("jwt", { session: false }), checkRoles(["Admin"]) as any, createParkingSlot);

router.get("/viewAll", passport.authenticate("jwt", { session: false }), getAllParkingSlots);

router.patch("/:id", passport.authenticate("jwt", { session: false }), bookParkingSlot);

router.delete('/:id', passport.authenticate("jwt", { session: false }), checkRoles(["Admin"]) as any, deleteSlot);

export default router;