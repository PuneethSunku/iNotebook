import React, { useEffect, useState } from 'react';

const UserDetails = () => {
  const [credentials, setCredentials] = useState({ email: "", name: "" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: 'POST',
          headers: { "auth-token": localStorage.getItem('token') },
        });
        const userDetails = await response.json();
        setCredentials({ email: userDetails.email, name: userDetails.name });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title my">Your Details</h2>
        <p className="card-text">
          <strong>Email:</strong> {credentials.email}
        </p>
        <p className="card-text">
          <strong>Name:</strong> {credentials.name}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
