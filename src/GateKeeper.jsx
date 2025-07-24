// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     setIsLoading(true);
//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
    
//     setIsLoading(true);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     Promise.all([
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`),
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//     ])
//       .then(([trucksRes, checkedInRes]) => {
//         setTruckNumbers(trucksRes.data);
//         setCheckedInTrucks(checkedInRes.data);
//         // Auto-select the first truck if available
//         if (trucksRes.data.length > 0) {
//           handleTruckSelect(getTruckNo(trucksRes.data[0]));
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching truck data:', err);
//         toast.error('Failed to load truck data');
//       })
//       .finally(() => setIsLoading(false));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setIsLoading(true);
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const [remarksRes, quantityRes] = await Promise.all([
//         axios.get(`${API_URL}/api/fetch-remarks`, {
//           params: { plantName: selectedPlant, truckNo }
//         }),
//         axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`)
//       ]);
      
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.',
//       }));
      
//       const normalize = str => (str || '').toString().trim().toLowerCase();
//       // Try to match selectedPlant against all possible plant name keys
//       const getPanelName = p => p.plantname || p.PlantName || p.plant || '';
//       const currentIndex = sorted.findIndex(
//         p => normalize(getPanelName(p)) === normalize(selectedPlant)
//       );

//       console.log('Selected:', selectedPlant, 'Panels:', sorted.map(getPanelName), 'Index:', currentIndex);

//       if (currentIndex === -1) {
//         setFromPlant('—');
//         setNextPlant('—');
//       } else {
//         setFromPlant(currentIndex > 0 ? getPanelName(sorted[currentIndex - 1]) : '—');
//         setNextPlant(currentIndex < sorted.length - 1 ? getPanelName(sorted[currentIndex + 1]) : '—');
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     handleTruckSelect(truckNo);
//     const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
//     if (checkedInTruck) {
//       setFormData(prev => ({
//         ...prev,
//         invoiceNo: checkedInTruck.invoiceNo || '',
//       }));
//     }
//   };

//   // const handleSubmit = async (type) => {
//   //   const { truckNo, dispatchDate, invoiceNo } = formData;
//   //   if (!selectedPlant) return toast.warn('Please select a plant first.');
//   //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//   //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//   //   setIsLoading(true);
//   //   try {
//   //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//   //       params: { truckNo, plantName: selectedPlant }
//   //     });
//   //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//   //     if (hasPending && !canProceed) {
//   //       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//   //       return;
//   //     }

//   //     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//   //       toast.error('🚫 This truck is already checked in!');
//   //       return;
//   //     }

//   //     if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//   //       toast.warn('🚛 Please check in the truck first before checking out.');
//   //       return;
//   //     }

//   //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//   //       truckNo,
//   //       plantName: selectedPlant,
//   //       type,
//   //       dispatchDate,
//   //       invoicenumber: type === 'Check Out' ? invoiceNo : '',
//   //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//   //     });

//   //     if (response.data.message?.includes('completed')) {
//   //       toast.success("Truck process is fully completed!");
//   //       // Optionally refresh data or update UI to reflect completed status
//   //     }

//   //     if (response.data.message?.includes('✅')) {
//   //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//   //       if (type === 'Check Out') {
//   //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//   //       } else {
//   //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//   //       }
//   //       toast.success(response.data.message);
//   //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//   //       setQuantityPanels([]);
//   //     } else {
//   //       toast.error(response.data.message || 'Failed to update status');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error:', err);
//   //     toast.error(err.response?.data?.message || 'Something went wrong.');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
// //   const handleSubmit = async (type) => {
// //   const { truckNo, dispatchDate, invoiceNo } = formData;

// //   if (!selectedPlant) return toast.warn('Please select a plant first.');
// //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
// //   if (!dispatchDate) return toast.warn('🚛 Please provide a dispatch date.');
// //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

// //   setIsLoading(true); // Set loading state to true before request
  
// //   try {
// //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
// //       params: { truckNo, plantName: selectedPlant }
// //     });

// //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
// //     if (hasPending && !canProceed) {
// //       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
// //       return;
// //     }

// //     const isTruckCheckedIn = (truckNo) => checkedInTrucks.some(t => getTruckNo(t) === truckNo);

// //     if (type === 'Check In' && isTruckCheckedIn(truckNo)) {
// //       toast.error('🚫 This truck is already checked in!');
// //       return;
// //     }

// //     if (type === 'Check Out' && !isTruckCheckedIn(truckNo)) {
// //       toast.warn('🚛 Please check in the truck first before checking out.');
// //       return;
// //     }

// //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
// //       truckNo,
// //       plantName: selectedPlant,
// //       type,
// //       dispatchDate,
// //       invoicenumber: type === 'Check Out' ? invoiceNo : '',
// //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
// //     });

// //     if (response.data.message?.includes('completed')) {
// //       toast.success("Truck process is fully completed!");
// //       // Call function to refresh truck status or update UI
// //     }

// //     if (response.data.message?.includes('✅')) {
// //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       if (type === 'Check Out') {
// //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       } else {
// //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
// //       }
// //       toast.success(response.data.message);
// //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
// //       setQuantityPanels([]);
// //     } else {
// //       toast.error(response.data.message || 'Failed to update status');
// //     }
// //   } catch (err) {
// //     console.error('Error:', err);
// //     toast.error(err.response?.data?.message || 'Something went wrong.');
// //   } finally {
// //     setIsLoading(false); // Set loading state to false after request finishes
// //   }
// // };
// // const handleSubmit = async (type) => {
// //   const { truckNo, dispatchDate, invoiceNo } = formData;

// //   if (!selectedPlant) return toast.warn('Please select a plant first.');
// //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
// //   if (!dispatchDate) return toast.warn('🚛 Please provide a dispatch date.');
// //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

// //   setIsLoading(true); // Set loading state to true before request

// //   try {
// //     // Get priority status for the current plant
// //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
// //       params: { truckNo, plantName: selectedPlant }
// //     });

// //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

// //     // Check if the truck is blocked due to a pending priority at the other plant
// //     if (hasPending && !canProceed) {
// //       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
// //       return;
// //     }

// //     const isTruckCheckedIn = (truckNo) => checkedInTrucks.some(t => getTruckNo(t) === truckNo);

// //     // Check if the truck is already checked in at this plant
// //     if (type === 'Check In' && isTruckCheckedIn(truckNo)) {
// //       toast.error('🚫 This truck is already checked in!');
// //       return;
// //     }

// //     // Check if the truck is not checked in at this plant but trying to check out
// //     if (type === 'Check Out' && !isTruckCheckedIn(truckNo)) {
// //       toast.warn('🚛 Please check in the truck first before checking out.');
// //       return;
// //     }

// //     // Proceed with the check-in/check-out process
// //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
// //       truckNo,
// //       plantName: selectedPlant,
// //       type,
// //       dispatchDate,
// //       invoicenumber: type === 'Check Out' ? invoiceNo : '',
// //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
// //     });

// //     if (response.data.message?.includes('completed')) {
// //       toast.success("Truck process is fully completed!");
// //     }

// //     if (response.data.message?.includes('✅')) {
// //       // Update UI based on check-in or check-out
// //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       if (type === 'Check Out') {
// //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       } else {
// //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
// //       }
// //       toast.success(response.data.message);
// //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
// //       setQuantityPanels([]);
// //     } else {
// //       toast.error(response.data.message || 'Failed to update status');
// //     }
// //   } catch (err) {
// //     console.error('Error:', err);
// //     toast.error(err.response?.data?.message || 'Something went wrong.');
// //   } finally {
// //     setIsLoading(false); // Set loading state to false after request finishes
// //   }
// // };

//   const handleSubmit = async (type) => {
//   const { truckNo, dispatchDate, invoiceNo } = formData;

//   // Input validation
//   if (!selectedPlant) return toast.warn('Please select a plant first.');
//   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//   if (!dispatchDate) return toast.warn('🚛 Please provide a dispatch date.');
//   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//   setIsLoading(true); // Set loading state to true before request
  
//   try {
//     // Check the priority status
//     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//       params: { truckNo, plantName: selectedPlant }
//     });

//     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//     if (hasPending && !canProceed) {
//       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       return;
//     }

//     // Check if the truck is already checked in
//     const isTruckCheckedIn = (truckNo) => checkedInTrucks.some(t => getTruckNo(t) === truckNo);

//     if (type === 'Check In' && isTruckCheckedIn(truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     if (type === 'Check Out' && !isTruckCheckedIn(truckNo)) {
//       toast.warn('🚛 Please check in the truck first before checking out.');
//       return;
//     }

//     // Sending request to the backend to update truck status
//     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//       truckNo,
//       plantName: selectedPlant,
//       type,
//       dispatchDate,
//       invoicenumber: type === 'Check Out' ? invoiceNo : '',
//       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//     });

//     console.log('API Response:', response.data); // Log the response to debug

//     // Handle successful completion
//     if (response.data.message?.includes('completed')) {
//       toast.success("Truck process is fully completed!");
//       // Optionally refresh truck status or update UI here
//     }

//     if (response.data.message?.includes('✅')) {
//       // Update UI based on the truck process
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check Out') {
//         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       } else {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//       }
//       toast.success(response.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//       setQuantityPanels([]);
//     } else {
//       toast.error(response.data.message || 'Failed to update status');
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     toast.error(err.response?.data?.message || 'Something went wrong.');
//   } finally {
//     setIsLoading(false); // Set loading state to false after request finishes
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4 md:p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Panel */}
//         <div className="space-y-6">
//           <div className="relative">
//             <select 
//               value={selectedPlant} 
//               onChange={handlePlantChange} 
//               className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               disabled={isLoading}
//             >
//               <option value="">Select Plant</option>
//               {plantList.map((plant, i) => (
//                 <option key={i} value={plant.plantname || plant.PlantName || plant.plant || getPlantName(plant)}>
//                   {plant.plantname || plant.PlantName || plant.plant || getPlantName(plant)}
//                 </option>
//               ))}
//             </select>
//             {isLoading && (
//               <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-4 h-64 overflow-y-auto border-2 border-blue-200 shadow-inner">
//             <h3 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
//               <span className="bg-blue-100 p-2 rounded-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//                   <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-3-3A1 1 0 0016 7h-1V5a1 1 0 00-1-1H3z" />
//                 </svg>
//               </span>
//               Available Trucks
//             </h3>
//             {truckNumbers.length === 0 ? (
//               <div className="text-center py-8 text-gray-500 italic">
//                 {selectedPlant ? 'No trucks available' : 'Select a plant to view trucks'}
//               </div>
//             ) : (
//               <ul className="space-y-2">
//                 {truckNumbers.map((t, i) => {
//                   const truckNo = getTruckNo(t);
//                   return (
//                     <li key={i}>
//                       <button
//                         onClick={() => handleTruckSelect(truckNo)}
//                         disabled={isLoading}
//                         className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
//                           formData.truckNo === truckNo
//                             ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-200 shadow-md'
//                             : 'hover:bg-blue-50 border-blue-100 hover:border-blue-300'
//                         } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                       >
//                         <span className="bg-blue-200 p-1 rounded-full">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//                           </svg>
//                         </span>
//                         <span className="font-medium text-blue-900">Truck {truckNo}</span>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-6">
//           <div className="relative h-56 w-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl overflow-hidden shadow-lg border-2 border-blue-200">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-1 z-10">
//               {quantityPanels.map((panel, index) => {
//                 const maxHeight = Math.max(...quantityPanels.map(p => p.quantity || 0), 1);
//                 const heightPercent = ((panel.quantity || 0) / maxHeight) * 100;
//                 const bgColors = [
//                   'bg-gradient-to-b from-green-400 to-green-600',
//                   'bg-gradient-to-b from-blue-400 to-blue-600',
//                   'bg-gradient-to-b from-yellow-400 to-yellow-600',
//                   'bg-gradient-to-b from-red-400 to-red-600'
//                 ];
//                 // Get the best plant name available
//                 const plantLabel = panel.plantname || panel.PlantName || panel.plant || 'No Plant Name';
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-xs ${bgColors[index % bgColors.length]} rounded-t-lg transition-all transform hover:scale-110 hover:shadow-xl cursor-pointer`}
//                     style={{ 
//                       height: `${heightPercent}%`, 
//                       width: `${100 / quantityPanels.length}%`,
//                       minWidth: '20px'
//                     }}
//                     title={`${plantLabel}: ${panel.quantity || 0} panels`}
//                   >
//                     <div className="flex flex-col items-center p-1">
//                       <span className="font-bold">{panel.quantity || 0}</span>
//                       <span className="text-[8px] text-center leading-tight">{plantLabel}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img 
//               src={truckImage} 
//               alt="Truck" 
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" 
//               style={{ height: '65%' }} 
//             />
//             {quantityPanels.length > 0 && (
//              <div className="absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-semibold text-blue-800">
//                    Total: {quantityPanels.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0)} panels
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4 text-center">
//             <div className="bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
//               <div className="text-xs text-blue-600 font-medium mb-1">From Plant</div>
//               <div className="text-blue-800 font-bold truncate">{fromPlant}</div>
//             </div>
//             <div className="bg-green-50 p-3 rounded-xl border-2 border-green-100">
//               <div className="text-xs text-green-600 font-medium mb-1">Next Plant</div>
//               <div className="text-green-800 font-bold truncate">{nextPlant}</div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Truck Number</label>
//               <input 
//                 name="truckNo" 
//                 value={formData.truckNo} 
//                 onChange={handleChange} 
//                 placeholder="Truck No" 
//                 className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
//                 readOnly 
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Dispatch Date</label>
//                 <input 
//                   name="dispatchDate" 
//                   type="date" 
//                   value={formData.dispatchDate} 
//                   onChange={handleChange} 
//                   className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
//                 />
//               </div>
              
//               {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
//                   <input 
//                     name="invoiceNo" 
//                     value={formData.invoiceNo} 
//                     onChange={handleChange} 
//                     placeholder="Invoice No" 
//                     className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//               <textarea 
//                 name="remarks" 
//                 readOnly 
//                 value={formData.remarks} 
//                 className="w-full border-2 border-gray-200 px-4 py-2 bg-gray-50 rounded-lg shadow-sm" 
//                 rows="3" 
//               />
//             </div>

//             <div className="flex gap-4 pt-2">
//               <button 
//                 onClick={() => handleSubmit('Check In')} 
//                 disabled={isLoading || !formData.truckNo}
//                 className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 ${
//                   isLoading || !formData.truckNo ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </>
//                 )}
//               </button>
//               <button 
//                 onClick={() => handleSubmit('Check Out')} 
//                 disabled={isLoading || !formData.truckNo}
//                 className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 ${
//                   isLoading || !formData.truckNo ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-4 h-full overflow-y-auto border-2 border-green-200 shadow-inner">
//           <h3 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
//             <span className="bg-green-100 p-2 rounded-full">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </span>
//             Checked In Trucks
//           </h3>
//           {checkedInTrucks.length === 0 ? (
//             <div className="text-center py-8 text-gray-500 italic">
//               {selectedPlant ? 'No checked-in trucks' : 'Select a plant to view checked-in trucks'}
//             </div>
//           ) : (
//             <ul className="space-y-2">
//               {checkedInTrucks.map((t, i) => {
//                 const truckNo = getTruckNo(t);
//                 return (
//                   <li key={i}>
//                     <button
//                       onClick={() => handleCheckedInClick(truckNo)}
//                       disabled={isLoading}
//                       className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
//                         formData.truckNo === truckNo
//                           ? 'bg-green-100 border-green-400 ring-2 ring-green-200 shadow-md'
//                           : 'hover:bg-green-50 border-green-100 hover:border-green-300'
//                       } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     >
//                       <span className="bg-green-200 p-1 rounded-full">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                       </span>
//                       <span className="font-medium text-green-900">Truck {truckNo}</span>
//                       {t.invoiceNo && (
//                         <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
//                           Inv: {t.invoiceNo}
//                         </span>
//                       )}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//       <ToastContainer 
//         position="top-center" 
//         autoClose={3000} 
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// }

// export default GateKeeper;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import truckImage from './assets/Truck.png.png';
import CancelButton from './CancelButton';

const API_URL = import.meta.env.VITE_API_URL;

function GateKeeper() {
  const [formData, setFormData] = useState({
    truckNo: '',
    dispatchDate: new Date().toISOString().split('T')[0],
    invoiceNo: '',
    remarks: 'This is a system-generated remark.',
  });

  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [truckNumbers, setTruckNumbers] = useState([]);
  const [checkedInTrucks, setCheckedInTrucks] = useState([]);
  const [quantityPanels, setQuantityPanels] = useState([]);
  const [fromPlant, setFromPlant] = useState('—');
  const [nextPlant, setNextPlant] = useState('—');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
    const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

    setIsLoading(true);
    axios.get(`${API_URL}/api/plants`, {
      headers: { userid: userId, role }
    })
      .then(res => {
        const filtered = res.data.filter(plant => {
          const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
          return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
        });
        setPlantList(filtered);
      })
      .catch(err => {
        console.error('❌ Error fetching plants:', err);
        toast.error('Failed to fetch plant list');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPlant) return;
    
    setIsLoading(true);
    setFormData(prev => ({
      ...prev,
      truckNo: '',
      dispatchDate: new Date().toISOString().split('T')[0],
      invoiceNo: '',
      remarks: 'This is a system-generated remark.'
    }));
    setCheckedInTrucks([]);
    setQuantityPanels([]);

    Promise.all([
      axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`),
      axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
    ])
      .then(([trucksRes, checkedInRes]) => {
        setTruckNumbers(trucksRes.data);
        setCheckedInTrucks(checkedInRes.data);
        // Auto-select the first truck if available
        if (trucksRes.data.length > 0) {
          handleTruckSelect(getTruckNo(trucksRes.data[0]));
        }
      })
      .catch(err => {
        console.error('Error fetching truck data:', err);
        toast.error('Failed to load truck data');
      })
      .finally(() => setIsLoading(false));
  }, [selectedPlant]);

  const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
  const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
  };

  const handleTruckSelect = async (truckNo) => {
    setIsLoading(true);
    setFormData(prev => ({ ...prev, truckNo }));
    try {
      const [remarksRes, quantityRes] = await Promise.all([
        axios.get(`${API_URL}/api/fetch-remarks`, {
          params: { plantName: selectedPlant, truckNo }
        }),
        axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`)
      ]);
      
      const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
      setQuantityPanels(sorted);
      setFormData(prev => ({
        ...prev,
        remarks: remarksRes.data.remarks || 'No remarks available.',
      }));
      
      const normalize = str => (str || '').toString().trim().toLowerCase();
      // Try to match selectedPlant against all possible plant name keys
      const getPanelName = p => p.plantname || p.PlantName || p.plant || '';
      const currentIndex = sorted.findIndex(
        p => normalize(getPanelName(p)) === normalize(selectedPlant)
      );

      console.log('Selected:', selectedPlant, 'Panels:', sorted.map(getPanelName), 'Index:', currentIndex);

      if (currentIndex === -1) {
        setFromPlant('—');
        setNextPlant('—');
      } else {
        setFromPlant(currentIndex > 0 ? getPanelName(sorted[currentIndex - 1]) : '—');
        setNextPlant(currentIndex < sorted.length - 1 ? getPanelName(sorted[currentIndex + 1]) : '—');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckedInClick = (truckNo) => {
    handleTruckSelect(truckNo);
    const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    if (checkedInTruck) {
      setFormData(prev => ({
        ...prev,
        invoiceNo: checkedInTruck.invoiceNo || '',
      }));
    }
  };

  // const handleSubmit = async (type) => {
  //   const { truckNo, dispatchDate, invoiceNo } = formData;
  //   if (!selectedPlant) return toast.warn('Please select a plant first.');
  //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
  //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

  //   setIsLoading(true);
  //   try {
  //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
  //       params: { truckNo, plantName: selectedPlant }
  //     });
  //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
  //     if (hasPending && !canProceed) {
  //       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
  //       return;
  //     }

  //     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
  //       toast.error('🚫 This truck is already checked in!');
  //       return;
  //     }

  //     if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
  //       toast.warn('🚛 Please check in the truck first before checking out.');
  //       return;
  //     }

  //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
  //       truckNo,
  //       plantName: selectedPlant,
  //       type,
  //       dispatchDate,
  //       invoicenumber: type === 'Check Out' ? invoiceNo : '',
  //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
  //     });

  //     if (response.data.message?.includes('completed')) {
  //       toast.success("Truck process is fully completed!");
  //       // Optionally refresh data or update UI to reflect completed status
  //     }

  //     if (response.data.message?.includes('✅')) {
  //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
  //       if (type === 'Check Out') {
  //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
  //       } else {
  //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
  //       }
  //       toast.success(response.data.message);
  //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
  //       setQuantityPanels([]);
  //     } else {
  //       toast.error(response.data.message || 'Failed to update status');
  //     }
  //   } catch (err) {
  //     console.error('Error:', err);
  //     toast.error(err.response?.data?.message || 'Something went wrong.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const handleSubmit = async (type) => {
  //   const { truckNo, dispatchDate, invoiceNo } = formData;
  
  //   if (!selectedPlant) return toast.warn('Please select a plant first.');
  //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
  //   if (!dispatchDate) return toast.warn('🚛 Please provide a dispatch date.');
  //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');
  
  //   setIsLoading(true);
    
  //   try {
  //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
  //       params: { truckNo, plantName: selectedPlant }
  //     });
  
  //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
  //     if (hasPending && !canProceed) {
  //       toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
  //       return;
  //     }
  
  //     const isTruckCheckedIn = (truckNo) => checkedInTrucks.some(t => getTruckNo(t) === truckNo);
  
  //     if (type === 'Check In' && isTruckCheckedIn(truckNo)) {
  //       toast.error('🚫 This truck is already checked in!');
  //       return;
  //     }
  
  //     if (type === 'Check Out' && !isTruckCheckedIn(truckNo)) {
  //       toast.warn('🚛 Please check in the truck first before checking out.');
  //       return;
  //     }
  
  //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
  //       truckNo,
  //       plantName: selectedPlant,
  //       type,
  //       dispatchDate,
  //       invoicenumber: type === 'Check Out' ? invoiceNo : '',
  //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
  //     });
  
  //     if (response.data.message?.includes('completed')) {
  //       toast.success("Truck process is fully completed!");
  //       // Call function to refresh truck status or update UI

  //     }
  
  //     if (response.data.message?.includes('✅')) {
  //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
  //       if (type === 'Check Out') {
  //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
  //       } else {
  //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
  //       }
  //       toast.success(response.data.message);
  //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
  //       setQuantityPanels([]);
  //     } else {
  //       toast.error(response.data.message || 'Failed to update status');
  //     }
  //   } catch (err) {
  //     console.error('Error:', err);
  //     toast.error(err.response?.data?.message || 'Something went wrong.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (type) => {
  const { truckNo, dispatchDate, invoiceNo } = formData;

  // Input validation
  if (!selectedPlant) return toast.warn('Please select a plant first.');
  if (!truckNo) return toast.warn('🚛 Please select a truck number.');
  if (!dispatchDate) return toast.warn('🚛 Please provide a dispatch date.');
  if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

  setIsLoading(true);

  try {
    // Check priority status
    const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
      params: { truckNo, plantName: selectedPlant }
    });

    const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
    if (hasPending && !canProceed) {
      toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
      return;
    }

    // Utility function to check if truck is checked in
    const isTruckCheckedIn = (truckNo) => checkedInTrucks.some(t => getTruckNo(t) === truckNo);

    // Prevent double check-in
    if (type === 'Check In' && isTruckCheckedIn(truckNo)) {
      toast.error('🚫 This truck is already checked in!');
      return;
    }

    // Prevent check-out without check-in
    if (type === 'Check Out' && !isTruckCheckedIn(truckNo)) {
      toast.warn('🚛 Please check in the truck first before checking out.');
      return;
    }

    // Send update request to the API
    const response = await axios.post(`${API_URL}/api/update-truck-status`, {
      truckNo,
      plantName: selectedPlant,
      type,
      dispatchDate,
      invoicenumber: type === 'Check Out' ? invoiceNo : undefined, // Only pass invoiceNo when Check Out
      quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0), // Calculate quantity
    });

    // Check for completion message first
     if (response.data.message?.includes('completed') || response.data.message?.includes('Truck process completed')) {
      // Show a more prominent success message for completion
      toast.success("🎉 TRUCK PROCESS FULLY COMPLETED! 🎉", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Update UI for completed truck
      setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
      setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
      setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
      setQuantityPanels([]);
      return; // Exit early since we've handled the completion case
     }
    
    // Handle regular success message
    if (response.data.message?.includes('✅')) {
      setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
      if (type === 'Check Out') {
        setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
      } else {
        setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
      }
      toast.success(response.data.message);
      setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
      setQuantityPanels([]); // Clear panels after the action
    } else {
      toast.error(response.data.message || 'Failed to update status');
    }

  } catch (err) {
    console.error('Error:', err);
    toast.error(err.response?.data?.message || 'Something went wrong.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <CancelButton />
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <div className="relative">
            <select 
              value={selectedPlant} 
              onChange={handlePlantChange} 
              className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              disabled={isLoading}
            >
              <option value="">Select Plant</option>
              {plantList.map((plant, i) => (
                <option key={i} value={plant.plantname || plant.PlantName || plant.plant || getPlantName(plant)}>
                  {plant.plantname || plant.PlantName || plant.plant || getPlantName(plant)}
                </option>
              ))}
            </select>
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-4 h-64 overflow-y-auto border-2 border-blue-200 shadow-inner">
            <h3 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-3-3A1 1 0 0016 7h-1V5a1 1 0 00-1-1H3z" />
                </svg>
              </span>
              Available Trucks
            </h3>
            {truckNumbers.length === 0 ? (
              <div className="text-center py-8 text-gray-500 italic">
                {selectedPlant ? 'No trucks available' : 'Select a plant to view trucks'}
              </div>
            ) : (
              <ul className="space-y-2">
                {truckNumbers.map((t, i) => {
                  const truckNo = getTruckNo(t);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => handleTruckSelect(truckNo)}
                        disabled={isLoading}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          formData.truckNo === truckNo
                            ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-200 shadow-md'
                            : 'hover:bg-blue-50 border-blue-100 hover:border-blue-300'
                        } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <span className="bg-blue-200 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="font-medium text-blue-900">Truck {truckNo}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Center Panel */}
        <div className="space-y-6">
          <div className="relative h-56 w-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl overflow-hidden shadow-lg border-2 border-blue-200">
            <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-1 z-10">
              {quantityPanels.map((panel, index) => {
                const maxHeight = Math.max(...quantityPanels.map(p => p.quantity || 0), 1);
                const heightPercent = ((panel.quantity || 0) / maxHeight) * 100;
                const bgColors = [
                  'bg-gradient-to-b from-green-400 to-green-600',
                  'bg-gradient-to-b from-blue-400 to-blue-600',
                  'bg-gradient-to-b from-yellow-400 to-yellow-600',
                  'bg-gradient-to-b from-red-400 to-red-600'
                ];
                // Get the best plant name available
                const plantLabel = panel.plantname || panel.PlantName || panel.plant || 'No Plant Name';
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-end text-white text-xs ${bgColors[index % bgColors.length]} rounded-t-lg transition-all transform hover:scale-110 hover:shadow-xl cursor-pointer`}
                    style={{ 
                      height: `${heightPercent}%`, 
                      width: `${100 / quantityPanels.length}%`,
                      minWidth: '20px'
                    }}
                    title={`${plantLabel}: ${panel.quantity || 0} panels`}
                  >
                    <div className="flex flex-col items-center p-1">
                      <span className="font-bold">{panel.quantity || 0}</span>
                      <span className="text-[8px] text-center leading-tight">{plantLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <img 
              src={truckImage} 
              alt="Truck" 
              className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" 
              style={{ height: '65%' }} 
            />
            {quantityPanels.length > 0 && (
             <div className="absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-semibold text-blue-800">
                   Total: {quantityPanels.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0)} panels
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
              <div className="text-xs text-blue-600 font-medium mb-1">From Plant</div>
              <div className="text-blue-800 font-bold truncate">{fromPlant}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-xl border-2 border-green-100">
              <div className="text-xs text-green-600 font-medium mb-1">Next Plant</div>
              <div className="text-green-800 font-bold truncate">{nextPlant}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Truck Number</label>
              <input 
                name="truckNo" 
                value={formData.truckNo} 
                onChange={handleChange} 
                placeholder="Truck No" 
                className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                readOnly 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dispatch Date</label>
                <input 
                  name="dispatchDate" 
                  type="date" 
                  value={formData.dispatchDate} 
                  onChange={handleChange} 
                  className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              
              {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
                  <input 
                    name="invoiceNo" 
                    value={formData.invoiceNo} 
                    onChange={handleChange} 
                    placeholder="Invoice No" 
                    className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea 
                name="remarks" 
                readOnly 
                value={formData.remarks} 
                className="w-full border-2 border-gray-200 px-4 py-2 bg-gray-50 rounded-lg shadow-sm" 
                rows="3" 
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => handleSubmit('Check In')} 
                disabled={isLoading || !formData.truckNo}
                className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 ${
                  isLoading || !formData.truckNo ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Check In
                  </>
                )}
              </button>
              <button 
                onClick={() => handleSubmit('Check Out')} 
                disabled={isLoading || !formData.truckNo}
                className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 ${
                  isLoading || !formData.truckNo ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Check Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-4 h-full overflow-y-auto border-2 border-green-200 shadow-inner">
          <h3 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
            <span className="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            Checked In Trucks
          </h3>
          {checkedInTrucks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 italic">
              {selectedPlant ? 'No checked-in trucks' : 'Select a plant to view checked-in trucks'}
            </div>
          ) : (
            <ul className="space-y-2">
              {checkedInTrucks.map((t, i) => {
                const truckNo = getTruckNo(t);
                return (
                  <li key={i}>
                    <button
                      onClick={() => handleCheckedInClick(truckNo)}
                      disabled={isLoading}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        formData.truckNo === truckNo
                          ? 'bg-green-100 border-green-400 ring-2 ring-green-200 shadow-md'
                          : 'hover:bg-green-50 border-green-100 hover:border-green-300'
                      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <span className="bg-green-200 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="font-medium text-green-900">Truck {truckNo}</span>
                      {t.invoiceNo && (
                        <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                          Inv: {t.invoiceNo}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
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
    </div>
  );
}

export default GateKeeper;