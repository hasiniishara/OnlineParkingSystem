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