'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

function useUser(username: string) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user');
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  return { user, error };
}

export default useUser;
