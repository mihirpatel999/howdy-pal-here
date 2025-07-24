// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Report from './Report'; 
// import UserMaster from './UserMaster';




// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/'; // Hide only on login

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/staff" element={<StaffPage />} />
//         <Route path="/gate" element={<GateKeeper />} />
//          <Route path="/truck" element={<TruckTransaction />} />
//          <Route path="/plantmaster" element={<PlantMaster />} />
//         <Route path="/usermaster" element={<UserMaster />} />
//           <Route path="/reports" element={<Report />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;//////////////////my code ////////////////



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';

// // Role-based access control
// const roleAccess = {
//   owner:    ['plantmaster','usermaster','truck','gate','loader','reports','staff'],
//   admin:    ['plantmaster','usermaster','truck','gate','loader','reports','staff'],
//   dispatch: ['truck','truckfind'],
//   gatekeeper: ['gate'],
//   report:   ['reports'],
//   loader:   ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Authorization check
// const canAccessRoute = (requiredRoute) => {
//   const roles = localStorage.getItem('userRole')?.split(',').map(r=>r.trim()) || [];
//   return roles.some(role => roleAccess[role]?.includes(requiredRoute));
// };

// // Reusable protected route
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   if (!isAuthenticated()) return <Navigate to="/" replace />;
//   if (requiredRoute && !canAccessRoute(requiredRoute)) return <Navigate to="/home" replace />;
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truck" />} />
//         <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />

//         {/* Wildcard: authenticated users go to home; unauthenticated go to login */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }



///////////////


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';

// // Role-based access control
// const roleAccess = {
//   owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff'],
//   admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff'],
//   dispatch: ['truck', 'truckfind'],
//   gatekeeper: ['gate'],
//   report: ['reports'],
//   loader: ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Authorization check
// const canAccessRoute = (requiredRoute) => {
//   const roles = localStorage.getItem('userRole')
//     ?.split(',')
//     .map(r => r.trim().toLowerCase()) || [];

//   return roles.some(role => roleAccess[role]?.includes(requiredRoute));
// };

// // Reusable protected route
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   if (!isAuthenticated()) return <Navigate to="/" replace />;
//   if (requiredRoute && !canAccessRoute(requiredRoute)) return <Navigate to="/home" replace />;
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truck" />} />
//         <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />

//         {/* Wildcard: authenticated users go to home; unauthenticated go to login */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';
// import UserRegister from './UserRegister.jsx';
// import  TruckSchedule from "./TruckSchedule.jsx";

// // Role-based access control
// const roleAccess = {
//   owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff','userregister','truckshedule'],
//   admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff','userregister','truckshedule'],
//   dispatch: ['truck', 'truckfind'],
//   gatekeeper: ['gate'],
//   usermaster: ['usermaster'],
//   userregister: ['userregister'],
//   report: ['reports','truckshedule'],
//   loader: ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Authorization check
// const canAccessRoute = (requiredRoute) => {
//   const roles = localStorage.getItem('userRole')
//     ?.split(',')
//     .map(r => r.trim().toLowerCase()) || [];

//   return roles.some(role => roleAccess[role]?.includes(requiredRoute));
// };

// // Reusable protected route
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   if (!isAuthenticated()) return <Navigate to="/" replace />;
//   if (requiredRoute && !canAccessRoute(requiredRoute)) return <Navigate to="/home" replace />;
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truck" />} />
//         <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />
//         <Route path="/userregister" element={<ProtectedRoute element={UserRegister} requiredRoute="userregister" />} />
//         <Route path="/truckshedule" element={<ProtectedRoute element={TruckSchedule} requiredRoute="truckshedule" />} />

//         {/* Wildcard: authenticated users go to home; unauthenticated go to login */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';
// import UserRegister from './UserRegister.jsx';
// import TruckSchedule from "./TruckSchedule.jsx";

// // Enhanced Role-based access control
// const roleAccess = {
//   owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   dispatch: ['truck', 'truckfind'],
//   gatekeeper: ['gate'],
//   plantmaster: ['plantmaster'],  // Added specific role for PlantMaster
//   usermaster: ['usermaster'],
//   userregister: ['userregister'],
//   report: ['reports', 'truckshedule'],
//   loader: ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Enhanced Authorization check
// const canAccessRoute = (requiredRoute) => {
//   const roles = localStorage.getItem('userRole')
//     ?.split(',')
//     .map(r => r.trim().toLowerCase()) || [];

//   // Check if any role has access to the required route
//   const hasAccess = roles.some(role => {
//     // Check if the role exists in roleAccess and has the required route
//     if (roleAccess[role]) {
//       return roleAccess[role].includes(requiredRoute);
//     }
//     return false;
//   });

//   // Special case: Admin and Owner have access to everything
//   if (roles.includes('admin') || roles.includes('owner')) {
//     return true;
//   }

//   return hasAccess;
// };

// // Reusable protected route
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   if (!isAuthenticated()) return <Navigate to="/" replace />;
//   if (requiredRoute && !canAccessRoute(requiredRoute)) {
//     return <Navigate to="/home" replace />;
//   }
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truck" />} />
//         <Route 
//           path="/plantmaster" 
//           element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} 
//         />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />
//         <Route path="/userregister" element={<ProtectedRoute element={UserRegister} requiredRoute="userregister" />} />
//         <Route path="/truckshedule" element={<ProtectedRoute element={TruckSchedule} requiredRoute="truckshedule" />} />

//         {/* Wildcard: authenticated users go to home; unauthenticated go to login */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';
// import UserRegister from './UserRegister.jsx';
// import TruckSchedule from "./TruckSchedule.jsx";

// // Enhanced Role-based access control
// const roleAccess = {
//   owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   dispatch: ['truck', 'truckfind'],
//   gatekeeper: ['gate'],
//   plantmaster: ['plantmaster'],
//   usermaster: ['usermaster'], // Added userregister access for usermaster
//   userregister: ['userregister'],
//   report: ['reports', 'truckshedule'],
//   loader: ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Enhanced Authorization check
// const canAccessRoute = (requiredRoute) => {
//   const roles = localStorage.getItem('userRole')
//     ?.split(',')
//     .map(r => r.trim().toLowerCase()) || [];

//   // Check if any role has access to the required route
//   const hasAccess = roles.some(role => {
//     // Check if the role exists in roleAccess and has the required route
//     if (roleAccess[role]) {
//       return roleAccess[role].includes(requiredRoute);
//     }
//     return false;
//   });

//   // Special case: Admin and Owner have access to everything
//   if (roles.includes('admin') || roles.includes('owner')) {
//     return true;
//   }

//   return hasAccess;
// };

// // Reusable protected route
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   if (!isAuthenticated()) return <Navigate to="/" replace />;
  
//   // Debugging logs (remove in production)
//   console.log('Checking access for route:', requiredRoute);
//   console.log('User roles:', localStorage.getItem('userRole'));
  
//   if (requiredRoute && !canAccessRoute(requiredRoute)) {
//     console.log('Access denied for route:', requiredRoute);
//     return <Navigate to="/home" replace />;
//   }
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truck" />} />
//         <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route 
//           path="/usermaster" 
//           element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} 
//         />
//         <Route path="/userregister" element={<ProtectedRoute element={UserRegister} requiredRoute="userregister" />} />
//         <Route path="/truckshedule" element={<ProtectedRoute element={TruckSchedule} requiredRoute="truckshedule" />} />

//         {/* Wildcard: authenticated users go to home; unauthenticated go to login */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Home from './Home';
// import StaffPage from './StaffPage';
// import Login from './Login';
// import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import GateKeeper from './GateKeeper';
// import TruckTransaction from './TruckTransaction';
// import PlantMaster from './PlantMaster';
// import Reports from './Report';
// import UserMaster from './UserMaster';
// import TruckFind from './TruckFind.jsx';
// import UserRegister from './UserRegister.jsx';
// import TruckSchedule from "./TruckSchedule.jsx";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Role-based access control with exact role names as stored in localStorage
// const roleAccess = {
//   Owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   Admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule'],
//   Dispatch: ['truck', 'truckfind'],
//   GateKeeper: ['gate'],
//   PlantMaster: ['plantmaster'],
//   UserMaster: ['usermaster','userregister'], // UserMaster has access to both
//   UserRegister: ['userregister'],
//   Report: ['reports', 'truckshedule'],
//   Loader: ['loader'],
// };

// // Authentication check
// const isAuthenticated = () => {
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   return username && userRole;
// };

// // Enhanced Authorization check with debugging
// const canAccessRoute = (requiredRoute) => {
//   if (!requiredRoute) return true; // Allow routes without required permissions
  
//   const roles = localStorage.getItem('userRole')
//     ?.split(',')
//     .map(r => r.trim()) || []; // Keep original case

//   console.log('[Debug] Checking access for:', requiredRoute);
//   console.log('[Debug] User roles:', roles);

//   // Admin and Owner have full access
//   if (roles.includes('Admin') || roles.includes('Owner')) {
//     return true;
//   }

//   // Check each role's permissions
//   return roles.some(role => {
//     const permissions = roleAccess[role] || [];
//     const hasAccess = permissions.includes(requiredRoute);
    
//     console.log(`[Debug] Checking role ${role} for ${requiredRoute}:`, hasAccess);
//     return hasAccess;
//   });
// };

// // ProtectedRoute with detailed debugging
// function ProtectedRoute({ element: Component, requiredRoute }) {
//   const location = useLocation();
  
//   console.group('Route Access Check');
//   console.log('Current path:', location.pathname);
//   console.log('Required permission:', requiredRoute);
//   console.log('User roles:', localStorage.getItem('userRole'));
  
//   if (!isAuthenticated()) {
//     console.log('Result: Not authenticated - redirecting to login');
//     console.groupEnd();
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   if (requiredRoute && !canAccessRoute(requiredRoute)) {
//     console.log('Result: Access denied - redirecting to home');
//     console.groupEnd();
//     return <Navigate to="/home" replace state={{ from: location }} />;
//   }

//   console.log('Result: Access granted');
//   console.groupEnd();
//   return <Component />;
// }

// function Layout() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/';

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Routes requiring authentication */}
//         <Route path="/home" element={<ProtectedRoute element={Home} />} />
//         <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
//         <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
//         <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
//         <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truckfind" />} />
//         <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
//         <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
//         <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />
//         <Route path="/userregister" element={<ProtectedRoute element={UserRegister} requiredRoute="userregister" />} />
//         <Route path="/truckshedule" element={<ProtectedRoute element={TruckSchedule} requiredRoute="truckshedule" />} />

//         {/* Wildcard redirects */}
//         <Route path="*" element={
//           isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
//         } />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Layout />
//     </Router>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Home';
import StaffPage from './StaffPage';
import Login from './Login';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GateKeeper from './GateKeeper';
import TruckTransaction from './TruckTransaction';
import PlantMaster from './PlantMaster';
import Reports from './Report';
import UserMaster from './UserMaster';
import TruckFind from './TruckFind.jsx';
import UserRegister from './UserRegister.jsx';
import TruckSchedule from "./TruckSchedule.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ LOWERCASE role names and permissions
const roleAccess = {
  owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule','truckfind'],
  admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule','truckfind'],
  dispatch: ['truck', 'truckfind'],
  gatekeeper: ['gate'],
  plantmaster: ['plantmaster'],
  usermaster: ['usermaster', 'userregister'],
  userregister: ['userregister'],
  report: ['reports', 'truckshedule'],
  loader: ['loader'],
};

// ✅ Auth check
const isAuthenticated = () => {
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');
  return username && userRole;
};

// ✅ Route access check (lowercased roles and requiredRoute)
const canAccessRoute = (requiredRoute) => {
  if (!requiredRoute) return true;

  const roles = localStorage.getItem('userRole')
    ?.split(',')
    .map(r => r.trim().toLowerCase()) || [];

  const required = requiredRoute.toLowerCase();

  return roles.some(role => {
    const permissions = roleAccess[role] || [];
    return permissions.includes(required);
  });
};

// ✅ ProtectedRoute wrapper
function ProtectedRoute({ element: Component, requiredRoute }) {
  const location = useLocation();

  console.group('Route Access Check');
  console.log('Current path:', location.pathname);
  console.log('Required permission:', requiredRoute);
  console.log('User roles:', localStorage.getItem('userRole'));

  if (!isAuthenticated()) {
    console.log('Result: Not authenticated - redirecting to login');
    console.groupEnd();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (requiredRoute && !canAccessRoute(requiredRoute)) {
    console.log('Result: Access denied - redirecting to home');
    console.groupEnd();
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  console.log('Result: Access granted');
  console.groupEnd();
  return <Component />;
}

// ✅ Main layout with Navbar and Routes
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/staff" element={<ProtectedRoute element={StaffPage} requiredRoute="staff" />} />
        <Route path="/gate" element={<ProtectedRoute element={GateKeeper} requiredRoute="gate" />} />
        <Route path="/truck" element={<ProtectedRoute element={TruckTransaction} requiredRoute="truck" />} />
        <Route path="/truckfind" element={<ProtectedRoute element={TruckFind} requiredRoute="truckfind" />} />
        <Route path="/plantmaster" element={<ProtectedRoute element={PlantMaster} requiredRoute="plantmaster" />} />
        <Route path="/reports" element={<ProtectedRoute element={Reports} requiredRoute="reports" />} />
        <Route path="/usermaster" element={<ProtectedRoute element={UserMaster} requiredRoute="usermaster" />} />
        <Route path="/userregister" element={<ProtectedRoute element={UserRegister} requiredRoute="userregister" />} />
        <Route path="/truckshedule" element={<ProtectedRoute element={TruckSchedule} requiredRoute="truckshedule" />} />

        {/* Wildcard fallback */}
        <Route
          path="*"
          element={
            isAuthenticated()
              ? <Navigate to="/home" replace />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}

// ✅ Export App
export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <Layout />
    </Router>
  );
}
