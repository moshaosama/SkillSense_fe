import { useEffect, useState } from "react";
import type { UserType } from "../Type/Admin/adminType";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  return { user, isAuthenticated: !!user, loading };
};

export default useAuth;
