import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface FetchParkingSlotsHook {
  viewSlots: () => Promise<void>;
  error: string;
  success: string;
  slots: ParkingSlots[]; 
}

interface ParkingSlots {
  _id: string;
  location: string;
  isOccupied: string;
  vehicleNumber: string;
  reservedBy: string,
}

export default function useFetchParkingSlots(): FetchParkingSlotsHook {
  const [slots, setSlots] = useState<ParkingSlots[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const viewSlots = async (): Promise<void> => {

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch('http://localhost:3000/api/parking/viewAll', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data[0]._id);

      if (response.ok) {
        setSlots(data);
        setSuccess("Parking slots fetched successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to fetch parking slots");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch parking slots");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error(err);
    }
  };

  return { slots, viewSlots, error, success };
}
