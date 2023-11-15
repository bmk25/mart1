import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};


// export const updateUser = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q =
//       "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

//     db.query(
//       q,
//       [
//         req.body.name,
//         req.body.city,
//         req.body.website,
//         req.body.profilePic,
//         req.body.coverPic,
//         userInfo.id,
//       ],
//       (err, data) => {
//         if (err) res.status(500).json(err);
//         // console.log(data)
//         if (data.affectedRows > 0) return res.json("Updated!");
//         return res.status(403).json("You can update only your post!");
//       }
//     );
//   });
// };



// Import necessary modules and set up your Express app

// API endpoint to get all users with the "user" role
export const getAllUsers = (req, res) => {
  // Check if the user making the request is an admin
    // Query the database to get all users with the role "user"
    const sql = 'SELECT id, name, email, role FROM users WHERE role = "user"';
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
      } else {
        res.status(200).json(results); // Send the user data as JSON response
      }
    });
    
  };
  
  export const updateUser =  (req, res) => {
    // Extract the user ID from the request parameters
    const userId = req.params.id;
    
    // Extract the updated user information from the request body
    const { name, email, role } = req.body;
  
    // Perform the update operation in your database
    // Example using MySQL:
    const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
    const values = [name, email, role, userId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  };
  