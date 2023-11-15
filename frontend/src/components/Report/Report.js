import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './Report.css';

function Report() {
  const [selectedDate, setSelectedDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [displayedDate, setDisplayedDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const id = currentUser.id;
  console.log(id);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/products/getProducts`,
        {
          withCredentials: true,
          params: { date: selectedDate },
        }
      );
      const updatedData = response.data.map((item) => {
        const totalprice = item.quantity * item.price;
        return { ...item, totalprice };
      });
      // total amount
      const total = updatedData.reduce((acc, item) => acc + item.totalprice, 0);
      setTotalAmount(total);

      setTableData(updatedData);
      setOriginalTableData(updatedData);
      setError(null);
      // setTableData(response.data);
      // setOriginalTableData(response.data); // Store the original data for comparison
      // setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again."); // Set an error message
    }
  };

  useEffect(() => {
    // Optionally, you can automatically fetch data when a date is selected
    if (selectedDate) {
      fetchData();
    }
    setDisplayedDate(selectedDate);
  }, [selectedDate]);

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleInputChange = (event, id, field) => {
    // Update the edited data in the tableData state
    const updatedTableData = tableData.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: event.target.value };
      }
      return item;
    });

    setTableData(updatedTableData);
  };
  const handleSaveAsPDF = () => {
    const doc = new jsPDF();

    const tableRows = [];
    tableRows.push([
      "Product ID",
      "Name",
      "Quantity",
      "Price",
      "Total Price",
      "Entered By",
      "Edited By",
      "Modified Date",
    ]);

    tableData.forEach((item) => {
      tableRows.push([
        item.s_no,
        item.name,
        item.quantity,
        item.price,
        item.totalprice,
        item.enteredBy,
        item.editedBy || "Not Edited",
        item.modified_date
          ? new Date(item.modified_date).toLocaleDateString()
          : "Not modified",
      ]);
    });

    // Add Heading
    const heading = "Stock Report";
    doc.setFontSize(20);
    doc.text(80, 10, heading);

    // Add Date...
    const currentDate = selectedDate ? new Date(selectedDate) : new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    doc.setFontSize(12);
    doc.text(170, 10, formattedDate);

    const startY = 10;
    doc.autoTable({
      head: tableRows.slice(0, 1),
      body: tableRows.slice(1),
      startY: startY + 10,
    });

    // Calculate total amount
    const totalAmount = tableData.reduce(
      (total, item) => total + item.totalprice,
      0
    );

    // Display total amount in the PDF
    const finalY = doc.autoTable.previous.finalY + 10; // Position below the table
    // doc.text(`Total Amount: ${totalAmount}`, 80, finalY);
    doc.setTextColor(255, 0, 0);  
    doc.text(`Total Amount: ${totalAmount}`, 80, finalY);

    doc.save("report.pdf");
  };

  // const handlePrint = () => {
  //   const doc = new jsPDF();

  //   const tableRows = [];
  //   tableRows.push(['Product ID', 'Name', 'Quantity', 'Price', 'Entered By', 'Edited By', 'Modified Date']);

  //   tableData.forEach(item => {
  //     tableRows.push([item.s_no, item.name, item.quantity, item.price, item.enteredBy, item.editedBy || 'Not Edited', item.modified_date ? new Date(item.modified_date).toLocaleDateString() : 'Not modified']);
  //   });

  //   doc.autoTable({
  //     head: tableRows.slice(0, 1),
  //     body: tableRows.slice(1),
  //   });

  //   doc.save('report.pdf');
  // }

  const handleSaveClick = async () => {
    try {
      const currentDate = new Date(); // Get the current date and time

      // Extract only the date portion (YYYY-MM-DD)
      const currentDateOnly = currentDate.toISOString().split("T")[0];

      console.log(currentDate);
      // Assuming item.enter_date is a string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"

      // Now, formattedDate will be in the format "MM/DD/YYYY"

      // Prepare an array of updated rows (price or quantity changed)
      const updatedRows = tableData.filter((item, index) => {
        return (
          item.price !== originalTableData[index].price ||
          item.quantity !== originalTableData[index].quantity
        );
      });

      // Send API requests to update the rows with changed data, including the current date
      await Promise.all(
        updatedRows.map(async (item) => {
          await axios.put(
            `http://localhost:8800/api/products/updateProducts/${item.id}`,
            {
              price: item.price,
              quantity: item.quantity,
              editedBy_id: id,
              modified_date: currentDateOnly, // Use the date-only value
            },
            {
              withCredentials: true,
            }
          );
        })
      );

      // Fetch the updated data from the backend after saving
      await fetchData(); // Fetch the updated data here

      // Exit "edit" mode after saving
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2 className="hi">Stock Data By Date</h2>
      <label htmlFor="datePicker"  className="sdate1" >
        Select Date:
      </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
        className="sdate"
      />
      <div>
        {/* Display the selected date */}
        {displayedDate && (
          <p  className="sdate" >Selected Date: {new Date(displayedDate).toLocaleDateString()}</p>
        )}
      </div>
      <button onClick={toggleEditMode}  className="emode" >
        {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      </button>
      {error && <p className="error">{error}</p>}
      {tableData.length === 0 ? (
        <p  className="nd" >No data available.</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr className="bg-secondary text-white">
                <th>Product ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Enterd By</th>
                <th>Edited By</th>
                <th>Modified Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.s_no}</td>
                  <td>{item.name}</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          handleInputChange(e, item.id, "quantity")
                        }
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleInputChange(e, item.id, "price")}
                      />
                    ) : (
                      item.price
                    )}
                  </td>
                  {/* <td>
                    {new Date(item.enter_date).toLocaleDateString()}{" "}
                  </td> */}
                  <td>{item.totalprice}</td>
                  <td>{item.enteredBy}</td>
                  <td>
                    {item.editedBy !== null ? item.editedBy : "Not Edited"}
                  </td>

                  <td>
                    {item.modified_date
                      ? new Date(item.modified_date).toLocaleDateString()
                      : "Not modified"}
                    {/* Display date according to local timezone */}
                  </td>
                  {/* <td>{item.editedBy_id}</td> */}
                </tr>
              ))}
            </tbody>
            {/* //total amount to dispylay */}
            <tfoot>
              <tr>
                <td colSpan="4"></td>
                <td>Total Amount= {totalAmount}</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
          {isEditMode && <button onClick={handleSaveClick}  className="rsave" >Save</button>}
          {/* <button onClick={handlePrint}>Print</button> */}
          <button onClick={handleSaveAsPDF}  className="pbtn" >Print</button>
        </div>
      )}
      {/* <div style={{ textAlign: "center" }}>Total Amount: {totalAmount}</div> */}
    </div>
  );
}

export default Report;
