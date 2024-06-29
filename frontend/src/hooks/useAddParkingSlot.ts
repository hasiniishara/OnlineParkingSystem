import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AddParkingSlotHook {
  loading: boolean;
  success: string;
  error: string;
  addParkingSlot: (location: string)=> Promise<void>;
}

export default function useAddParkingSlot(): AddParkingSlotHook {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addParkingSlot = async (location: string) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token) {
        throw new Error("User is not authenticated");
    }

    try {
      const response = await fetch('https://onlineparkingsystem.onrender.com/api/parking/createParkingSlot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error('Failed to add parking slot.');
      }

      setSuccess('Parking slot added successfully!');
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError('Failed to add parking slot.');
      setLoading(false);
    }
  };

  return { addParkingSlot, loading, error, success };
};