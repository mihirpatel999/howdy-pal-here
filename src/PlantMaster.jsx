

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2 } from 'lucide-react';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function PlantMaster() {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlantId, setSelectedPlantId] = useState('');
//   const [showEditButton, setShowEditButton] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//     }
//   };

//   const handlePlantSelect = (e) => {
//     const value = e.target.value;
//     const id = parseInt(value, 10);
//     if (isNaN(id)) {
//       setSelectedPlantId('');
//       setShowEditButton(false);
//       return;
//     }
//     setSelectedPlantId(id);
//     setShowEditButton(true);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlantId) return;
//     try {
//       const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
//       const data = res.data;
//       if (data && data.plantId) {
//         setFormData({
//           plantId: data.plantId,
//           plantName: data.plantName,
//           plantAddress: data.plantAddress,
//           contactPerson: data.contactPerson,
//           mobileNo: data.mobileNo,
//           remarks: data.remarks
//         });
//         setEditMode(true);
//       } else {
//         alert('❌ Invalid plant selected or no data found');
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//       alert('❌ Error fetching plant data');
//     }
//   };

//   // ✅ SOFT DELETE plant
//   const handleDelete = async (plantId) => {
//     if (confirm('Are you sure you want to delete this plant?')) {
//       try {
//         await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
//         alert('✅ Plant deleted successfully!');
//         fetchPlants();
//       } catch (err) {
//         console.error('Error deleting plant:', err);
//         alert('❌ Failed to delete plant');
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'plantName' ? value.toUpperCase() : value
//     });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlantId('');
//     setShowEditButton(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const duplicate = plantList.some(plant =>
//       plant.plantname?.toUpperCase() === formData.plantName.toUpperCase() &&
//       plant.plantid !== formData.plantId
//     );

//     if (duplicate) {
//       alert('❌ Plant with same name already exists!');
//       return;
//     }

//     try {
//       if (formData.plantId) {
//         await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
//         alert('✅ Plant updated successfully!');
//       } else {
//         await axios.post(`${API_URL}/api/plant-master`, formData);
//         alert('✅ Plant saved successfully!');
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       alert('❌ Error saving/updating plant');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
//         <CancelButton />
//         <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-700">Plant Master Admin</h2>

//         {!editMode && (
//           <div className="mb-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Select Plant to Edit</label>
//               <select value={selectedPlantId} onChange={handlePlantSelect} className="block w-full p-2 border rounded-lg border-gray-300">
//                 <option value="">-- Select --</option>
//                 {plantList.map((plant) => (
//                   <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                     {(plant.plantname || plant.plantName)?.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {showEditButton && (
//               <button onClick={handleEditClick} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
//                 ✏️ Edit Selected Plant
//               </button>
//             )}

//             <button onClick={() => setEditMode(true)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//               ➕ Add New Plant
//             </button>
//           </div>
//         )}

//         {/* Table Desktop */}
//         {!editMode && (
//           <div>
//             <div className="hidden md:block overflow-auto">
//               <table className="min-w-full border text-center text-sm">
//                 <thead className="bg-blue-700 text-white">
//                   <tr>
//                     <th className="px-3 py-2">ID</th>
//                     <th className="px-3 py-2">Name</th>
//                     <th className="px-3 py-2">Address</th>
//                     <th className="px-3 py-2">Contact</th>
//                     <th className="px-3 py-2">Mobile</th>
//                     <th className="px-3 py-2">Remarks</th>
//                     <th className="px-3 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {plantList.map((plant) => (
//                     <tr key={plant.plantid || plant.plantId} className="border-b hover:bg-gray-50">
//                       <td className="px-3 py-2">{plant.plantid || plant.plantId}</td>
//                       <td className="px-3 py-2">{(plant.plantname || plant.plantName)?.toUpperCase()}</td>
//                       <td className="px-3 py-2">{plant.plantaddress || plant.plantAddress}</td>
//                       <td className="px-3 py-2">{plant.contactperson || plant.contactPerson}</td>
//                       <td className="px-3 py-2">{plant.mobileno || plant.mobileNo}</td>
//                       <td className="px-3 py-2">{plant.remarks}</td>
//                       <td className="px-3 py-2 space-x-2">
//                         <button onClick={() => { setSelectedPlantId(plant.plantid || plant.plantId); handleEditClick(); }} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
//                           <Pencil size={16} />
//                         </button>
//                         <button onClick={() => handleDelete(plant.plantid || plant.plantId)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
//                           <Trash2 size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card View */}
//             <div className="block md:hidden space-y-3">
//               {plantList.map((plant) => (
//                 <div key={plant.plantid || plant.plantId} className="border border-gray-300 rounded p-3 shadow-sm bg-white">
//                   <p className="text-sm"><span className="font-semibold">ID:</span> {plant.plantid || plant.plantId}</p>
//                   <p className="text-sm"><span className="font-semibold">Name:</span> {(plant.plantname || plant.plantName)?.toUpperCase()}</p>
//                   <p className="text-sm"><span className="font-semibold">Address:</span> {plant.plantaddress || plant.plantAddress}</p>
//                   <p className="text-sm"><span className="font-semibold">Contact:</span> {plant.contactperson || plant.contactPerson}</p>
//                   <p className="text-sm"><span className="font-semibold">Mobile:</span> {plant.mobileno || plant.mobileNo}</p>
//                   <p className="text-sm"><span className="font-semibold">Remarks:</span> {plant.remarks}</p>
//                   <div className="flex gap-2 mt-2">
//                     <button onClick={() => { setSelectedPlantId(plant.plantid || plant.plantId); handleEditClick(); }} className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600">
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(plant.plantid || plant.plantId)} className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {editMode && (
//           <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium">Plant Name</label>
//                 <input type="text" name="plantName" value={formData.plantName} onChange={handleChange} required className="w-full p-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Contact Person</label>
//                 <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full p-2 border rounded" />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium">Address</label>
//                 <textarea name="plantAddress" value={formData.plantAddress} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Mobile No</label>
//                 <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="w-full p-2 border rounded" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Remarks</label>
//                 <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full p-2 border rounded" />
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 {formData.plantId ? 'Update' : 'Save'}
//               </button>
//               <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
//                 Back
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }////////// fully working code  

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, ChevronLeft, Search } from 'lucide-react';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function PlantMaster() {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlantId, setSelectedPlantId] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//     }
//   };

//   const filteredPlants = plantList.filter(plant => {
//     const plantName = (plant.plantname || plant.plantName || '').toLowerCase();
//     return plantName.includes(searchTerm.toLowerCase());
//   });

//   const handlePlantSelect = (e) => {
//     const id = parseInt(e.target.value, 10);
//     setSelectedPlantId(isNaN(id) ? '' : id);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlantId) return;
//     try {
//       const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
//       const data = res.data;
//       if (data?.plantId) {
//         setFormData({
//           plantId: data.plantId,
//           plantName: data.plantName,
//           plantAddress: data.plantAddress,
//           contactPerson: data.contactPerson,
//           mobileNo: data.mobileNo,
//           remarks: data.remarks
//         });
//         setEditMode(true);
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//     }
//   };

//   const handleDelete = async (plantId) => {
//     if (window.confirm('Are you sure you want to delete this plant?')) {
//       try {
//         await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
//         fetchPlants();
//       } catch (err) {
//         console.error('Error deleting plant:', err);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'plantName' ? value.toUpperCase() : value
//     });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlantId('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.plantId) {
//         await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
//       } else {
//         await axios.post(`${API_URL}/api/plant-master`, formData);
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       console.error('Error saving plant:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {editMode && (
//                 <button 
//                   onClick={handleBack}
//                   className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors"
//                   aria-label="Back"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//               )}
//               <h1 className="text-2xl md:text-3xl font-bold text-white">
//                 {editMode ? (formData.plantId ? 'Edit Plant' : 'Add New Plant') : 'Plant Master Admin'}
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           {!editMode ? (
//             <>
//               {/* Controls Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search className="text-gray-400" size={18} />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search plants..."
//                       className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <select
//                     value={selectedPlantId}
//                     onChange={handlePlantSelect}
//                     className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select Plant</option>
//                     {plantList.map((plant) => (
//                       <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                         {(plant.plantname || plant.plantName)?.toUpperCase()}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={handleEditClick}
//                     disabled={!selectedPlantId}
//                     className={`p-3 rounded-lg flex items-center ${selectedPlantId ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
//                     title="Edit selected plant"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors"
//                 >
//                   <Plus size={18} />
//                   <span>Add New Plant</span>
//                 </button>
//               </div>

//               {/* Plant List - Desktop */}
//               <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
//                       <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredPlants.map((plant) => (
//                       <tr key={plant.plantid || plant.plantId} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.plantid || plant.plantId}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {(plant.plantname || plant.plantName)?.toUpperCase()}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.plantaddress || plant.plantAddress}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.contactperson || plant.contactPerson}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.mobileno || plant.mobileNo}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.remarks}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             <button
//                               onClick={() => {
//                                 setSelectedPlantId(plant.plantid || plant.plantId);
//                                 handleEditClick();
//                               }}
//                               className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-50 transition-colors"
//                               title="Edit"
//                             >
//                               <Pencil size={16} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                               className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Plant List - Mobile */}
//               <div className="md:hidden space-y-3">
//                 {filteredPlants.map((plant) => (
//                   <div key={plant.plantid || plant.plantId} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-lg font-medium text-gray-900">
//                           {(plant.plantname || plant.plantName)?.toUpperCase()}
//                         </h3>
//                         <p className="text-sm text-gray-500">ID: {plant.plantid || plant.plantId}</p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => {
//                             setSelectedPlantId(plant.plantid || plant.plantId);
//                             handleEditClick();
//                           }}
//                           className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
//                           title="Edit"
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                           className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
//                           title="Delete"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mt-3 space-y-1">
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Address:</span> {plant.plantaddress || plant.plantAddress}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Contact:</span> {plant.contactperson || plant.contactPerson}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Mobile:</span> {plant.mobileno || plant.mobileNo}
//                       </p>
//                       {plant.remarks && (
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Remarks:</span> {plant.remarks}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             /* Edit/Add Form */
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name *</label>
//                   <input
//                     type="text"
//                     name="plantName"
//                     value={formData.plantName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter plant name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter contact person"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <textarea
//                     name="plantAddress"
//                     value={formData.plantAddress}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter plant address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter mobile number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                   <input
//                     type="text"
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Enter remarks"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
//                 >
//                   <span>{formData.plantId ? 'Update Plant' : 'Save Plant'}</span>
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, ChevronLeft, Search } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function PlantMaster() {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlantId, setSelectedPlantId] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//       toast.error('Failed to load plants. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredPlants = plantList.filter(plant => {
//     const plantName = (plant.plantname || plant.plantName || '').toLowerCase();
//     const plantAddress = (plant.plantaddress || plant.plantAddress || '').toLowerCase();
//     return (
//       plantName.includes(searchTerm.toLowerCase()) ||
//       plantAddress.includes(searchTerm.toLowerCase())
//     );
//   });

//   const handlePlantSelect = (e) => {
//     const id = parseInt(e.target.value, 10);
//     setSelectedPlantId(isNaN(id) ? '' : id);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlantId) return;
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
//       const data = res.data;
//       if (data?.plantId) {
//         setFormData({
//           plantId: data.plantId,
//           plantName: data.plantName,
//           plantAddress: data.plantAddress,
//           contactPerson: data.contactPerson,
//           mobileNo: data.mobileNo,
//           remarks: data.remarks
//         });
//         setEditMode(true);
//         toast.success('Plant data loaded successfully');
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//       toast.error('Failed to load plant data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (plantId) => {
//     if (window.confirm('Are you sure you want to delete this plant?')) {
//       setIsLoading(true);
//       try {
//         await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
//         fetchPlants();
//         toast.success('Plant deleted successfully');
//       } catch (err) {
//         console.error('Error deleting plant:', err);
//         toast.error('Failed to delete plant');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'plantName' ? value.toUpperCase() : value
//     });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlantId('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.plantName.trim()) {
//       toast.error('Plant name is required');
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       if (formData.plantId) {
//         await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
//         toast.success('Plant updated successfully');
//       } else {
//         await axios.post(`${API_URL}/api/plant-master`, formData);
//         toast.success('Plant created successfully');
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       console.error('Error saving plant:', err);
//       toast.error('Failed to save plant');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
      
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {editMode && (
//                 <button 
//                   onClick={handleBack}
//                   className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
//                   aria-label="Back"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//               )}
//               <h1 className="text-2xl md:text-3xl font-bold text-white">
//                 {editMode ? (formData.plantId ? 'Edit Plant' : 'Add New Plant') : 'Plant Master'}
//               </h1>
//             </div>
//             {!editMode && (
//               <div className="hidden md:block">
//                 <span className="text-blue-100 text-sm">
//                   {plantList.length} {plantList.length === 1 ? 'plant' : 'plants'} registered
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           {!editMode ? (
//             <>
//               {/* Controls Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search className="text-gray-400" size={18} />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search plants by name or address..."
//                       className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm('')}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <select
//                     value={selectedPlantId}
//                     onChange={handlePlantSelect}
//                     className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjUwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
//                   >
//                     <option value="">Select Plant</option>
//                     {plantList.map((plant) => (
//                       <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                         {(plant.plantname || plant.plantName)?.toUpperCase()}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={handleEditClick}
//                     disabled={!selectedPlantId || isLoading}
//                     className={`p-3 rounded-lg flex items-center transition duration-200 ${selectedPlantId && !isLoading ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
//                     title="Edit selected plant"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-6">
//                 <div className="text-sm text-gray-500">
//                   Showing {filteredPlants.length} of {plantList.length} plants
//                 </div>
//                 <button
//                   onClick={() => setEditMode(true)}
//                   disabled={isLoading}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <Plus size={18} />
//                   <span>Add New Plant</span>
//                 </button>
//               </div>

//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//               )}

//               {/* Plant List - Desktop */}
//               {!isLoading && (
//                 <>
//                   <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
//                           <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredPlants.length > 0 ? (
//                           filteredPlants.map((plant) => (
//                             <tr key={plant.plantid || plant.plantId} className="hover:bg-gray-50 transition-colors duration-150">
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.plantid || plant.plantId}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </td>
//                               <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.plantaddress || plant.plantAddress}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.contactperson || plant.contactPerson}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.mobileno || plant.mobileNo}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 <div className="flex justify-end space-x-2">
//                                   <button
//                                     onClick={() => {
//                                       setSelectedPlantId(plant.plantid || plant.plantId);
//                                       handleEditClick();
//                                     }}
//                                     className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 transition-colors duration-200"
//                                     title="Edit"
//                                   >
//                                     <Pencil size={16} />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                     className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
//                                     title="Delete"
//                                   >
//                                     <Trash2 size={16} />
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                               {searchTerm ? 'No plants match your search' : 'No plants found'}
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Plant List - Mobile */}
//                   <div className="md:hidden space-y-3">
//                     {filteredPlants.length > 0 ? (
//                       filteredPlants.map((plant) => (
//                         <div key={plant.plantid || plant.plantId} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </h3>
//                               <p className="text-xs text-gray-500 mt-1">ID: {plant.plantid || plant.plantId}</p>
//                             </div>
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => {
//                                   setSelectedPlantId(plant.plantid || plant.plantId);
//                                   handleEditClick();
//                                 }}
//                                 className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50 transition-colors duration-200"
//                                 title="Edit"
//                               >
//                                 <Pencil size={16} />
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                 className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="mt-3 space-y-2">
//                             <div className="flex items-start">
//                               <span className="text-xs font-medium text-gray-500 w-20">Address:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.plantaddress || plant.plantAddress}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Contact:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.contactperson || plant.contactPerson}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Mobile:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.mobileno || plant.mobileNo}</span>
//                             </div>
//                             {plant.remarks && (
//                               <div className="flex items-start">
//                                 <span className="text-xs font-medium text-gray-500 w-20">Remarks:</span>
//                                 <span className="text-sm text-gray-700 flex-1">{plant.remarks}</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
//                         <p className="text-gray-500">
//                           {searchTerm ? 'No plants match your search' : 'No plants found'}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             /* Edit/Add Form */
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="plantName"
//                     value={formData.plantName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
//                     placeholder="Enter plant name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
//                     placeholder="Enter contact person"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <textarea
//                     name="plantAddress"
//                     value={formData.plantAddress}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
//                     placeholder="Enter plant address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
//                     placeholder="Enter mobile number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                   <input
//                     type="text"
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
//                     placeholder="Enter remarks"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={isLoading}
//                   className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <span>{formData.plantId ? 'Update Plant' : 'Save Plant'}</span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }///////////  working   



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, ChevronLeft, Search, X } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion } from 'framer-motion';

// const API_URL = import.meta.env.VITE_API_URL;

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
// };

// export default function PlantMaster({ onClose }) {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlantId, setSelectedPlantId] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//       toast.error('Failed to load plants. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredPlants = plantList.filter(plant => {
//     const plantName = (plant.plantname || plant.plantName || '').toLowerCase();
//     const plantAddress = (plant.plantaddress || plant.plantAddress || '').toLowerCase();
//     return (
//       plantName.includes(searchTerm.toLowerCase()) ||
//       plantAddress.includes(searchTerm.toLowerCase())
//     );
//   });

//   const handlePlantSelect = (e) => {
//     const id = parseInt(e.target.value, 10);
//     setSelectedPlantId(isNaN(id) ? '' : id);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlantId) return;
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
//       const data = res.data;
//       if (data?.plantId) {
//         setFormData({
//           plantId: data.plantId,
//           plantName: data.plantName,
//           plantAddress: data.plantAddress,
//           contactPerson: data.contactPerson,
//           mobileNo: data.mobileNo,
//           remarks: data.remarks
//         });
//         setEditMode(true);
//         toast.success('Plant data loaded successfully');
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//       toast.error('Failed to load plant data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (plantId) => {
//     if (window.confirm('Are you sure you want to delete this plant?')) {
//       setIsLoading(true);
//       try {
//         await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
//         fetchPlants();
//         toast.success('Plant deleted successfully');
//       } catch (err) {
//         console.error('Error deleting plant:', err);
//         toast.error('Failed to delete plant');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'plantName' ? value.toUpperCase() : value
//     });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlantId('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.plantName.trim()) {
//       toast.error('Plant name is required');
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       if (formData.plantId) {
//         await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
//         toast.success('Plant updated successfully');
//       } else {
//         await axios.post(`${API_URL}/api/plant-master`, formData);
//         toast.success('Plant created successfully');
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       console.error('Error saving plant:', err);
//       toast.error('Failed to save plant');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
      
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
//       >
//         {/* Header */}
//         <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
//           <div className="absolute top-4 right-4">
//             {!editMode && onClose && (
//               <button 
//                 onClick={onClose}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
//                 aria-label="Close"
//               >
//                 <X size={24} />
//               </button>
//             )}
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {editMode && (
//                 <button 
//                   onClick={handleBack}
//                   className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
//                   aria-label="Back"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//               )}
//               <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
//                 {editMode ? (formData.plantId ? 'Edit Plant' : 'Add New Plant') : 'Plant Master'}
//               </h1>
//             </div>
//             {!editMode && (
//               <div className="hidden md:block">
//                 <span className="text-blue-100/90 text-sm bg-white/10 px-3 py-1 rounded-full">
//                   {plantList.length} {plantList.length === 1 ? 'plant' : 'plants'} registered
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           {!editMode ? (
//             <>
//               {/* Controls Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search className="text-gray-400" size={18} />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search plants by name or address..."
//                       className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 bg-white/80 backdrop-blur-sm"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm('')}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors duration-200"
//                       >
//                         <svg className="h-5 w-5 text-gray-400 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <select
//                     value={selectedPlantId}
//                     onChange={handlePlantSelect}
//                     className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjUwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
//                   >
//                     <option value="">Select Plant</option>
//                     {plantList.map((plant) => (
//                       <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                         {(plant.plantname || plant.plantName)?.toUpperCase()}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={handleEditClick}
//                     disabled={!selectedPlantId || isLoading}
//                     className={`p-3 rounded-lg flex items-center transition-all duration-200 ${selectedPlantId && !isLoading ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
//                     title="Edit selected plant"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-6">
//                 <div className="text-sm text-gray-500">
//                   Showing {filteredPlants.length} of {plantList.length} plants
//                 </div>
//                 <motion.button
//                   onClick={() => setEditMode(true)}
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <Plus size={18} />
//                   <span>Add New Plant</span>
//                 </motion.button>
//               </div>

//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//               )}

//               {/* Plant List - Desktop */}
//               {!isLoading && (
//                 <>
//                   <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
//                           <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredPlants.length > 0 ? (
//                           filteredPlants.map((plant) => (
//                             <motion.tr 
//                               key={plant.plantid || plant.plantId} 
//                               initial="hidden"
//                               animate="visible"
//                               variants={fadeIn}
//                               className="hover:bg-gray-50/80 transition-colors duration-150"
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.plantid || plant.plantId}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </td>
//                               <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.plantaddress || plant.plantAddress}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.contactperson || plant.contactPerson}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.mobileno || plant.mobileNo}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 <div className="flex justify-end space-x-2">
//                                   <button
//                                     onClick={() => {
//                                       setSelectedPlantId(plant.plantid || plant.plantId);
//                                       handleEditClick();
//                                     }}
//                                     className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 transition-all duration-200 hover:scale-110"
//                                     title="Edit"
//                                   >
//                                     <Pencil size={16} />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                     className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-all duration-200 hover:scale-110"
//                                     title="Delete"
//                                   >
//                                     <Trash2 size={16} />
//                                   </button>
//                                 </div>
//                               </td>
//                             </motion.tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                               {searchTerm ? 'No plants match your search' : 'No plants found'}
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Plant List - Mobile */}
//                   <div className="md:hidden space-y-3">
//                     {filteredPlants.length > 0 ? (
//                       filteredPlants.map((plant) => (
//                         <motion.div 
//                           key={plant.plantid || plant.plantId}
//                           initial="hidden"
//                           animate="visible"
//                           variants={fadeIn}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
//                         >
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </h3>
//                               <p className="text-xs text-gray-500 mt-1">ID: {plant.plantid || plant.plantId}</p>
//                             </div>
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => {
//                                   setSelectedPlantId(plant.plantid || plant.plantId);
//                                   handleEditClick();
//                                 }}
//                                 className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50 transition-all duration-200 hover:scale-110"
//                                 title="Edit"
//                               >
//                                 <Pencil size={16} />
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                 className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-all duration-200 hover:scale-110"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="mt-3 space-y-2">
//                             <div className="flex items-start">
//                               <span className="text-xs font-medium text-gray-500 w-20">Address:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.plantaddress || plant.plantAddress}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Contact:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.contactperson || plant.contactPerson}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Mobile:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.mobileno || plant.mobileNo}</span>
//                             </div>
//                             {plant.remarks && (
//                               <div className="flex items-start">
//                                 <span className="text-xs font-medium text-gray-500 w-20">Remarks:</span>
//                                 <span className="text-sm text-gray-700 flex-1">{plant.remarks}</span>
//                               </div>
//                             )}
//                           </div>
//                         </motion.div>
//                       ))
//                     ) : (
//                       <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
//                         <p className="text-gray-500">
//                           {searchTerm ? 'No plants match your search' : 'No plants found'}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             /* Edit/Add Form */
//             <motion.form 
//               onSubmit={handleSubmit} 
//               className="space-y-6"
//               initial="hidden"
//               animate="visible"
//               variants={fadeIn}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     name="plantName"
//                     value={formData.plantName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
//                     placeholder="Enter plant name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
//                     placeholder="Enter contact person"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <textarea
//                     name="plantAddress"
//                     value={formData.plantAddress}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
//                     placeholder="Enter plant address"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
//                     placeholder="Enter mobile number"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                   <input
//                     type="text"
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm bg-white/80 backdrop-blur-sm"
//                     placeholder="Enter remarks"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                 <motion.button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <span>{formData.plantId ? 'Update Plant' : 'Save Plant'}</span>
//                   )}
//                 </motion.button>
//               </div>
//             </motion.form>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }///////////////// FINAL CODE WORKING  



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pencil, Trash2, Plus, ChevronLeft, Search, X } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';

// const API_URL = import.meta.env.VITE_API_URL;

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
// };

// export default function PlantMaster({ onClose }) {
//   const [formData, setFormData] = useState({
//     plantId: null,
//     plantName: '',
//     plantAddress: '',
//     contactPerson: '',
//     mobileNo: '',
//     remarks: ''
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlantId, setSelectedPlantId] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMobileFab, setShowMobileFab] = useState(true);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('Error fetching plant list:', err);
//       toast.error('Failed to load plants. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredPlants = plantList.filter(plant => {
//     const plantName = (plant.plantname || plant.plantName || '').toLowerCase();
//     const plantAddress = (plant.plantaddress || plant.plantAddress || '').toLowerCase();
//     return (
//       plantName.includes(searchTerm.toLowerCase()) ||
//       plantAddress.includes(searchTerm.toLowerCase())
//     );
//   });

//   const handlePlantSelect = (e) => {
//     const id = parseInt(e.target.value, 10);
//     setSelectedPlantId(isNaN(id) ? '' : id);
//   };

//   const handleEditClick = async () => {
//     if (!selectedPlantId) return;
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
//       const data = res.data;
//       if (data?.plantId) {
//         setFormData({
//           plantId: data.plantId,
//           plantName: data.plantName,
//           plantAddress: data.plantAddress,
//           contactPerson: data.contactPerson,
//           mobileNo: data.mobileNo,
//           remarks: data.remarks
//         });
//         setEditMode(true);
//         setShowMobileFab(false);
//         toast.success('Plant data loaded successfully');
//       }
//     } catch (err) {
//       console.error('Error fetching plant:', err);
//       toast.error('Failed to load plant data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (plantId) => {
//     if (window.confirm('Are you sure you want to delete this plant?')) {
//       setIsLoading(true);
//       try {
//         await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
//         fetchPlants();
//         toast.success('Plant deleted successfully');
//       } catch (err) {
//         console.error('Error deleting plant:', err);
//         toast.error('Failed to delete plant');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'plantName' ? value.toUpperCase() : value
//     });
//   };

//   const handleBack = () => {
//     setFormData({
//       plantId: null,
//       plantName: '',
//       plantAddress: '',
//       contactPerson: '',
//       mobileNo: '',
//       remarks: ''
//     });
//     setEditMode(false);
//     setSelectedPlantId('');
//     setShowMobileFab(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.plantName.trim()) {
//       toast.error('Plant name is required');
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       if (formData.plantId) {
//         await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
//         toast.success('Plant updated successfully');
//       } else {
//         await axios.post(`${API_URL}/api/plant-master`, formData);
//         toast.success('Plant created successfully');
//       }
//       fetchPlants();
//       handleBack();
//     } catch (err) {
//       console.error('Error saving plant:', err);
//       toast.error('Failed to save plant');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
      
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
//           <div className="absolute top-4 right-4">
//             {!editMode && onClose && (
//               <button 
//                 onClick={onClose}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
//                 aria-label="Close"
//               >
//                 <X size={24} />
//               </button>
//             )}
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {editMode && (
//                 <button 
//                   onClick={handleBack}
//                   className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
//                   aria-label="Back"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//               )}
//               <h1 className="text-2xl md:text-3xl font-bold text-white font-sans">
//                 {editMode ? (formData.plantId ? 'Edit Plant' : 'Add New Plant') : 'Plant Master'}
//               </h1>
//             </div>
//             {!editMode && (
//               <div className="hidden md:block">
//                 <span className="text-indigo-100/90 text-sm bg-white/10 px-3 py-1 rounded-full">
//                   {plantList.length} {plantList.length === 1 ? 'plant' : 'plants'} registered
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           {!editMode ? (
//             <>
//               {/* Controls Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="md:col-span-2">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search className="text-gray-400" size={18} />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search plants by name or address..."
//                       className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 bg-white/80"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm('')}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-indigo-600 transition-colors duration-200"
//                       >
//                         <X size={16} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <select
//                     value={selectedPlantId}
//                     onChange={handlePlantSelect}
//                     className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjUwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
//                   >
//                     <option value="">Select Plant</option>
//                     {plantList.map((plant) => (
//                       <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                         {(plant.plantname || plant.plantName)?.toUpperCase()}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={handleEditClick}
//                     disabled={!selectedPlantId || isLoading}
//                     className={`p-3 rounded-xl flex items-center transition-all duration-200 ${selectedPlantId && !isLoading ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
//                     title="Edit selected plant"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-6">
//                 <div className="text-sm text-gray-500">
//                   Showing {filteredPlants.length} of {plantList.length} plants
//                 </div>
//                 <motion.button
//                   onClick={() => {
//                     setEditMode(true);
//                     setShowMobileFab(false);
//                   }}
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="hidden md:flex bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-xl items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <Plus size={18} />
//                   <span>Add New Plant</span>
//                 </motion.button>
//               </div>

//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//                 </div>
//               )}

//               {/* Plant List - Desktop */}
//               {!isLoading && (
//                 <>
//                   <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                         <tr>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
//                           <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredPlants.length > 0 ? (
//                           filteredPlants.map((plant) => (
//                             <motion.tr 
//                               key={plant.plantid || plant.plantId} 
//                               initial="hidden"
//                               animate="visible"
//                               variants={fadeIn}
//                               className="hover:bg-gray-50/80 transition-colors duration-150"
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.plantid || plant.plantId}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </td>
//                               <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.plantaddress || plant.plantAddress}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.contactperson || plant.contactPerson}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.mobileno || plant.mobileNo}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 <div className="flex justify-end space-x-2">
//                                   <button
//                                     onClick={() => {
//                                       setSelectedPlantId(plant.plantid || plant.plantId);
//                                       handleEditClick();
//                                     }}
//                                     className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-50 transition-all duration-200 hover:scale-110"
//                                     title="Edit"
//                                   >
//                                     <Pencil size={16} />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                     className="text-rose-600 hover:text-rose-800 p-2 rounded-full hover:bg-rose-50 transition-all duration-200 hover:scale-110"
//                                     title="Delete"
//                                   >
//                                     <Trash2 size={16} />
//                                   </button>
//                                 </div>
//                               </td>
//                             </motion.tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                               {searchTerm ? 'No plants match your search' : 'No plants found'}
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Plant List - Mobile */}
//                   <div className="md:hidden space-y-4">
//                     {filteredPlants.length > 0 ? (
//                       filteredPlants.map((plant) => (
//                         <motion.div 
//                           key={plant.plantid || plant.plantId}
//                           initial="hidden"
//                           animate="visible"
//                           variants={cardVariants}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
//                         >
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 {(plant.plantname || plant.plantName)?.toUpperCase()}
//                               </h3>
//                               <p className="text-xs text-gray-500 mt-1">ID: {plant.plantid || plant.plantId}</p>
//                             </div>
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => {
//                                   setSelectedPlantId(plant.plantid || plant.plantId);
//                                   handleEditClick();
//                                 }}
//                                 className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-50 transition-all duration-200 hover:scale-110"
//                                 title="Edit"
//                               >
//                                 <Pencil size={16} />
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(plant.plantid || plant.plantId)}
//                                 className="text-rose-600 hover:text-rose-800 p-2 rounded-full hover:bg-rose-50 transition-all duration-200 hover:scale-110"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="mt-3 space-y-2">
//                             <div className="flex items-start">
//                               <span className="text-xs font-medium text-gray-500 w-20">Address:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.plantaddress || plant.plantAddress}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Contact:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.contactperson || plant.contactPerson}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className="text-xs font-medium text-gray-500 w-20">Mobile:</span>
//                               <span className="text-sm text-gray-700 flex-1">{plant.mobileno || plant.mobileNo}</span>
//                             </div>
//                             {plant.remarks && (
//                               <div className="flex items-start">
//                                 <span className="text-xs font-medium text-gray-500 w-20">Remarks:</span>
//                                 <span className="text-sm text-gray-700 flex-1">{plant.remarks}</span>
//                               </div>
//                             )}
//                           </div>
//                         </motion.div>
//                       ))
//                     ) : (
//                       <motion.div 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center"
//                       >
//                         <p className="text-gray-500">
//                           {searchTerm ? 'No plants match your search' : 'No plants found'}
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           ) : (
//             /* Edit/Add Form */
//             <motion.form 
//               onSubmit={handleSubmit} 
//               className="space-y-6"
//               initial="hidden"
//               animate="visible"
//               variants={fadeIn}
//             >
//               <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-inner">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name <span className="text-rose-500">*</span></label>
//                     <input
//                       type="text"
//                       name="plantName"
//                       value={formData.plantName}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
//                       placeholder="Enter plant name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
//                     <input
//                       type="text"
//                       name="contactPerson"
//                       value={formData.contactPerson}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
//                       placeholder="Enter contact person"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                     <textarea
//                       name="plantAddress"
//                       value={formData.plantAddress}
//                       onChange={handleChange}
//                       rows={3}
//                       className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
//                       placeholder="Enter plant address"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                     <input
//                       type="tel"
//                       name="mobileNo"
//                       value={formData.mobileNo}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
//                       placeholder="Enter mobile number"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//                     <input
//                       type="text"
//                       name="remarks"
//                       value={formData.remarks}
//                       onChange={handleChange}
//                       className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
//                       placeholder="Enter remarks"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <motion.button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <span>{formData.plantId ? 'Update Plant' : 'Save Plant'}</span>
//                   )}
//                 </motion.button>
//               </div>
//             </motion.form>
//           )}
//         </div>
//       </motion.div>

//       {/* Mobile Floating Action Button */}
//       <AnimatePresence>
//         {showMobileFab && !editMode && (
//           <motion.button
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             onClick={() => {
//               setEditMode(true);
//               setShowMobileFab(false);
//             }}
//             className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 z-10"
//             whileTap={{ scale: 0.95 }}
//           >
//             <Plus size={24} />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, ChevronLeft, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export default function PlantMaster({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plantId: null,
    plantName: '',
    plantAddress: '',
    contactPerson: '',
    mobileNo: '',
    remarks: ''
  });

  const [plantList, setPlantList] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFab, setShowMobileFab] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/plants`);
      setPlantList(res.data);
    } catch (err) {
      console.error('Error fetching plant list:', err);
      toast.error('Failed to load plants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlants = plantList.filter(plant => {
    const plantName = (plant.plantname || plant.plantName || '').toLowerCase();
    const plantAddress = (plant.plantaddress || plant.plantAddress || '').toLowerCase();
    return (
      plantName.includes(searchTerm.toLowerCase()) ||
      plantAddress.includes(searchTerm.toLowerCase())
    );
  });

  const handlePlantSelect = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedPlantId(isNaN(id) ? '' : id);
  };

  const handleEditClick = async () => {
    if (!selectedPlantId) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
      const data = res.data;
      if (data?.plantId) {
        setFormData({
          plantId: data.plantId,
          plantName: data.plantName,
          plantAddress: data.plantAddress,
          contactPerson: data.contactPerson,
          mobileNo: data.mobileNo,
          remarks: data.remarks
        });
        setEditMode(true);
        setShowMobileFab(false);
        toast.success('Plant data loaded successfully');
      }
    } catch (err) {
      console.error('Error fetching plant:', err);
      toast.error('Failed to load plant data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (plantId) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
        fetchPlants();
        toast.success('Plant deleted successfully');
      } catch (err) {
        console.error('Error deleting plant:', err);
        toast.error('Failed to delete plant');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'plantName' ? value.toUpperCase() : value
    });
  };

  const handleBack = () => {
    setFormData({
      plantId: null,
      plantName: '',
      plantAddress: '',
      contactPerson: '',
      mobileNo: '',
      remarks: ''
    });
    setEditMode(false);
    setSelectedPlantId('');
    setShowMobileFab(true);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/home'); // Navigate to home if no onClose prop provided
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if plant name is empty
    if (!formData.plantName.trim()) {
      toast.error('Plant name is required');
      return;
    }
    
    // Check for duplicate plant name (case-insensitive)
    const isDuplicate = plantList.some(plant => {
      const existingName = (plant.plantname || plant.plantName || '').toLowerCase();
      const newName = formData.plantName.toLowerCase();
      // Skip check if we're editing the same plant
      return (plant.plantid || plant.plantId) !== formData.plantId && 
             existingName === newName;
    });
    
    if (isDuplicate) {
      toast.error('Plant already exists! Please delete the existing plant or use a different name.');
      return;
    }
    
    setIsLoading(true);
    try {
      if (formData.plantId) {
        await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
        toast.success('Plant updated successfully');
      } else {
        await axios.post(`${API_URL}/api/plant-master`, formData);
        toast.success('Plant created successfully');
      }
      fetchPlants();
      handleBack();
    } catch (err) {
      console.error('Error saving plant:', err);
      toast.error('Failed to save plant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {editMode && (
                <button 
                  onClick={handleBack}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Back"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-white font-sans">
                {editMode ? (formData.plantId ? 'Edit Plant' : 'Add New Plant') : 'Plant Master'}
              </h1>
            </div>
            {!editMode && (
              <div className="hidden md:block">
                <span className="text-indigo-100/90 text-sm bg-white/10 px-3 py-1 rounded-full">
                  {plantList.length} {plantList.length === 1 ? 'plant' : 'plants'} registered
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {!editMode ? (
            <>
              {/* Controls Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder="Search plants by name or address..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 bg-white/80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <select
                    value={selectedPlantId}
                    onChange={handlePlantSelect}
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjUwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                  >
                    <option value="">Select Plant</option>
                    {plantList.map((plant) => (
                      <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
                        {(plant.plantname || plant.plantName)?.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleEditClick}
                    disabled={!selectedPlantId || isLoading}
                    className={`p-3 rounded-xl flex items-center transition-all duration-200 ${selectedPlantId && !isLoading ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    title="Edit selected plant"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Showing {filteredPlants.length} of {plantList.length} plants
                </div>
                <motion.button
                  onClick={() => {
                    setEditMode(true);
                    setShowMobileFab(false);
                  }}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="hidden md:flex bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-xl items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                  <span>Add New Plant</span>
                </motion.button>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              )}

              {/* Plant List - Desktop */}
              {!isLoading && (
                <>
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPlants.length > 0 ? (
                          filteredPlants.map((plant) => (
                            <motion.tr 
                              key={plant.plantid || plant.plantId} 
                              initial="hidden"
                              animate="visible"
                              variants={fadeIn}
                              className="hover:bg-gray-50/80 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.plantid || plant.plantId}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {(plant.plantname || plant.plantName)?.toUpperCase()}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plant.plantaddress || plant.plantAddress}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.contactperson || plant.contactPerson}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.mobileno || plant.mobileNo}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => {
                                      setSelectedPlantId(plant.plantid || plant.plantId);
                                      handleEditClick();
                                    }}
                                    className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-50 transition-all duration-200 hover:scale-110"
                                    title="Edit"
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(plant.plantid || plant.plantId)}
                                    className="text-rose-600 hover:text-rose-800 p-2 rounded-full hover:bg-rose-50 transition-all duration-200 hover:scale-110"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                              {searchTerm ? 'No plants match your search' : 'No plants found'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Plant List - Mobile */}
                  <div className="md:hidden space-y-4">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => (
                        <motion.div 
                          key={plant.plantid || plant.plantId}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {(plant.plantname || plant.plantName)?.toUpperCase()}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">ID: {plant.plantid || plant.plantId}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedPlantId(plant.plantid || plant.plantId);
                                  handleEditClick();
                                }}
                                className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-50 transition-all duration-200 hover:scale-110"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(plant.plantid || plant.plantId)}
                                className="text-rose-600 hover:text-rose-800 p-2 rounded-full hover:bg-rose-50 transition-all duration-200 hover:scale-110"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start">
                              <span className="text-xs font-medium text-gray-500 w-20">Address:</span>
                              <span className="text-sm text-gray-700 flex-1">{plant.plantaddress || plant.plantAddress}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-gray-500 w-20">Contact:</span>
                              <span className="text-sm text-gray-700 flex-1">{plant.contactperson || plant.contactPerson}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-gray-500 w-20">Mobile:</span>
                              <span className="text-sm text-gray-700 flex-1">{plant.mobileno || plant.mobileNo}</span>
                            </div>
                            {plant.remarks && (
                              <div className="flex items-start">
                                <span className="text-xs font-medium text-gray-500 w-20">Remarks:</span>
                                <span className="text-sm text-gray-700 flex-1">{plant.remarks}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center"
                      >
                        <p className="text-gray-500">
                          {searchTerm ? 'No plants match your search' : 'No plants found'}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            /* Edit/Add Form */
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="plantName"
                      value={formData.plantName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
                      placeholder="Enter plant name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
                      placeholder="Enter contact person"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="plantAddress"
                      value={formData.plantAddress}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
                      placeholder="Enter plant address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <input
                      type="text"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm bg-white/90"
                      placeholder="Enter remarks"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{formData.plantId ? 'Update Plant' : 'Save Plant'}</span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>

      {/* Mobile Floating Action Button */}
      <AnimatePresence>
        {showMobileFab && !editMode && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => {
              setEditMode(true);
              setShowMobileFab(false);
            }}
            className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 z-10"
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

