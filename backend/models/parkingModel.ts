import mongoose, { Document } from 'mongoose';


//define parking slot data type
export interface ParkingSlotDocument extends Document {
    location: string;
    isOccupied: boolean;
    vehicleNumber?: string;
    parkedAt?: Date;
    reservedBy?: string;
}

//create parking slots
const parkingSlotSchema = new mongoose.Schema<ParkingSlotDocument>(
  {
    location: { type: String, required: true },
    isOccupied: { type: Boolean, required: true, default: false },
    vehicleNumber: { type: String, default: '' },
    parkedAt: { type: Date },
    reservedBy: { type: String, default: '',ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<ParkingSlotDocument>('ParkingSlot', parkingSlotSchema);
