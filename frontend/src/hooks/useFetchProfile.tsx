import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface UserProfileHook {
  viewUser: () => Promise<void>;
  updateUser: (updatedProfile: UpdateUserProfile) => Promise<void>;
  error: string;
  success: string;
  profile: UserProfile | null; 
}

interface DecodedToken {
  id: string;
  username: string;
  roles: string[];
  exp: number;
  iat: number;
}

interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

interface UpdateUserProfile {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export default function useFetchProfile(): UserProfileHook {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const viewUser = async (): Promise<void> => {
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const decoded: DecodedToken = jwtDecode(token);

      const response = await fetch(`https://onlineparkingsystem.onrender.com/api/auth/${decoded.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const userData: UserProfile = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
        };

        setProfile(userData);
        setSuccess("User profile fetched successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to fetch user profile");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch user profile");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error(err);
    }
  };


  const updateUser = async (updatedProfile: UpdateUserProfile) => {
    setError("");
    setSuccess("");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const decoded: DecodedToken = jwtDecode(token);

    const response = await fetch(`http://localhost:3000/api/auth/${decoded.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure content type is specified
      },
      body: JSON.stringify(updatedProfile),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      const userData: UserProfile = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
      };

      setProfile(userData);
      setSuccess("User profile updated successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      throw new Error(data.message || "Failed to update user profile");
    }
  } catch (err: any) {
    setError(err.message || "Failed to update user profile");
    setTimeout(() => {
      setError("");
    }, 3000);
    console.error(err);
  }
  };

  return { profile, viewUser, updateUser, error, success };
}
