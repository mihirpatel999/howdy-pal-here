// import React from "react";
// import { Link } from "react-router-dom";

// export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white shadow-xl transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 z-50 p-5`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold">Lemon ERP</h2>
//         <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">✖</button>
//       </div>

//       {/* Links */}
//       <div className="space-y-4">
//         <Link to="/home" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🏠 <span>Home</span>
//         </Link>
//         <Link to="/gate" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚪 <span>Gate Keeper</span>
//         </Link>
//         <Link to="/truck" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚛 <span>Truck Transaction</span>
//         </Link>
//         <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           📊 <span>Reports</span>
//         </Link>

//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="flex items-center gap-3 p-2 hover:bg-red-600 rounded text-red-400"
//         >
//           🔓 <span>Logout</span>
//         </button>

//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mt-8">
//           <span>🌙 Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={(e) => setDarkMode(e.target.checked)}
//             className="accent-blue-500 w-5 h-5"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////



// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   FiHome,
//   FiSettings,
//   FiLogOut,
//   FiTruck,
//   FiBarChart2,
//   FiUser,
//   FiClipboard
// } from "react-icons/fi";
// import { MdOutlineWarehouse } from "react-icons/md";
// import { AiOutlineSchedule } from "react-icons/ai";
// import { PiPackageLight } from "react-icons/pi";

// export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
//   const location = useLocation();
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     setUserRole(localStorage.getItem("userRole") || "");
//   }, []);

//   const panelList = [
//     { name: "Home", path: "/home", icon: <FiHome />, roles: [] },
//     { name: "Gate Keeper", path: "/gate", icon: <FiHome />, roles: ["Owner", "Admin", "GateKeeper"] },
//     { name: "Truck Transaction", path: "/truck", icon: <FiTruck />, roles: ["Owner", "Admin", "Dispatch"] },
//     { name: "Reports", path: "/reports", icon: <FiBarChart2 />, roles: ["Owner", "Admin", "Report"] },
//   ];

//   const allowedPanels = panelList.filter((p) => {
//     if (!userRole) return false;
//     if (p.roles.length === 0) return true;
//     const roles = userRole.split(",").map((r) => r.trim());
//     return roles.some((r) => p.roles.includes(r));
//   });

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a] text-white shadow-2xl transform transition-transform duration-300 z-50 p-6 flex flex-col justify-between ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       {/* Close Button */}
//       <div>
//         <div className="flex justify-end mb-6">
//           <button onClick={toggleSidebar} className="text-purple-400 hover:text-white text-xl">
//             ✖
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-2 text-sm">
//           {allowedPanels.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               onClick={toggleSidebar}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
//                 location.pathname === item.path ? "bg-blue-700" : ""
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-[15px]">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Footer Section */}
//       <div className="space-y-4 text-sm">
//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between">
//           <span>🌙 Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={(e) => setDarkMode(e.target.checked)}
//             className="accent-blue-500 w-5 h-5"
//           />
//         </div>

//         {/* Logout */}
//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="flex items-center justify-center gap-2 w-full p-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
//         >
//           <FiLogOut /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiUsers, 
  FiPieChart,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSettings,
  FiClock
} from 'react-icons/fi';
import { 
  MdOutlineWarehouse,
  MdOutlineSchedule
} from 'react-icons/md';
import { 
  BsShieldLock,
  BsBoxSeam
} from 'react-icons/bs';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.sidebar-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const hasAccess = (requiredRoles) => {
    if (!userRole) return false;
    const userRoles = userRole.split(',').map(r => r.trim());
    return requiredRoles.some(role => userRoles.includes(role));
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome size={20} />,
      roles: ["Owner", "Admin", "Dispatch", "GateKeeper", "Loader", "Report"]
    },
    {
      title: "Admin",
      icon: <FiSettings size={20} />,
      roles: ["Owner", "Admin"],
      subItems: [
        { title: "Plant Master", path: "/plantmaster", icon: <MdOutlineWarehouse size={18} /> },
        { title: "User Management", path: "/usermaster", icon: <FiUsers size={18} /> },
        { title: "User Register", path: "/userregister", icon: <BsShieldLock size={18} /> }
      ]
    },
    {
      title: "Dispatch",
      icon: <FiTruck size={20} />,
      roles: ["Owner", "Admin", "Dispatch"],
      subItems: [
        { title: "Truck Transaction", path: "/truck", icon: <FiTruck size={18} /> },
        { title: "Truck Locator", path: "/truckfind", icon: <FiClock size={18} /> }
      ]
    },
    {
      title: "Gate Control",
      path: "/gate",
      icon: <MdOutlineWarehouse size={20} />,
      roles: ["Owner", "Admin", "GateKeeper"]
    },
    {
      title: "Loading",
      path: "/loader",
      icon: <BsBoxSeam size={20} />,
      roles: ["Owner", "Admin", "Loader"]
    },
    {
      title: "Reports",
      icon: <FiPieChart size={20} />,
      roles: ["Owner", "Admin", "Report"],
      subItems: [
        { title: "Operations Report", path: "/reports", icon: <FiPieChart size={18} /> },
        { title: "Schedule Board", path: "/truckshedule", icon: <MdOutlineSchedule size={18} /> }
      ]
    }
  ];

  const filteredMenuItems = menuItems.filter(item => hasAccess(item.roles));

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white shadow-sm md:hidden"
      >
        <FiMenu className="text-gray-600" size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar-container fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white">
              <FiTruck size={20} />
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-800">Lemon ERP</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="text-gray-500" size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="h-[calc(100%-120px)] overflow-y-auto py-4">
          {filteredMenuItems.map((item, index) => (
            <div key={index} className="px-2 mb-1">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600 font-medium' : ''
                  }`}
                >
                  <span className={`mr-3 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`flex items-center justify-between w-full px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${
                      activeDropdown === index ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <FiChevronDown 
                      className={`transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`flex items-center pl-14 pr-4 py-2.5 text-gray-600 hover:bg-gray-50 ${
                          location.pathname === subItem.path ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                      >
                        <span className={`mr-3 ${location.pathname === subItem.path ? 'text-blue-600' : 'text-gray-400'}`}>
                          {subItem.icon}
                        </span>
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;