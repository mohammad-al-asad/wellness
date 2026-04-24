import { useState, useCallback } from "react";
import type { User } from "../types";

interface AuthHookReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export default function useAuth(): AuthHookReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      setUser({ id: "1", name: "Dominion User", email });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // TODO: AsyncStorage.removeItem('token');
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        // TODO: replace with API call
        setUser({ id: "1", name, email });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Registration failed");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { user, loading, error, login, logout, register };
}
