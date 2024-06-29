import { useState } from "react";

interface DeleteParkingSlotHook {
  deleteSlot: (slotId: string) => Promise<void>;
  error: string;
  success: string;
  deleteLoading: boolean;
}

export default function useDeleteSlot(): DeleteParkingSlotHook {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteLoading, setLoading] = useState(false);
  

  const deleteSlot = async (slotId: string): Promise<void> => {

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
      const response = await fetch(`https://onlineparkingsystem.onrender.com/api/parking/${slotId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess("Parking slot deleted successfully!");
        
      } else {
        throw new Error(data.message || "Failed to delete parking slot");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete parking slot");
      setLoading(false);
    }
  };

  return { deleteSlot, deleteLoading ,error, success };
}
