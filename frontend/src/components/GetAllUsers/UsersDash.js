import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editableUserId, setEditableUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  
  useEffect(() => {
    // Fetch all users from the backend API
    axios.get('http://localhost:8800/api/users/getAllUsers', { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEditClick = (userId) => {
    // Set the user ID to be edited
    setEditableUserId(userId);
    // Set the initial values for editing
    setUpdatedUser(users.find(user => user.id === userId));
  };

  const handleInputChange = (event) => {
    // Update the edited user data
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    // Send a PUT request to update the user
    axios.put(`http://localhost:8800/api/users/updateUser/${editableUserId}`, updatedUser, { withCredentials: true })
      .then((response) => {
        console.log('User updated successfully:', response.data);
        setEditableUserId(null); // Clear the editable user
        // Refresh the user data by refetching all users
        axios.get('http://localhost:8800/api/users/getAllUsers', { withCredentials: true })
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <h1>Users List</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editableUserId === user.id ? (
                      <input
                        type="text"
                        value={updatedUser.name || user.name}
                        name='name'
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editableUserId === user.id ? (
                      <input
                        type="text"
                        value={updatedUser.email || user.email}
                        name='email'
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                  {editableUserId === user.id ? (
                      <select
                        name='role'
                        value={updatedUser.role || user.role}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {editableUserId === user.id ? (
                      <button onClick={handleSaveClick}>Save</button>
                    ) : (
                      <button onClick={() => handleEditClick(user.id)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersList;
