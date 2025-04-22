import { userRequest } from "@/services/auth";
import { useEffect, useState } from "react";
import { IUser } from "./types";


export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true);
        const userData = await userRequest();
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { user, error, loading };
}