import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    const { currentPassword, newPassword, confirmPassword } = formData;
    let hasErrors = false;
    const newErrors = { currentPassword: "", newPassword: "" };

    if (currentPassword.trim() === "") {
      newErrors.currentPassword = "Current password is required";
      hasErrors = true;
    }

    if (newPassword.trim() === "") {
      newErrors.newPassword = "New password is required";
      hasErrors = true;
    }

    if (newPassword !== confirmPassword) {
      newErrors.newPassword = "New password and confirm password do not match";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    // Make a request to the backend endpoint using Axios
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/changePassword",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setMessage(data.message);
        // You can redirect the user or perform any other action here
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while changing the password");
    }
  };

  // ...

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <div className="error">{errors.currentPassword}</div>
        </div>

        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <div className="error">{errors.newPassword}</div>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="error">{message}</div>

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
