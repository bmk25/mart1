// import Login from "./pages/login/Login";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import LeftBar from "./components/leftbar/Leftbar";
// import RightBar from "./components/rightbar/Rightbar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import "./style.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Stories from "./components/stories/Stories";

// function App() {
//   const { currentUser } = useContext(AuthContext);

//   const { darkMode } = useContext(DarkModeContext);

//   const queryClient = new QueryClient();

//   const Layout = () => {
//     return (
//       <QueryClientProvider client={queryClient}>
//         <div className={`theme-${darkMode ? "dark" : "light"}`}>
//           <Navbar />
//           <div style={{ display: "flex" }}>
//             < Stories />
//             <div style={{ flex: 6 }}>
//               <Outlet />
//             </div>
//             <RightBar />
//           </div>
//         </div>
//       </QueryClientProvider>
//     );
//   };

//   const LayoutP = () =>{
//     <QueryClientProvider client={queryClient}>

//     <div className={`theme-${darkMode ? "dark" : "light"}`}>
//           <Navbar />
//           <div style={{ display: "flex" }}>
//             <div style={{ flex: 4}}>
//               <Outlet />
//             </div >
         
//           </div>
//         </div>

//     </QueryClientProvider>

//   }



//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" />;
//     }

//     return children;
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Layout />
//         </ProtectedRoute>
//       ),
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/profile/:id",
//       element: (
//         <ProtectedRoute>
//       <LayoutP/>
//       </ProtectedRoute >),
//       children: [
//         {
//           path: "/profile/:id",
//           element: <Profile />,
//         },
//       ],


//     },
    
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;




///---real --

import Login from "./pages/login/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import LeftBar from "./components/leftbar/Leftbar";
// import RightBar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
// import Stories from "./components/stories/Stories";
import Register from "./pages/register/Register";
import StockEntryForm from "./components/Stockentry";
import Report from "./components/Report/Report";
import UsersDash from "./components/GetAllUsers/UsersDash";
import ChangePass from "./components/changePass/changePass";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

 
  const Layout = () => {
    return (

        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar role={currentUser.role}/>
          <div style={{ display: "flex" }}>
            {/* < Stories /> */}
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
    );
  };



  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };
  
  const ProtectedRoute = ({ children, adminOnly }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    if (adminOnly && currentUser.role !== 'admin') {
      // For admin-only routes, deny access to non-admin users
      return <Navigate to="/unauthorized" />;
    }
  
    // Allow access to the route for all users
    return children;
  };
  
  // ...
  
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: (

        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/report",
          element: (
            <ProtectedRoute adminOnly>
              <Report />
            </ProtectedRoute>
          ),
        },
        {
          path: "/users",
          element: (
            <ProtectedRoute adminOnly>
              <UsersDash />
            </ProtectedRoute>
          ),
        },
        {
          path: "/changePass",
          element: (
              <ChangePass/>
          ),
        },
      ],
    },
  ]);
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
