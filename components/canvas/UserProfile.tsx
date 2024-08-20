'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  // Add other fields as needed
}

const UserProfile = ({ username }: { username: string }) => {
  const [user, setUser] = useState<User | null>(null);
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

    fetchUser();
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      {/* Display other user details */}
    </div>
  );
};

export default UserProfile;
