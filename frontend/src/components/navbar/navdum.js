// import "./navbar.scss";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import HomeIcon from "@mui/icons-material/Home";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { AuthContext } from "../../context/authContext";
// import Dosthi from "../../assets/dosthi.svg";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { toggle, darkMode } = useContext(DarkModeContext);
//   const { currentUser, logout } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       // setErr(err.response.data)
//       console.log(err);
//     }
//   };

//   return (
//     <div className="navbar">
//       <div className="left">
//         {/* <Link to="/" style={{textDecoration:"none"}}>     
//         <img src={Dosthi} alt="" />
//        </Link> */}

//         <div className="waviy">
//           <span style={{ "--i": 1 }}>D</span>
//           <span style={{ "--i": 2 }}>O</span>
//           <span style={{ "--i": 3 }}>S</span>
//           <span style={{ "--i": 4 }}>T</span>
//           <span style={{ "--i": 5 }}>H</span>
//           <span style={{ "--i": 6 }}>I</span>
//         </div>

//         <Link to="/">
//         <HomeOutlinedIcon /></Link>
//         {darkMode ? (
//           <WbSunnyOutlinedIcon onClick={toggle} />
//         ) : (
//           <DarkModeOutlinedIcon onClick={toggle} />
//         )}
//         <GridViewOutlinedIcon />

//         <div className="search-box">
//           <input type="text" placeholder="search..." />
//           <button type="submit">
//             <SearchOutlinedIcon className="search-icon" />
//             <i className="bx bx-search search-icon"></i>
//           </button>
//         </div>
//       </div>
//       <div className="right">
//         <PersonOutlinedIcon />
//         <EmailOutlinedIcon />
//         <NotificationsOutlinedIcon />
//         <div className="user">
//           <img src={currentUser.profilePic} alt="kir" />
//           <span>{currentUser.name}</span>
//         </div>
//         <LogoutOutlinedIcon
//           onClick={handleLogout}
//           style={{ cursor: "pointer" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Dosthi from "../../assets/dosthi.svg";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
// import home from '../../assets/home.json;'
import { Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Navbar = () => {
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
    <div className="navbar">
      
        {/* <Link to="/" style={{textDecoration:"none"}}>     
        <img src={Dosthi} alt="" />
       </Link> */}
        {/* <img src={logo} alt="logo" className="logo" /> */}
        <div className="waviy">
          <span style={{ "--i": 1 }}>D</span>
          <span style={{ "--i": 2 }}>O</span>
          <span style={{ "--i": 3 }}>S</span>
          <span style={{ "--i": 4 }}>T</span>
          <span style={{ "--i": 5 }}>H</span>
          <span style={{ "--i": 6 }}>I</span>
        </div>
        <div className="left">
        <Tooltip title="Home" placement="bottom" className="tooltip">
        <Link to="/" className="homeicon" style={{ textDecoration: "none" }} >
          <HomeOutlinedIcon  />
          
        </Link>
        </Tooltip>
        {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
        {/* {home} */}
        
        {darkMode ? (
          <Tooltip title="Lightmode" placement="bottom" className="tooltip">
             <WbSunnyOutlinedIcon  onClick={toggle} className="darkicon"  />
          </Tooltip>
        ) : (
          <Tooltip title="Darkmode" placement="bottom" className="tooltip">
           <DarkModeOutlinedIcon onClick={toggle} className="darkicon" />
          </Tooltip>
        )}
        {/* <GridViewOutlinedIcon /> */}

        <Tooltip title="Profile" placement="bottom" className="tooltip">
        <Link 
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none" }} className="icon1"
              ><PersonOutlinedIcon  /></Link>
        </Tooltip>
        {/* <EmailOutlinedIcon /> */}
        <NotificationsOutlinedIcon className="icon2" />
      </div>
      <div className="right">
          
          <div className="search-box">
          <input type="text" placeholder="search..." />
          <button type="submit">
            <SearchOutlinedIcon className="search-icon" />
            <i class="bx bx-search search-icon"></i>
          </button>
        </div>
        <div className="user">
        <Link 
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none" }} 
              >
          <img src={"/upload/"+currentUser.profilePic} alt=""/>
              <span>{currentUser.name}</span>
        </Link>
            

          </div>
        <LogoutOutlinedIcon
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Navbar;






// navbar.scss
// @import "../../style.scss";

// .navbar {
//   @include themify($themes) {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 10px 10px;
//     height: 50px;
//     border-radius: 5px;
//     border-bottom: 1px solid themed("border");
//     position: sticky; // fixed
//     top: 0;
//     // background-color: white;
//     background-color: themed("bg");
//     color: themed("textColor");

//     .left {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       // img{
//       //   width: 60px;
//       //   height: 30px;
//       //   // border-radius: ;
//       //   // object-fit: cover;
//       //   align-items: center;
//       //   gap: 10px;
//       //   font-weight: 700;
//       //   zoom: 200%;

//       // }
//       .waviy {
//         position: relative;

//       }

//       .waviy span {
//         position: relative;
//         display: inline-block;
//         font-size: 1.6rem;
//         color: var(--text-color-lite-purple);
//         text-transform: uppercase;
//         animation: flip 2s infinite;
//         animation-delay: calc(.2s * var(--i));
//         font-weight: 600;
//         font-family: 'Times New Roman', Times, serif;
//       }

//       @keyframes flip {

//         0%,
//         80% {
//           transform: rotateY(360deg)
//         }
//       }

//       span {
//         font-weight: bold;
//         font-size: 30px;
//         // color: red;
//         color: themed("logo");
//       }

//       .search-box {
//         display: flex;
//         // align-items: center;
//         width: 50px;
//         height: 30px;
//         border: 1px solid #ccc;
//         border-radius: 15px;
//         overflow: hidden;
//         transition: width .75s ease;
//       }
//       .search-icon{
//         margin-top: 5px;
//       }

//       .search-box:hover {
//         width: 400px;
//       }

//       @media (max-width:768px) {
//         .search-box:hover {
//           width: 320px;
//         }
//       }

//       .search-box input[type="text"] {
        
//         height: 100%;
//         border: none;
//         outline: none;
//         font-size: 1.2rem;
//         width:0;

//         overflow: hidden;
//         transition: all .75s ease;
//       }

//       .search-box:hover input[type="text"] {
//         width: 400px;
//         padding-inline: 1.5rem;
//       }

//       .search-box button[type="submit"] {
//         width: 75px;
//         height: 100%;
//         background-color: #ccc;
//         border: none;
//         outline: none;
//         cursor: pointer;
//         transition: background-color 0.3s ease;
//       }

//       .search-box button[type="submit"]:hover {
//         background-color: #aaa;
//       }

//       .search-box i {
//         color: #fff;
//         font-size: 1.5rem;
//       }
//     }

//     .right {
//       display: flex;
//       align-items: center;
//       gap: 10px;

//       .user {
//         display: flex;
//         align-items: center;
//         gap: 5px;
//         font-weight: 500;

//         img {
//           width: 20px;
//           height: 20px;
//           border-radius: 70%;
//           object-fit: cover;
//           align-items: center;
//           gap: 10px;
//           font-weight: 500;
//         }

       
//       }
//     }
//   }
// }



@import "../../style.scss";

.navbar {
  @include themify($themes) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    height: 50px;
    border-radius: 5px;
    border-bottom: 1px solid themed("border");
    position: sticky; // fixed
    top: 0;
    background-color: white;
    background-color: themed("bg");
    color: themed("textColor");
    // background-color: black;
    &.hide {
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    .waviy {
      margin-left: 10px;
      position: relative;
      transition: transform 0.3s ease; /* Add transition for smooth animation */
      
      &:hover {
        transform: scale(1.2); /* Enlarge the size of the icon */
        
      }

    }

    .waviy span {
      position: relative;
      display: inline-block;
      // border: 1px solid orange;
      // background-color: orange;
      // text-shadow: 1px 1px  orange;
      -webkit-text-stroke: 0.5px orange;
      background-blend-mode: screen;
      font-size: 1.6rem;
      color: var(--text-color-lite-purple);
      text-transform: uppercase;
      animation: flip 2s infinite;
      animation-delay: calc(.2s * var(--i));
      font-weight: 600;
      font-family: 'Times New Roman', Times, serif;
      
    }

    @keyframes flip {

      0%,
      80% {
        transform: rotateY(360deg)
      }
    }
    .left {
      display: flex;
      align-items: center;
      gap: 60px;
      margin-right: 100px;
      transition: transform 0.3s ease; /* Add transition for smooth animation */
      .tooltip.title {
        background-color: orange;
        font-size: 14px;
        font-weight: bold;
        color: white;
        
      }
        
      &:hover {
        transform: scale(1.5); /* Enlarge the size of the icon */
      }
     
   
      span {
        font-weight: bold;
        font-size: 30px;
        // color: red;
        color: themed("logo");
      }
      .homeicon {
        margin-top: 7px;
        // margin-left: 200PX;
        color: black;
        position: relative;
        filter: drop-shadow(1px 0px 0px orange);

        transition: transform 0.3s ease; /* Add transition for smooth animation */

        
        &:hover {
          transform: scale(1.5); /* Enlarge the size of the icon */
        }
        
      }
     
      
      .darkicon {
        margin-top: 7px;
        // margin-left: 200PX;
        color: black;
        position: relative;
        filter: drop-shadow(1px 0px 0px orange);

        transition: transform 0.3s ease; /* Add transition for smooth animation */

        
        &:hover {
          transform: scale(1.5); /* Enlarge the size of the icon */
        }
        
      }
      .icon1 {
        margin-top: 7px;
        // margin-left: 200PX;
        color: black;
        position: relative;
        filter: drop-shadow(1px 0px 0px orange);

        transition: transform 0.3s ease; /* Add transition for smooth animation */

        
        &:hover {
          transform: scale(1.5); /* Enlarge the size of the icon */
        }
        
      }
      .icon2{
        filter: drop-shadow(1px 1px 0px orange);

        transition: transform 0.3s ease; /* Add transition for smooth animation */
        
        &:hover {
          transform: scale(1.5); /* Enlarge the size of the icon */
        }
      }
      
      
    }

    .right {
      display: flex;
      align-items: center;
      gap: 60px;
      // margin-right: 200px;
      .search-box {
        

        display: flex;
        // align-items: center;
        width: 50px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 15px;
        overflow: hidden;
        transition: width .75s ease;
      }
      .search-icon{
        filter: drop-shadow(1px 0px 0px orange);

        margin-top: 5px;
      }

      .search-box:hover {
        filter: drop-shadow(1px 0px 0px orange);

        width: 200px;
      }

      @media (max-width:768px) {
        .search-box:hover {
          width: 320px;
        }
      }

      .search-box input[type="text"] {
        
        height: 100%;
        border: none;
        outline: none;
        font-size: 1.2rem;
        width:0;

        overflow: hidden;
        transition: all .75s ease;
      }

      .search-box:hover input[type="text"] {
        width: 400px;
        padding-inline: 1.5rem;
      }

      .search-box button[type="submit"] {
        width: 75px;
        height: 100%;
        background-color: #ccc;
        border: none;
        outline: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .search-box button[type="submit"]:hover {
        background-color: #aaa;
      }

      .search-box i {
        color: #fff;
        font-size: 1.5rem;
      }

      .user {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 500;
        

        img {
          width: 20px;
          height: 20px;
          border-radius: 70%;
          object-fit: cover;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

       
      }
    }
  }
}