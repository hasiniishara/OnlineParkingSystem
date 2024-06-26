import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookParkingSlotHook {
  bookSlot: (slotId: string, vehicleNumber: string, reservedBy: string, reservationDate: string, reservationTime: string) => Promise<void>;
  error: string;
  success: string;
  loading: boolean;
}

export default function useBookParkingSlot(): BookParkingSlotHook {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const bookSlot = async (slotId: string, vehicleNumber: string, reservedBy: string, reservationDate: string, reservationTime: string): Promise<void> => {

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
        setLoading(false);
      }

      console.log(slotId);
      const response = await fetch(`http://localhost:3000/api/parking/${slotId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isOccupied: true, vehicleNumber, reservedBy, reservationDate, reservationTime }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess("Parking slot booked successfully!");
        
      } else {
        throw new Error(data.message || "Failed to book parking slot");
      }
    } catch (err: any) {
      setError(err.message || "Failed to book parking slot");
      setLoading(false);
    }
  };

  return { bookSlot, loading ,error, success };
}
