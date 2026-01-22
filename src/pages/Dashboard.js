import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { notification, Spin } from "antd";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");

      notification.error({
        message: "Data Fetch Failed",
        description: "Unable to load users from server",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    notification.info({
      message: "Logged Out",
      description: "You have been logged out successfully",
      placement: "topRight",
    });

    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </div>
      )}

      <Spin spinning={loading} tip="Loading users...">
        <div style={{ marginTop: "20px" }}>
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;
