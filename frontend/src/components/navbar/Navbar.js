import "./navbar.css";

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


const Navbar = ({role}) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  //   const userId = currentUser.id
  //   const { isLoading, error, data } = useQuery(["user"], () =>
  //   makeRequest.get("/users/find/" + userId).then((res) => {
  //     return res.data;
  //   })
  // );
  //   console.log(data)

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      // setErr(err.response.data)
      console.log(err);
    }
  };

  return (
    <>
      <nav className="navbar">
        {role === 'admin' &&
        <div className="navbar-left">
          <button className="report-button" onClick={()=>navigate("/report")}>Report</button>
          <button className="report-button" onClick={()=>navigate("/users")}>Users</button>
          <button className="report-button" onClick={()=>navigate("/")}>Home</button>
          {/* <button className="report-button" onClick={()=>navigate("/changePass")}>ChangePass</button> */}
        </div>
        }
        <div className="navbar-left">
          <button className="report-button" onClick={()=>navigate("/changePass")}>ChangePass</button>
        </div>
       

        <div className="navbar-center">
          <center>
          <h1 className="name">SATELLITE MART</h1>
          </center>
        </div>
       
        <div className="navbar-right">
        <h1 className="name">{currentUser.name}</h1>
          <button
            className="logout-button"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
