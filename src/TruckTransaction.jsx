import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiTruck, FiX } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckTransaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transactionId: null, truckNo: '', transactionDate: '', cityName: '',
    transporter: '', amountPerTon: '', truckWeight: '', deliverPoint: '', remarks: ''
  });
  const [plantList, setPlantList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRow, setNewRow] = useState({
    detailId: null, plantName: '', loadingSlipNo: '', qty: '',
    priority: '', remarks: '', freight: 'To Pay', checkinstatus: 0, checkoutstatus: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  useEffect(() => {
    // Support both navigation state formats
    const truckNo = location?.state?.truckNo || location?.state?.truck?.truckno;
    if (truckNo) fetchTruckDetails(truckNo);
  }, [location?.state]);

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`)
      .then(res => setPlantList(res.data))
      .catch(err => console.error('Error fetching plants:', err));
  }, []);

  const fetchTruckDetails = async (truckNo) => {
    try {
      const res = await axios.get(`${API_URL}/api/truck-transaction/${truckNo}`);
      const { master, details } = res.data;
      setFormData({
        transactionId: master.transactionid,
        truckNo: master.truckno,
        transactionDate: master.transactiondate?.split('T')[0] || '',
        cityName: master.cityname,
        transporter: master.transporter,
        amountPerTon: master.amountperton,
        truckWeight: master.truckweight,
        deliverPoint: master.deliverpoint,
        remarks: master.remarks
      });
      setTableData(
        details
          .reduce((unique, row) => {
            const key = `${row.plantname}-${row.loadingslipno}-${row.priority}`;
            if (!unique.some(r => `${r.plantName}-${r.loadingSlipNo}-${r.priority}` === key)) {
              unique.push({
                detailId: row.detailid,
                plantName: row.plantname || '',
                plantId: row.plantid,
                loadingSlipNo: row.loadingslipno,
                qty: row.qty,
                priority: row.priority,
                remarks: row.remarks,
                freight: row.freight,
                checkinstatus: row.checkinstatus,
                checkoutstatus: row.checkoutstatus
              });
            }
            return unique;
          }, [])
      );
      // Store locked rows
      // setLockedRows(
      //   details.filter(
      //     row =>
      //       (row.checkinstatus === 1 || row.checkoutstatus === 1) &&
      //       !(row.checkinstatus === 1 && row.checkoutstatus === 1)
      //   )
      // );
      toast.success('Truck details loaded successfully');
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('🚫 Truck is already in transport. Please complete Check-Out first.');
      } else if (err.response?.status === 404) {
        toast.info('Truck not found. You can create a new transaction.');
      } else {
        console.error('Error loading truck details:', err);
        toast.error('Failed to load truck details.');
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'truckNo') {
      value = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 11).toUpperCase();
      setFormData({ ...formData, truckNo: value });
    } else if (name === 'priority' || name === 'qty') {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'priority') {
        setTableData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editingIndex][name] = value;
          return updatedData;
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === 'priority' || name === 'qty') {
      cleanedValue = value.replace(/[^0-9]/g, '');
    }

    setNewRow({ ...newRow, [name]: cleanedValue });
  };

  const handleRowChange = (idx, e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === 'priority' || name === 'qty') {
      cleanedValue = value.replace(/[^0-9]/g, '');
    }

    const updated = [...tableData];
    if (name === 'plantId') {
      updated[idx][name] = cleanedValue;
      const selectedPlant = plantList.find(p => String(p.plantid) === String(cleanedValue));
      updated[idx]['plantName'] = selectedPlant ? selectedPlant.plantname : '';
    } else if (name === 'plantName') {
      // Prevent plantName from being set to an ID
      const selectedPlant = plantList.find(p => p.plantname === cleanedValue);
      updated[idx]['plantId'] = selectedPlant ? selectedPlant.plantid : '';
      updated[idx][name] = cleanedValue;
    } else {
      updated[idx][name] = cleanedValue;
    }
    setTableData(updated);
  };

  const handleEditRow = (idx) => {
    const row = tableData[idx];
    
    // Check if the row is locked (checked in or checked out)
    if (!(row.checkinstatus === 0 || row.checkinstatus === null) || 
        !(row.checkoutstatus === 0 || row.checkoutstatus === null)) {
      toast.error('Cannot edit this plant entry as it has been checked in or checked out');
      return;
    }
    
    setEditingIndex(idx);
  };

  const handleUpdateRow = (idx) => {
    const updatedPriority = tableData[idx].priority;
    const duplicate = tableData.some((row, i) => i !== idx && row.priority === updatedPriority);
    if (duplicate) {
      toast.error(`Priority ${updatedPriority} already exists in another row. Please choose a different priority.`);
      return;
    }
    setEditingIndex(null);
    toast.success('Row updated successfully');
  };

  const handleDeleteRow = async (idx) => {
    const row = tableData[idx];
    
    // Check if the row is locked (checked in or checked out)
    if (!(row.checkinstatus === 0 || row.checkinstatus === null) || 
        !(row.checkoutstatus === 0 || row.checkoutstatus === null)) {
      toast.error('Cannot delete this plant entry as it has been checked in or checked out');
      return;
    }
    
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this plant entry?');
    if (!confirmed) return;
    
    // If the row has a detailId, delete from backend
    if (row.detailId) {
      try {
        const response = await axios.delete(`${API_URL}/api/truck-transaction/detail/${row.detailId}`);
        if (response.data.success) {
          toast.success('Row deleted from backend successfully');
        } else {
          toast.error(response.data.message || 'Failed to delete row');
          return;
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error(error.response.data.message || 'Cannot delete this plant entry as it has been checked in or checked out');
          return;
        }
        toast.error('Failed to delete row from backend');
        return; // Don't remove from UI if backend delete failed
      }
    }
    // Remove from frontend state
    setTableData(tableData.filter((_, i) => i !== idx));
    setEditingIndex(null);
    toast.success('Row deleted successfully');
  };

  const addOrUpdateRow = () => {
    if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty || !newRow.priority) {
      toast.error("Please fill all required fields in the new row.");
      return;
    }

    const selectedPlants = tableData.map(r => r.plantName);
    if (selectedPlants.includes(newRow.plantName)) {
      toast.error(`Plant ${newRow.plantName} is already selected.`);
      return;
    }

    const existingPriorities = tableData.map(r => r.priority);
    if (existingPriorities.includes(newRow.priority)) {
      toast.error(`Priority ${newRow.priority} already exists. Please choose a different priority.`);
      return;
    }

    setTableData([...tableData, { ...newRow, detailId: null, checkinstatus: 0, checkoutstatus: 0 }]);
    setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay', checkinstatus: 0, checkoutstatus: 0 });
    toast.success('New row added successfully');
  };

  const requiredFormFields = [
    'truckNo', 'transactionDate', 'cityName', 'deliverPoint', 'truckWeight'
  ];

  const requiredTableFields = ['plantName', 'loadingSlipNo', 'qty', 'priority'];

  const validateForm = () => {
    for (const field of requiredFormFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        toast.error(`Please fill all mandatory fields.`);
        return false;
      }
    }
    for (const [i, row] of tableData.entries()) {
      for (const field of requiredTableFields) {
        if (!row[field] || row[field].toString().trim() === '') {
          toast.error(`Please fill all mandatory fields in the table (row ${i + 1}).`);
          return false;
        }
      }
    }
    return true;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) return;

  //   const sanitizedFormData = {
  //     ...formData,
  //     amountPerTon: formData.amountPerTon === "" ? null : formData.amountPerTon,
  //     truckWeight: formData.truckWeight === "" ? null : formData.truckWeight
  //   };

  //   const sanitizedTableData = tableData.map(row => ({
  //     ...row,
  //     plantId: row.plantId, // always include plantId
  //     plantName: row.plantName || getPlantName(row.plantId), // always include plantName for display
  //     qty: row.qty === "" ? null : row.qty,
  //     priority: row.priority === "" ? null : row.priority,
  //     checkinstatus: row.checkinstatus || 0, // preserve checkinstatus
  //     checkoutstatus: row.checkoutstatus || 0 // preserve checkoutstatus
  //   }));

  //   let dataToSubmit = [...sanitizedTableData];
  //   const isNewRowFilled = newRow.plantName || newRow.loadingSlipNo || newRow.qty || newRow.priority || newRow.remarks;
  //   if (isNewRowFilled) {
  //     if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty || !newRow.priority) {
  //       toast.error("Please fill all required fields in the new row before submitting.");
  //       return;
  //     }
  //     const selectedPlants = tableData.map(r => r.plantName);
  //     if (selectedPlants.includes(newRow.plantName)) {
  //       toast.error(`Plant ${newRow.plantName} is already selected.`);
  //       return;
  //     }
  //     const existingPriorities = tableData.map(r => r.priority);
  //     if (existingPriorities.includes(newRow.priority)) {
  //       toast.error(`Priority ${newRow.priority} already exists. Please choose a different priority.`);
  //       return;
  //     }
  //     dataToSubmit.push({ ...newRow, detailId: null, checkinstatus: 0, checkoutstatus: 0 });
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${API_URL}/api/truck-transaction`, { 
  //       formData: sanitizedFormData, 
  //       tableData: dataToSubmit 
  //     });
  //     if (response.data.success) {
  //       toast.success('Transaction saved successfully!');
  //       setFormData({
  //         transactionId: null, truckNo: '', transactionDate: '', cityName: '',
  //         transporter: '', truckWeight: '', deliverPoint: '', remarks: ''
  //       });
  //       setTableData([]);
  //       setNewRow({ detailId: null, plantName: '', loadingSlipNo: '', qty: '', priority: '', remarks: '', freight: 'To Pay', checkinstatus: 0, checkoutstatus: 0 });
  //     } else {
  //       toast.error('Error saving transaction.');
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Server response error:', error.response.data);
  //       toast.error(error.response.data.message || 'Server error while submitting data.');
  //     } else {
  //       console.error('Error:', error);
  //       toast.error('Server error while submitting data.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    // Validate the form before submitting
    if (!validateForm()) return;
  
    // Sanitize form data (ensure null values are handled correctly)
    const sanitizedFormData = {
      ...formData,
      amountPerTon: formData.amountPerTon === "" ? null : formData.amountPerTon,
      truckWeight: formData.truckWeight === "" ? null : formData.truckWeight,
    };

    // Only include rows that are NOT locked (not checked-in or checked-out)
    const unlockedTableData = tableData.filter(
      (row) => row.checkinstatus !== 1 && row.checkoutstatus !== 1
    );
  
    // If new row is filled, validate before pushing to dataToSubmit
    let dataToSubmit = [...unlockedTableData];
    const isNewRowFilled =
      newRow.plantName || newRow.loadingSlipNo || newRow.qty || newRow.priority || newRow.remarks;
    
    if (isNewRowFilled) {
      // Check if new row is valid
      if (!newRow.plantName || !newRow.loadingSlipNo || !newRow.qty || !newRow.priority) {
        toast.error("Please fill all required fields in the new row before submitting.");
        return;
      }
  
      const selectedPlants = tableData.map((r) => r.plantName);
      if (selectedPlants.includes(newRow.plantName)) {
        toast.error(`Plant ${newRow.plantName} is already selected.`);
        return;
      }
  
      const existingPriorities = tableData.map((r) => r.priority);
      if (existingPriorities.includes(newRow.priority)) {
        toast.error(`Priority ${newRow.priority} already exists. Please choose a different priority.`);
        return;
      }
  
      // Add new row data to dataToSubmit
      dataToSubmit.push({
        ...newRow,
        detailId: null,
        checkinstatus: 0, // Default checkinstatus
        checkoutstatus: 0, // Default checkoutstatus
      });
    }
  
    // Show loading state while submitting
    setIsLoading(true);
    
    try {
      // Log sanitized data for debugging
      console.log('Data to submit:', { formData: sanitizedFormData, tableData: dataToSubmit });
  
      // Submit the data using axios POST request
      const response = await axios.post(`${API_URL}/api/truck-transaction`, {
        formData: sanitizedFormData,
        tableData: dataToSubmit,
      });
  
      if (response.data.success) {
        toast.success("Transaction saved successfully!");
        
        // Reset form and table data on success
        setFormData({
          transactionId: null,
          truckNo: "",
          transactionDate: "",
          cityName: "",
          transporter: "",
          truckWeight: "",
          deliverPoint: "",
          remarks: "",
        });
        setTableData([]);
        setNewRow({
          detailId: null,
          plantName: "",
          loadingSlipNo: "",
          qty: "",
          priority: "",
          remarks: "",
          freight: "To Pay",
          checkinstatus: 0,
          checkoutstatus: 0,
          checkinTime: null,  // Reset checkinTime
          checkoutTime: null, // Reset checkoutTime
        });
      } else {
        toast.error("Error saving transaction.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server response error:", error.response.data);
        toast.error(error.response.data.message || "Server error while submitting data.");
      } else {
        console.error("Error:", error);
        toast.error("Server error while submitting data.");
      }
    } finally {
      setIsLoading(false); // Hide loading state after the request completes
    }
  };
  
  
  const handleClose = () => {
     navigate('/home'); 
    toast.info('Transaction form closed');
  };

  const selectedPlants = tableData.map((r, idx) => idx === editingIndex ? null : r.plantName);

  const getPlantName = (plantid) => {
    const plant = plantList.find(p => p.plantid === plantid);
    return plant ? plant.plantname : plantid; // fallback to id if not found
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-4 px-2 sm:px-6">
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                  <FiTruck className="mr-2 text-blue-600" />
                  Truck Transaction
                </h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1">Manage truck transportation details</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Close"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Truck Information Section */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Truck Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Truck No {requiredStar}
                  </label>
                  <input
                    type="text"
                    name="truckNo"
                    maxLength={11}
                    value={formData.truckNo}
                    onChange={handleChange}
                    placeholder="Enter Truck No"
                    className="w-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                {[
                  { field: 'transactionDate', label: 'Transaction Date', type: 'date', required: true },
                  { field: 'cityName', label: 'City Name', type: 'text', required: true },
                  { field: 'transporter', label: 'Transporter', type: 'text' }
                ].map(({ field, label, type, required }) => (
                  <div key={field}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      {label}{required && requiredStar}
                    </label>
                    <input 
                      type={type}
                      name={field} 
                      value={formData[field]} 
                      onChange={handleChange}
                      className="w-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Details Table */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Transaction Details</h2>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant{requiredStar}</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slip No{requiredStar}</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty{requiredStar}</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority{requiredStar}</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((row, idx) => (
                          <tr key={idx} className={editingIndex === idx ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                            {editingIndex === idx ? (
                              <>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <select 
                                    name="plantId"
                                    value={row.plantId}
                                    onChange={(e) => handleRowChange(idx, e)}
                                    className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="">Select</option>
                                    {plantList.map((p) => (
                                      <option key={p.plantid} value={p.plantid}>{p.plantname}</option>
                                    ))}
                                  </select>
                                </td>
                                {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
                                  <td key={name} className="px-3 py-2 whitespace-nowrap">
                                    <input 
                                      name={name} 
                                      value={row[name]} 
                                      onChange={(e) => handleRowChange(idx, e)}
                                      className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </td>
                                ))}
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <select 
                                    name="freight" 
                                    value={row.freight} 
                                    onChange={(e) => handleRowChange(idx, e)}
                                    className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="To Pay">To Pay</option>
                                    <option value="Paid">Paid</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <button 
                                    onClick={() => handleUpdateRow(idx)}
                                    className="px-2 py-1 text-xs sm:text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                                  >
                                    <FiSave className="mr-1" /> Save
                                  </button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                  {
                                    plantList.some(p => p.plantname === row.plantName)
                                      ? row.plantName
                                      : getPlantName(row.plantId)
                                  }
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.loadingSlipNo}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.qty}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.priority}</td>
                                <td className="px-3 py-2 text-xs sm:text-sm text-gray-500">{row.remarks}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span className={`px-1.5 py-0.5 text-xxs sm:text-xs rounded-full ${
                                    row.freight === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {row.freight}
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium">
                                  <div className="flex space-x-1">
                                    <button 
                                      onClick={() => {
                                        // Only call handleEditRow if both checkinstatus and checkoutstatus are 0 or null
                                        if ((row.checkinstatus === 0 || row.checkinstatus === null) && 
                                            (row.checkoutstatus === 0 || row.checkoutstatus === null)) {
                                          handleEditRow(idx);
                                        }
                                      }}
                                      className={`text-blue-600 p-1 rounded-md transition-colors ${!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null) ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-900 hover:bg-blue-50'}`}
                                      title={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null) ? "Editing disabled for this plant" : "Edit"}
                                      disabled={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null)}
                                      aria-disabled={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null)}
                                    >
                                      <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </button>
                                    <button 
                                      onClick={() => {
                                        // Only call handleDeleteRow if both checkinstatus and checkoutstatus are 0 or null
                                        if ((row.checkinstatus === 0 || row.checkinstatus === null) && 
                                            (row.checkoutstatus === 0 || row.checkoutstatus === null)) {
                                          handleDeleteRow(idx);
                                        }
                                      }}
                                      className={`text-red-600 p-1 rounded-md transition-colors ${!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null) ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-900 hover:bg-red-50'}`}
                                      title={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null) ? "Delete disabled for this plant" : "Delete"}
                                      disabled={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null)}
                                      aria-disabled={!(row.checkinstatus === 0 || row.checkinstatus === null) || !(row.checkoutstatus === 0 || row.checkoutstatus === null)}
                                    >
                                      <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap">
                            <select 
                              name="plantName" 
                              value={newRow.plantName} 
                              onChange={handleNewRowChange}
                              className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select</option>
                              {plantList
                                .filter(p => !selectedPlants.includes(p.plantname))
                                .map((p, i) => (
                                  <option key={i} value={p.plantname}>{p.plantname}</option>
                                ))}
                            </select>
                          </td>
                          {['loadingSlipNo', 'qty', 'priority', 'remarks'].map(name => (
                            <td key={name} className="px-3 py-2 whitespace-nowrap">
                              <input 
                                name={name} 
                                value={newRow[name]} 
                                onChange={handleNewRowChange}
                                className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                          ))}
                          <td className="px-3 py-2 whitespace-nowrap">
                            <select 
                              name="freight" 
                              value={newRow.freight} 
                              onChange={handleNewRowChange}
                              className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="To Pay">To Pay</option>
                              <option value="Paid">Paid</option>
                            </select>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <button 
                              onClick={addOrUpdateRow}
                              className="px-2 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                              <FiPlus className="mr-1" /> Add
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[  
                { field: 'amountPerTon', label: 'Amount Per Ton' },
                { field: 'deliverPoint', label: 'Deliver Point', required: true },
                { field: 'truckWeight', label: 'Truck Weight (In Ton)', required: true }
              ].map(({ field, label, required }) => (
                <div key={field}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {label}{required && requiredStar}
                  </label>
                  <input 
                    name={field} 
                    value={formData[field]} 
                    onChange={handleChange}
                    className="w-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea 
                name="remarks" 
                value={formData.remarks} 
                onChange={handleChange} 
                rows="2"
                className="w-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-1 sm:mr-2" />
                    Submit Transaction
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}