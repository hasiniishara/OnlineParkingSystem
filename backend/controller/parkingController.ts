import { Request, Response } from 'express';
import ParkingSlot, { ParkingSlotDocument } from '../models/parkingModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const mongoose = require("mongoose");


//Create parking slots (admin only)
export const createParkingSlot = async (req: Request, res: Response) => {
    const { location, isOccupied, vehicleNumber, parkedAt, reservedBy } = req.body;
  
    try {
      const newParkingSlot = await ParkingSlot.create({
        location,
        isOccupied: isOccupied || false,
        vehicleNumber,
        parkedAt,
        reservedBy,
      });
      res.status(201).json(newParkingSlot);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  };

//Get all parking slots
export const getAllParkingSlots = async (req: Request, res: Response) => {
  try {
    const employees = await ParkingSlot.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

//Book a parking slot
export const bookParkingSlot = async (req, res) => {
  const { id } = req.params;
  const { isOccupied, vehicleNumber, reservedBy, reservationDate, reservationTime } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No booking slot with id: ${id}`);
  }

  if (!vehicleNumber || !reservedBy || !reservationDate || !reservationTime) {
    return res.status(400).json({ message: 'All fields are required' });
  } 
  try {

    const parkedAt = new Date(`${reservationDate}T${reservationTime}:00Z`);
    
    const updatedSlot = await ParkingSlot.findByIdAndUpdate(
      id,
      { isOccupied: true,
        vehicleNumber,
        reservedBy,
        parkedAt },
      { new: true }
    );
    res.status(200).json(updatedSlot);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSlot = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSlot = await ParkingSlot.findByIdAndDelete(id);
    if (!deletedSlot) {
      return res.status(404).json({ message: `No parking slot with id: ${id}` });
    }
    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
