// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       console.log('Truck data:', response.data);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
//         <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
//           <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
//             SEARCH RESULT
//           </h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <p className="text-red-600 font-medium">❌ {error}</p>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-400 mt-0">
//               <thead>
//                 <tr className="bg-cyan-700 text-white text-base">
//                   <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
//                   <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
//                   <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
//                   <th className="px-3 py-2 border border-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.truckno || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 font-medium">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.cityname || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }/////////////////////////////////////final code /////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
//         <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
//           <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
//             SEARCH RESULT
//           </h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <p className="text-red-600 font-medium">❌ {error}</p>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-400 mt-0">
//               <thead>
//                 <tr className="bg-cyan-700 text-white text-base">
//                   <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
//                   <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
//                   <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
//                   <th className="px-3 py-2 border border-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.truckno || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 font-medium">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.cityname || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } /////////////full code/////////////redy//


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-8 w-full max-w-4xl border border-gray-200">
//         <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-4">
//           <h2 className="text-3xl font-bold text-gray-800 tracking-wider">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition transform duration-300 shadow-md"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-300 shadow rounded-lg">
//               <thead className="bg-cyan-600 text-white text-base">
//                 <tr>
//                   <th className="px-4 py-2 border border-gray-300">Truck No</th>
//                   <th className="px-4 py-2 border border-gray-300">Transaction Date</th>
//                   <th className="px-4 py-2 border border-gray-300">City Name</th>
//                   <th className="px-4 py-2 border border-gray-300">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-4 py-2 border border-gray-200 font-semibold text-blue-800 uppercase">
//                         {truck.truckno || '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200 font-medium text-green-700">
//                         {truck.cityname || '—'}
//                       </td>
//                       <td className="px-4 py-2 border border-gray-200 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-4 rounded shadow-md transition-all"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-10 w-full max-w-5xl border border-gray-100 relative">
        
//         {/* Header */}
//         <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 tracking-widest uppercase">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:from-red-600 hover:to-red-700"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {/* Data Table */}
//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh] rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
//               <thead className="bg-cyan-700 text-white text-base">
//                 <tr>
//                   <th className="px-5 py-3">Truck No</th>
//                   <th className="px-5 py-3">Transaction Date</th>
//                   <th className="px-5 py-3">City Name</th>
//                   <th className="px-5 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr
//                       key={idx}
//                       className={`${
//                         idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'
//                       } hover:bg-cyan-100 transition-all`}
//                     >
//                       <td className="px-5 py-3 font-semibold text-blue-800 uppercase">{truck.truckno || '—'}</td>
//                       <td className="px-5 py-3">
//                         {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-5 py-3 font-medium text-green-700">{truck.cityname || '—'}</td>
//                       <td className="px-5 py-3 text-center">
//                         <button
//                           className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 px-4 rounded-full shadow-md transform transition-all hover:scale-105"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           ✏️ Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [truckSearch, setTruckSearch] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateStr) => {
//     const d = new Date(dateStr);
//     const day = String(d.getDate()).padStart(2, '0');
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const filteredData = truckData.filter(truck =>
//     truck.truckno?.toLowerCase().includes(truckSearch.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-50 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-10 w-full max-w-5xl border border-gray-100 relative">

//         {/* Header */}
//         <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-widest uppercase">Search Result</h2>
//           <button
//             onClick={() => navigate('/home')}
//             className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:from-red-600 hover:to-red-700"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* 🔍 Truck Search */}
//         <div className="flex justify-end mb-3">
//           <input
//             type="text"
//             placeholder="Search Truck No."
//             value={truckSearch}
//             onChange={(e) => setTruckSearch(e.target.value)}
//             className="border border-gray-300 px-3 py-1 rounded text-sm w-60 shadow"
//           />
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-500 border-t-transparent"></div>
//             <p className="mt-3 text-cyan-700 font-semibold">Loading truck details...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 shadow">
//               ❌ {error}
//             </div>
//           </div>
//         )}

//         {/* Desktop Table View */}
//         {!loading && !error && (
//           <div className="hidden md:block overflow-x-auto max-h-[70vh] rounded-xl shadow-inner">
//             <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
//               <thead className="bg-cyan-700 text-white text-base">
//                 <tr>
//                   <th className="px-5 py-3">Truck No</th>
//                   <th className="px-5 py-3">Transaction Date</th>
//                   <th className="px-5 py-3">City Name</th>
//                   <th className="px-5 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredData.map((truck, idx) => (
//                     <tr
//                       key={idx}
//                       className={`${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100 transition-all`}
//                     >
//                       <td className="px-5 py-3 font-semibold text-blue-800 uppercase">{truck.truckno || '—'}</td>
//                       <td className="px-5 py-3">{truck.transactiondate ? formatDate(truck.transactiondate) : '—'}</td>
//                       <td className="px-5 py-3 font-medium text-green-700">{truck.cityname || '—'}</td>
//                       <td className="px-5 py-3 text-center">
//                         <button
//                           className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 px-4 rounded-full shadow-md transform transition-all hover:scale-105"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           ✏️ Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Mobile Card View */}
//         {!loading && !error && (
//           <div className="block md:hidden space-y-3 max-h-[70vh] overflow-y-auto pr-1">
//             {filteredData.length === 0 ? (
//               <p className="text-center text-gray-500">No truck data available</p>
//             ) : (
//               filteredData.map((truck, idx) => (
//                 <div key={idx} className="border border-cyan-200 rounded-xl p-4 shadow-sm bg-white space-y-2">
//                   <p className="text-sm"><span className="font-semibold">Truck No:</span> <span className="uppercase text-blue-800">{truck.truckno || '—'}</span></p>
//                   <p className="text-sm"><span className="font-semibold">Transaction Date:</span> {truck.transactiondate ? formatDate(truck.transactiondate) : '—'}</p>
//                   <p className="text-sm"><span className="font-semibold">City Name:</span> <span className="text-green-700">{truck.cityname || '—'}</span></p>
//                   <button
//                     className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-1 rounded shadow-md transform transition-all hover:scale-105"
//                     onClick={() => navigate('/truck', { state: { truck } })}
//                   >
//                     ✏️ Edit
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }///////////// final code hai ye 


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FiSearch, FiTruck, FiCalendar, FiMapPin, FiEdit2, FiX, FiLoader } from 'react-icons/fi';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [truckSearch, setTruckSearch] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateStr) => {
//     const d = new Date(dateStr);
//     const day = String(d.getDate()).padStart(2, '0');
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const filteredData = truckData.filter(truck =>
//     truck.truckno?.toLowerCase().includes(truckSearch.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Truck Management</h1>
//             <p className="text-gray-600">Search and manage your fleet vehicles</p>
//           </div>
//           <button
//             onClick={() => navigate('/home')}
//             className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
//             title="Close"
//           >
//             <FiX className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Search Card */}
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="w-full md:w-auto">
//               <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//                 <FiTruck className="text-blue-500" />
//                 Truck Search Results
//               </h2>
//               <p className="text-sm text-gray-500">{filteredData.length} trucks found</p>
//             </div>
//             
//             <div className="relative w-full md:w-64">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by truck number..."
//                 value={truckSearch}
//                 onChange={(e) => setTruckSearch(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//             <p className="text-gray-700 font-medium">Loading truck data...</p>
//             <p className="text-sm text-gray-500">Please wait while we fetch the latest records</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error loading truck data</h3>
//                 <div className="mt-2 text-sm text-red-700">
//                   <p>{error}</p>
//                 </div>
//                 <button
//                   onClick={fetchAllTruckData}
//                   className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Desktop Table View */}
//         {!loading && !error && (
//           <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <FiTruck className="mr-2 text-blue-500" />
//                         Truck Number
//                       </div>
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <FiCalendar className="mr-2 text-blue-500" />
//                         Transaction Date
//                       </div>
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <FiMapPin className="mr-2 text-blue-500" />
//                         City Name
//                       </div>
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredData.length === 0 ? (
//                     <tr>
//                       <td colSpan={4} className="px-6 py-8 text-center">
//                         <div className="flex flex-col items-center justify-center text-gray-400">
//                           <FiSearch className="w-12 h-12 mb-2" />
//                           <p className="text-lg font-medium">No trucks found</p>
//                           <p className="text-sm">Try adjusting your search query</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredData.map((truck, idx) => (
//                       <tr key={idx} className="hover:bg-blue-50 transition-colors duration-150">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="font-medium text-gray-900 uppercase">{truck.truckno || '—'}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-gray-600">{truck.transactiondate ? formatDate(truck.transactiondate) : '—'}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-gray-600 font-medium">{truck.cityname || '—'}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right">
//                           <button
//                             onClick={() => navigate('/truck', { state: { truck } })}
//                             className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
//                           >
//                             <FiEdit2 className="mr-1" />
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Mobile Card View */}
//         {!loading && !error && (
//           <div className="block md:hidden space-y-4">
//             {filteredData.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm p-6 text-center">
//                 <FiSearch className="mx-auto w-12 h-12 text-gray-300 mb-3" />
//                 <h3 className="text-lg font-medium text-gray-700">No trucks found</h3>
//                 <p className="text-gray-500 mt-1">Adjust your search and try again</p>
//               </div>
//             ) : (
//               filteredData.map((truck, idx) => (
//                 <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//                   <div className="p-4">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800 uppercase flex items-center">
//                           <FiTruck className="mr-2 text-blue-500" />
//                           {truck.truckno || '—'}
//                         </h3>
//                         <div className="mt-2 flex items-center text-sm text-gray-600">
//                           <FiCalendar className="mr-2 text-blue-500" />
//                           {truck.transactiondate ? formatDate(truck.transactiondate) : '—'}
//                         </div>
//                         <div className="mt-1 flex items-center text-sm text-gray-600">
//                           <FiMapPin className="mr-2 text-blue-500" />
//                           {truck.cityname || '—'}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => navigate('/truck', { state: { truck } })}
//                         className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
//                       >
//                         <FiEdit2 className="mr-1" />
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiTruck, FiCalendar, FiMapPin, FiEdit2, FiX, FiLoader } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckFind() {
  const navigate = useNavigate();
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [truckSearch, setTruckSearch] = useState('');

  useEffect(() => {
    fetchAllTruckData();
  }, []);

  const fetchAllTruckData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/truck-find`);
      if (Array.isArray(response.data)) {
        setTruckData(response.data);
        toast.success('Truck data loaded successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setError('Invalid data format from server');
        setTruckData([]);
        toast.error('Invalid data format received', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to fetch truck data';
      setError(errorMsg);
      setTruckData([]);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '—';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredData = truckData.filter(truck =>
    truck.truckno?.toLowerCase().includes(truckSearch.toLowerCase())
  );

  const handleEditClick = (truck) => {
    toast.info(`Loading truck ${truck.truckno} details...`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Add a small delay to ensure data is properly saved
    setTimeout(() => {
      navigate('/truck', { state: { truckNo: truck.truckno } });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Truck Management</h1>
            <p className="text-gray-600">Search and manage your fleet vehicles</p>
          </div>
          <button
            onClick={() => {
              toast.info('Returning to home', { autoClose: 1500 });
              setTimeout(() => navigate('/home'), 1600);
            }}
            className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
            title="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FiTruck className="text-blue-500" />
                Truck Search Results
              </h2>
              <p className="text-sm text-gray-500">{filteredData.length} trucks found</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by truck number..."
                value={truckSearch}
                onChange={(e) => setTruckSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-700 font-medium">Loading truck data...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch the latest records</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading truck data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <button
                  onClick={() => {
                    toast.info('Refreshing truck data...');
                    fetchAllTruckData();
                  }}
                  className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {!loading && !error && (
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiTruck className="mr-2 text-blue-500" />
                        Truck Number
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-blue-500" />
                        Transaction Date
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiMapPin className="mr-2 text-blue-500" />
                        City Name
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <FiSearch className="w-12 h-12 mb-2" />
                          <p className="text-lg font-medium">No trucks found</p>
                          <p className="text-sm">Try adjusting your search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((truck, idx) => (
                      <tr key={idx} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 uppercase">{truck.truckno || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-600">{formatDate(truck.transactiondate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-600 font-medium">{truck.cityname || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEditClick(truck)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                          >
                            <FiEdit2 className="mr-2" />
                            Edit Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        {!loading && !error && (
          <div className="block md:hidden space-y-4">
            {filteredData.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <FiSearch className="mx-auto w-12 h-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No trucks found</h3>
                <p className="text-gray-500 mt-1">Adjust your search and try again</p>
              </div>
            ) : (
              filteredData.map((truck, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <FiTruck className="text-blue-500 mr-2" />
                          <h3 className="text-lg font-bold text-gray-800 uppercase truncate">
                            {truck.truckno || '—'}
                          </h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <FiCalendar className="text-blue-500 mr-2" />
                          <span>{formatDate(truck.transactiondate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="text-blue-500 mr-2" />
                          <span className="font-medium">{truck.cityname || '—'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditClick(truck)}
                        className="flex-shrink-0 inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-110"
                        aria-label="Edit truck"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}