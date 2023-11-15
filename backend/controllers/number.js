// import { db } from "../connect.js";


// export const number =  (req, res) => {
//   const { s_no, name, quantity, price, entered_date, enteredBy_id } = req.body;

//   const sql = 'INSERT INTO products ( s_no,name, quantity, price, entered_date, enteredBy_id) VALUES ( ?,?, ?, ?, ?, ?)';

//   db.query(sql, [s_no,name, quantity, price, entered_date, enteredBy_id], (err, result) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       res.status(500).json({ error: 'Error inserting data' });
//     } else {
//       console.log('Data inserted successfully');
//       res.status(200).json({ message: 'Data inserted successfully' });
//     }
//   });
// };