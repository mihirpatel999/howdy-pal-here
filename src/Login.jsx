
// // Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:3001/api/login', {
//         username: username.trim(),   // ✅ Trim to avoid space errors
//         password: password.trim()
//       });

//       if (res.data.success) {
//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message); // Better message
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



// Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", API_URL, username, password);

//     try {
//       const res = await axios.post(`${API_URL}/api/login`, {
//         username: username.trim(),   // ✅ Trim to avoid space errors
//         password: password.trim()
//       });

//       if (res.data.success) {
//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message); // Better message
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", API_URL, username, password);

//     try {
//       const res = await axios.post(`${API_URL}/api/login`, {
//         username: username.trim(),
//         password: password.trim()
//       });

//       if (res.data.success) {
//         alert('Login successful');

//         // ✅ Store user data in localStorage
//         localStorage.setItem("user", JSON.stringify({
//           username: res.data.username,
//           role: res.data.role,
//           rights: res.data.rights,
//           assignedPlants: res.data.assignedPlants
//         }));

//         navigate('/home');
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


// // Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:3001/api/login', {
//         username: username.trim(),   // ✅ Trim to avoid space errors
//         password: password.trim()
//       });

//       if (res.data.success) {
//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message); // Better message
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// // }



// // Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", API_URL, username, password);

//     try {
//       const res = await axios.post(`${API_URL}/api/login`, {
//         username: username.trim(),   // ✅ Trim to avoid space errors
//         password: password.trim()
//       });

//       if (res.data.success) {
//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message); // Better message
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }




















// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", API_URL, username, password);

//     try {
//       const res = await axios.post(`${API_URL}/api/login`, {
//         username: username.trim(),
//         password: password.trim()
//       });

//       if (res.data.success) {
//         // ✅ Store user data for role-based access control
//         localStorage.setItem('username', res.data.username);
//         localStorage.setItem('userRole', res.data.role); // e.g., "admin" or "staff"

//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Start your free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post(`${API_URL}/api/login`, {
//       username: username.trim(),
//       password: password.trim(),
//     });

//     console.log("Login Response:", res.data); // 🔍 DEBUG

//     if (res.data.success) {
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('userRole', res.data.role); // store role

//       console.log("✅ Stored role:", res.data.role); // 🔍 DEBUG
//       alert('Login successful');
//       navigate('/home');
//     } else {
//       alert(res.data.message || 'Invalid credentials');
//     }
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     alert(err.response?.data?.message || 'Server error');
//   }
// };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck Tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${API_URL}/api/login`, {
//         username: username.trim(),
//         password: password.trim()
//       });

//       console.log("Login Response:", res.data);

//       if (res.data.success) {
//         // ✅ Store in localStorage
//         localStorage.setItem('username', res.data.username);
       
//         localStorage.setItem("userRole", res.data.role.toLowerCase());
//         localStorage.setItem('allowedPlants', res.data.allowedPlants);

//         alert('Login successful');
//         navigate('/home');
//       } else {
//         alert(res.data.message || 'Invalid credentials');
//       }
//     } catch (err) {
//       console.error('Login error:', err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-200 px-6 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img
//             alt="Truck Tracking"
//             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-12 w-12"
//           />
//         </div>
//         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
//           Sign in to Truck_tracking
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
//               Forgot password?
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }////////// ///////  // / / / / // / / / 


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus username field on component mount
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/login`, {
        username: username.trim(),
        password: password.trim()
      });

      if (res.data.success) {
        // Store user data
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userRole', res.data.role.toLowerCase());
        localStorage.setItem('allowedPlants', res.data.allowedPlants);

        toast.success('Login successful! Redirecting...');
        setTimeout(() => navigate('/home'), 1500);
      } else {
        toast.error(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      {/* Toast Notifications Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            {/* Logo and Branding */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4 shadow-inner">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-8 h-8 text-yellow-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Lemon Software</h1>
              <p className="text-gray-500 mt-1">Secure Sign In</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  ref={usernameRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}