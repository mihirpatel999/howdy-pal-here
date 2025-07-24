// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;

// const iconEdit = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M5 19h14v2H5v-2zm14.7-13.3a1 1 0 0 0-1.4 0l-2 2 3.4 3.4 2-2a1 1 0 0 0 0-1.4l-2-2zm-3.4 2L5 17.3V21h3.7L19.3 8.7l-3.4-3.4z"/>
//   </svg>
// );

// const iconDelete = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
//   </svg>
// );

// const UserRegister = () => {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlant: '' });

//   useEffect(() => {
//     fetchUsers();
//     fetchPlants();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_URL}/api/users`);
//       if (!response.ok) throw new Error('Failed to fetch users');
//       const data = await response.json();

//       const normalized = data.map(u => ({
//         Username: u.username,
//         Password: u.password,
//         Role: u.role,
//         AllowedPlant: u.allowed_plant || ''
//       }));

//       setUsers(normalized);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/plantmaster`);
//       if (!response.ok) throw new Error('Failed to fetch plant data');
//       const data = await response.json();
//       setPlants(data); // format: [{ PlantId: 1, PlantName: 'Ahmedabad' }]
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//     }
//   };

//   const getPlantName = (plantId) => {
//     const plant = plants.find(p => p.PlantId === Number(plantId));
//     return plant ? plant.PlantName : plantId;
//   };

//   const handleDelete = async (username) => {
//     if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) throw new Error('Failed to delete user');
//       setUsers(users.filter(u => u.Username !== username));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEdit = (user, idx) => {
//     setEditIdx(idx);
//     setEditUser({ ...user });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (username) => {
//     if (!editUser.Username.trim() || !editUser.Password.trim()) {
//       alert("Username and Password are required.");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: editUser.Username,
//           password: editUser.Password,
//           role: editUser.Role,
//           allowed_plant: editUser.AllowedPlant
//         })
//       });
//       if (!response.ok) throw new Error('Failed to update user');
//       setUsers(users.map(u => (u.Username === username ? editUser : u)));
//       setEditIdx(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEditCancel = () => {
//     setEditIdx(null);
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
//       <h2 style={{
//         fontWeight: 'bold',
//         fontSize: '2rem',
//         marginBottom: '1.5rem',
//         color: '#1a237e',
//         letterSpacing: 1
//       }}>User Register</h2>

//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div style={{ color: 'red' }}>{error}</div>
//       ) : (
//         <div style={{
//           overflowX: 'auto',
//           borderRadius: 16,
//           background: '#f4f6fa',
//           boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
//         }}>
//           <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 900 }}>
//             <thead>
//               <tr style={{ background: '#1976d2', color: '#fff' }}>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>User</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Password</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Role</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Allowed Plant</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Edit</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
//                     No users found.
//                   </td>
//                 </tr>
//               ) : users.map((user, idx) => (
//                 <tr key={idx} style={{
//                   background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc'
//                 }}>
//                   {editIdx === idx ? (
//                     <>
//                       <td>
//                         <input
//                           name="Username"
//                           value={editUser.Username}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           name="Password"
//                           value={editUser.Password}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <select
//                           name="Role"
//                           value={editUser.Role}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         >
//                           <option value="Admin">Admin</option>
//                           <option value="User">User</option>
//                           <option value="Dispatcher">Dispatcher</option>
//                           <option value="GateKeeper">GateKeeper</option>
//                           <option value="Report">Report</option>
//                           <option value="Loader">Loader</option>
//                         </select>
//                       </td>
//                       <td>
//                         <select
//                           name="AllowedPlant"
//                           value={editUser.AllowedPlant}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         >
//                           <option value="">Select Plant</option>
//                           {plants.map(plant => (
//                             <option key={plant.PlantId} value={plant.PlantId}>
//                               {plant.PlantName}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td colSpan={2} style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
//                         <button
//                           onClick={() => handleEditSave(user.Username)}
//                           style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Save</button>
//                         <button
//                           onClick={handleEditCancel}
//                           style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Username}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{'*'.repeat(user.Password?.length || 8)}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Role}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{getPlantName(user.AllowedPlant)}</td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleEdit(user, idx)}
//                           style={{ background: '#ffc107', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Edit"
//                         >{iconEdit}</button>
//                       </td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleDelete(user.Username)}
//                           style={{ background: '#e53935', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Delete"
//                         >{iconDelete}</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRegister;///////////////////////// working code 

// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;

// const iconEdit = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M5 19h14v2H5v-2zm14.7-13.3a1 1 0 0 0-1.4 0l-2 2 3.4 3.4 2-2a1 1 0 0 0 0-1.4l-2-2zm-3.4 2L5 17.3V21h3.7L19.3 8.7l-3.4-3.4z" />
//   </svg>
// );

// const iconDelete = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
//   </svg>
// );

// const UserRegister = () => {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlant: '' });

//   useEffect(() => {
//     fetchUsers();
//     fetchPlants();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_URL}/api/users`);
//       if (!response.ok) throw new Error('Failed to fetch users');
//       const data = await response.json();

//       const normalized = data.map(u => ({
//         Username: u.username,
//         Password: u.password,
//         Role: u.role,
//         AllowedPlant: u.allowedplants || ''
//       }));

//       setUsers(normalized);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/plantmaster`);
//       if (!response.ok) throw new Error('Failed to fetch plant data');
//       const data = await response.json();

//       const formatted = data.map(p => ({
//         PlantId: p.plantid,
//         PlantName: p.plantname
//       }));

//       setPlants(formatted);
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//     }
//   };

//   const getPlantName = (plantIdsStr) => {
//     if (!plantIdsStr) return '';
//     const ids = plantIdsStr.split(',').map(id => id.trim());
//     const names = ids.map(id => {
//       const plant = plants.find(p => p.PlantId === Number(id));
//       return plant ? plant.PlantName : id;
//     });
//     return names.join(', ');
//   };

//   const handleDelete = async (username) => {
//     if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) throw new Error('Failed to delete user');
//       setUsers(users.filter(u => u.Username !== username));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEdit = (user, idx) => {
//     setEditIdx(idx);
//     setEditUser({ ...user });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (username) => {
//     if (!editUser.Username.trim() || !editUser.Password.trim()) {
//       alert("Username and Password are required.");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: editUser.Username,
//           password: editUser.Password,
//           role: editUser.Role,
//           contactnumber: '', // optional
//           allowedplants: editUser.AllowedPlant
//         })
//       });
//       if (!response.ok) throw new Error('Failed to update user');
//       setUsers(users.map(u => (u.Username === username ? editUser : u)));
//       setEditIdx(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEditCancel = () => {
//     setEditIdx(null);
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
//       <h2 style={{
//         fontWeight: 'bold',
//         fontSize: '2rem',
//         marginBottom: '1.5rem',
//         color: '#1a237e',
//         letterSpacing: 1
//       }}>User Register</h2>

//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div style={{ color: 'red' }}>{error}</div>
//       ) : (
//         <div style={{
//           overflowX: 'auto',
//           borderRadius: 16,
//           background: '#f4f6fa',
//           boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
//         }}>
//           <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 900 }}>
//             <thead>
//               <tr style={{ background: '#1976d2', color: '#fff' }}>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>User</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Password</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Role</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Allowed Plant</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Edit</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
//                     No users found.
//                   </td>
//                 </tr>
//               ) : users.map((user, idx) => (
//                 <tr key={idx} style={{
//                   background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc'
//                 }}>
//                   {editIdx === idx ? (
//                     <>
//                       <td>
//                         <input
//                           name="Username"
//                           value={editUser.Username}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           name="Password"
//                           value={editUser.Password}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <select
//                           name="Role"
//                           value={editUser.Role}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         >
//                           <option value="Admin">Admin</option>
//                           <option value="User">User</option>
//                           <option value="Dispatcher">Dispatcher</option>
//                           <option value="GateKeeper">GateKeeper</option>
//                           <option value="Report">Report</option>
//                           <option value="Loader">Loader</option>
//                         </select>
//                       </td>
//                       <td>
//                         <select
//                           name="AllowedPlant"
//                           multiple
//                           value={editUser.AllowedPlant.split(',')}
//                           onChange={(e) => {
//                             const selectedValues = Array.from(e.target.selectedOptions).map(opt => opt.value);
//                             setEditUser(prev => ({
//                               ...prev,
//                               AllowedPlant: selectedValues.join(',')
//                             }));
//                           }}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd', height: '80px' }}
//                         >
//                           {plants.map(plant => (
//                             <option key={plant.PlantId} value={plant.PlantId}>
//                               {plant.PlantName}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td colSpan={2} style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
//                         <button
//                           onClick={() => handleEditSave(user.Username)}
//                           style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Save</button>
//                         <button
//                           onClick={handleEditCancel}
//                           style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Username}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{'*'.repeat(user.Password?.length || 8)}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Role}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{getPlantName(user.AllowedPlant)}</td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleEdit(user, idx)}
//                           style={{ background: '#ffc107', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Edit"
//                         >{iconEdit}</button>
//                       </td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleDelete(user.Username)}
//                           style={{ background: '#e53935', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Delete"
//                         >{iconDelete}</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRegister;///final code

//////////////////


// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin','User','Dispatcher','GateKeeper','Report','Loader'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showPlantDropdown, setShowPlantDropdown] = useState(false);

//   useEffect(() => {
//     fetchAll();
//     // click‐outside to close dropdowns
//     const handler = e => {
//       if (!e.target.closest('.role-dropdown'))  setShowRoleDropdown(false);
//       if (!e.target.closest('.plant-dropdown')) setShowPlantDropdown(false);
//     };
//     window.addEventListener('click', handler);
//     return () => window.removeEventListener('click', handler);
//   }, []);

//   async function fetchAll() {
//     const [uRes,pRes] = await Promise.all([
//       fetch(`${API_URL}/api/users`),
//       fetch(`${API_URL}/api/plantmaster`)
//     ]);
//     setUsers(await uRes.json());
//     setPlants(await pRes.json());
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({ ...u });
//   };
//   const handleCancel = () => setEditIdx(null);

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     const arr = (editUser[field]||'').split(',').filter(Boolean);
//     const next = arr.includes(value)
//       ? arr.filter(x=>x!==value)
//       : [...arr,value];
//     setEditUser(prev => ({ ...prev, [field]: next.join(',') }));
//   };

//   const handleSave = async () => {
//     await fetch(`${API_URL}/api/users/${editUser.username}`, {
//       method:'PUT',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify(editUser)
//     });
//     await fetchAll();
//     setEditIdx(null);
//   };
//   const handleDelete = async u => {
//     if(!confirm(`Delete ${u}?`))return;
//     await fetch(`${API_URL}/api/users/${u}`,{method:'DELETE'});
//     await fetchAll();
//   };

//   const getNames = (str,list,idKey,nameKey) => {
//     if(!str) return '';
//     return str.split(',').map(id=>{
//       const m = list.find(x=>String(x[idKey])===id);
//       return m? m[nameKey] : id;
//     }).join(', ');
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-indigo-800 mb-6">User Register</h1>
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full text-left">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {['Username','Password','Role','Allowed Plants','Actions'].map(c=>(
//                 <th key={c} className="px-6 py-3">{c}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u,i)=>(
//               <tr key={u.username} className={i%2?'bg-gray-50':'bg-white'}>
//                 {editIdx===i ? (
//                   <>
//                     <td className="p-4">
//                       <input
//                         name="username"
//                         value={editUser.username}
//                         disabled
//                         className="w-full border-gray-300 rounded px-3 py-2 bg-gray-100"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <input
//                         name="password"
//                         value={editUser.password}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded px-3 py-2"
//                       />
//                     </td>

//                     {/* Role Dropdown */}
//                     <td className="p-4 role-dropdown relative">
//                       <div
//                         onClick={()=>setShowRoleDropdown(show=>!show)}
//                         className="border rounded px-3 py-2 bg-white cursor-pointer"
//                       >
//                         {editUser.role
//                           .split(',')
//                           .filter(Boolean)
//                           .join(', ') || 'Select Roles'}
//                       </div>
//                       {showRoleDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
//                           {ALL_ROLES.map(r=>(
//                             <label key={r} className="flex items-center px-3 py-1 hover:bg-gray-100">
//                               <input
//                                 type="checkbox"
//                                 checked={editUser.role.split(',').includes(r)}
//                                 onChange={()=>toggleListValue('role',r)}
//                                 className="mr-2"
//                               />
//                               {r}
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </td>

//                     {/* Plant Dropdown */}
//                     <td className="p-4 plant-dropdown relative">
//                       <div
//                         onClick={()=>setShowPlantDropdown(show=>!show)}
//                         className="border rounded px-3 py-2 bg-white cursor-pointer"
//                       >
//                         {getNames(editUser.allowedplants,plants,'plantid','plantname') || 'Select Plants'}
//                       </div>
//                       {showPlantDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
//                           {plants.map(p=>(
//                             <label key={p.plantid} className="flex items-center px-3 py-1 hover:bg-gray-100">
//                               <input
//                                 type="checkbox"
//                                 checked={editUser.allowedplants.split(',').includes(String(p.plantid))}
//                                 onChange={()=>toggleListValue('allowedplants',String(p.plantid))}
//                                 className="mr-2"
//                               />
//                               {p.plantname}
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 space-x-2">
//                       <button
//                         onClick={handleSave}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                       >Save</button>
//                       <button
//                         onClick={handleCancel}
//                         className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                       >Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="px-6 py-4 font-medium">{u.username}</td>
//                     <td className="px-6 py-4">{'*'.repeat(u.password.length)}</td>
//                     <td className="px-6 py-4">{u.role}</td>
//                     <td className="px-6 py-4">{getNames(u.allowedplants,plants,'plantid','plantname')}</td>
//                     <td className="px-6 py-4 space-x-2">
//                       <button
//                         onClick={()=>handleEdit(u,i)}
//                         className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                       >Edit</button>
//                       <button
//                         onClick={()=>handleDelete(u.username)}
//                         className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                       >Delete</button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//             {users.length===0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-8 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }//////////////////////////final working code thodi error che



// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin','User','Dispatcher','GateKeeper','Report','Loader'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showPlantDropdown, setShowPlantDropdown] = useState(false);

//   useEffect(() => {
//     fetchAll();

//     const handler = e => {
//       if (!e.target.closest('.role-dropdown')) setShowRoleDropdown(false);
//       if (!e.target.closest('.plant-dropdown')) setShowPlantDropdown(false);
//     };
//     window.addEventListener('click', handler);
//     return () => window.removeEventListener('click', handler);
//   }, []);

//   async function fetchAll() {
//     const [uRes, pRes] = await Promise.all([
//       fetch(`${API_URL}/api/users`),
//       fetch(`${API_URL}/api/plantmaster`)
//     ]);
//     setUsers(await uRes.json());
//     setPlants(await pRes.json());
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({
//       ...u,
//       allowedplants: u.allowedplants || '',
//       role: u.role || ''
//     });
//   };
//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     setEditUser(prev => {
//       const cur = prev[field] || '';
//       const arr = cur.split(',').filter(Boolean);
//       const nextArr = arr.includes(value)
//         ? arr.filter(x => x !== value)
//         : [...arr, value];
//       return { ...prev, [field]: nextArr.join(',') };
//     });
//   };

//   const handleSave = async () => {
//     await fetch(`${API_URL}/api/users/${editUser.username}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser)
//     });
//     await fetchAll();
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleDelete = async username => {
//     if (!confirm(`Delete ${username}?`)) return;
//     await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
//     await fetchAll();
//   };

//   const getNames = (str, list, idKey, nameKey) => {
//     if (!str) return '';
//     return str
//       .split(',')
//       .map(id => {
//         const m = list.find(x => String(x[idKey]) === id);
//         return m ? m[nameKey] : id;
//       })
//       .join(', ');
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-indigo-800 mb-6">
//         User Register
//       </h1>
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full text-left">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {['Username','Password','Role','Allowed Plants','Actions'].map(c => (
//                 <th key={c} className="px-6 py-3">{c}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr
//                 key={u.username}
//                 className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
//                 {editIdx === i ? (
//                   <>
//                     <td className="p-4">
//                       <input
//                         name="username"
//                         value={editUser.username}
//                         disabled
//                         className="w-full border-gray-300 rounded px-3 py-2 bg-gray-100"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <input
//                         name="password"
//                         value={editUser.password}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded px-3 py-2"
//                       />
//                     </td>

//                     {/* Role Dropdown */}
//                     <td className="p-4 role-dropdown relative">
//                       <div
//                         onClick={() => setShowRoleDropdown(show => !show)}
//                         className="border rounded px-3 py-2 bg-white cursor-pointer"
//                       >
//                         {editUser.role.split(',').filter(Boolean).join(', ') ||
//                           'Select Roles'}
//                       </div>
//                       {showRoleDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                           {ALL_ROLES.map(r => (
//                             <label
//                               key={r}
//                               className="flex items-center px-3 py-1 hover:bg-gray-100">
//                               <input
//                                 type="checkbox"
//                                 checked={editUser.role
//                                   .split(',')
//                                   .includes(r)}
//                                 onChange={() => toggleListValue('role', r)}
//                                 className="mr-2"
//                               />
//                               {r}
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </td>

//                     {/* Plant Dropdown */}
//                     <td className="p-4 plant-dropdown relative">
//                       <div
//                         onClick={() => setShowPlantDropdown(show => !show)}
//                         className="border rounded px-3 py-2 bg-white cursor-pointer"
//                       >
//                         {getNames(editUser.allowedplants, plants, 'plantid', 'plantname') ||
//                           'Select Plants'}
//                       </div>
//                       {showPlantDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                           {plants.length === 0 && (
//                             <div className="p-3 text-gray-500">No plants</div>
//                           )}
//                           {plants.map(p => {
//                             const arr = editUser.allowedplants
//                               ? editUser.allowedplants.split(',')
//                               : [];
//                             return (
//                               <label
//                                 key={p.plantid}
//                                 className="flex items-center px-3 py-1 hover:bg-gray-100">
//                                 <input
//                                   type="checkbox"
//                                   checked={arr.includes(String(p.plantid))}
//                                   onChange={() =>
//                                     toggleListValue(
//                                       'allowedplants',
//                                       String(p.plantid)
//                                     )
//                                   }
//                                   className="mr-2"
//                                 />
//                                 {p.plantname}
//                               </label>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 space-x-2">
//                       <button
//                         onClick={handleSave}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="px-6 py-4 font-medium">{u.username}</td>
//                     <td className="px-6 py-4">
//                       {'*'.repeat(u.password.length)}
//                     </td>
//                     <td className="px-6 py-4">{u.role}</td>
//                     <td className="px-6 py-4">
//                       {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
//                     </td>
//                     <td className="px-6 py-4 space-x-2">
//                       <button
//                         onClick={() => handleEdit(u, i)}
//                         className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(u.username)}
//                         className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-8 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }///////////////////////////////////final working code //////////////////


// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin', 'User', 'Dispatcher', 'GateKeeper', 'Report', 'Loader'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showPlantDropdown, setShowPlantDropdown] = useState(false);

//   useEffect(() => {
//     fetchAll();

//     const handler = e => {
//       if (!e.target.closest('.role-dropdown')) setShowRoleDropdown(false);
//       if (!e.target.closest('.plant-dropdown')) setShowPlantDropdown(false);
//     };
//     window.addEventListener('click', handler);
//     return () => window.removeEventListener('click', handler);
//   }, []);

//   async function fetchAll() {
//     const [uRes, pRes] = await Promise.all([
//       fetch(`${API_URL}/api/users`),
//       fetch(`${API_URL}/api/plantmaster`)
//     ]);
//     setUsers(await uRes.json());
//     setPlants(await pRes.json());
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({
//       ...u,
//       allowedplants: u.allowedplants || '',
//       role: u.role || ''
//     });
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     setEditUser(prev => {
//       const cur = prev[field] || '';
//       const arr = cur.split(',').filter(Boolean);
//       const nextArr = arr.includes(value)
//         ? arr.filter(x => x !== value)
//         : [...arr, value];
//       return { ...prev, [field]: nextArr.join(',') };
//     });
//   };

//   const handleSave = async () => {
//     await fetch(`${API_URL}/api/users/${editUser.username}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser)
//     });
//     await fetchAll();
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleDelete = async username => {
//     if (!confirm(`Delete ${username}?`)) return;
//     await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
//     await fetchAll();
//   };

//   const getNames = (str, list, idKey, nameKey) => {
//     if (!str) return '';
//     return str
//       .split(',')
//       .map(id => {
//         const m = list.find(x => String(x[idKey]) === id);
//         return m ? m[nameKey] : id;
//       })
//       .join(', ');
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center">
//         User Register
//       </h1>

//       <div className="w-full overflow-x-auto md:overflow-visible bg-white rounded-lg shadow">
//         <table className="min-w-[600px] w-full text-left text-sm table-fixed md:table-auto">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {['Username', 'Password', 'Role', 'Allowed Plants', 'Actions'].map(c => (
//                 <th key={c} className="px-3 py-2 md:px-6 md:py-3 break-words">{c}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr key={u.username} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
//                 {editIdx === i ? (
//                   <>
//                     <td className="p-2 md:p-4">
//                       <input
//                         name="username"
//                         value={editUser.username}
//                         disabled
//                         className="w-full border-gray-300 rounded px-2 py-1 bg-gray-100"
//                       />
//                     </td>
//                     <td className="p-2 md:p-4">
//                       <input
//                         name="password"
//                         value={editUser.password}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded px-2 py-1"
//                       />
//                     </td>

//                     {/* Role Dropdown */}
//                     <td className="p-2 md:p-4 role-dropdown relative">
//                       <div
//                         onClick={() => setShowRoleDropdown(show => !show)}
//                         className="border rounded px-2 py-1 bg-white cursor-pointer text-xs md:text-sm"
//                       >
//                         {editUser.role.split(',').filter(Boolean).join(', ') || 'Select Roles'}
//                       </div>
//                       {showRoleDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                           {ALL_ROLES.map(r => (
//                             <label key={r} className="flex items-center px-3 py-1 hover:bg-gray-100 text-xs">
//                               <input
//                                 type="checkbox"
//                                 checked={editUser.role.split(',').includes(r)}
//                                 onChange={() => toggleListValue('role', r)}
//                                 className="mr-2"
//                               />
//                               {r}
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </td>

//                     {/* Plant Dropdown */}
//                     <td className="p-2 md:p-4 plant-dropdown relative">
//                       <div
//                         onClick={() => setShowPlantDropdown(show => !show)}
//                         className="border rounded px-2 py-1 bg-white cursor-pointer text-xs md:text-sm"
//                       >
//                         {getNames(editUser.allowedplants, plants, 'plantid', 'plantname') || 'Select Plants'}
//                       </div>
//                       {showPlantDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                           {plants.length === 0 && (
//                             <div className="p-3 text-gray-500">No plants</div>
//                           )}
//                           {plants.map(p => {
//                             const arr = editUser.allowedplants ? editUser.allowedplants.split(',') : [];
//                             return (
//                               <label key={p.plantid} className="flex items-center px-3 py-1 hover:bg-gray-100 text-xs">
//                                 <input
//                                   type="checkbox"
//                                   checked={arr.includes(String(p.plantid))}
//                                   onChange={() => toggleListValue('allowedplants', String(p.plantid))}
//                                   className="mr-2"
//                                 />
//                                 {p.plantname}
//                               </label>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-2 md:p-4 space-y-1 md:space-x-2 flex flex-col md:flex-row">
//                       <button onClick={handleSave} className="w-full md:w-auto px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs md:text-sm">
//                         Save
//                       </button>
//                       <button onClick={handleCancel} className="w-full md:w-auto px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-xs md:text-sm">
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="px-3 py-2 md:px-6 md:py-3 break-words">{u.username}</td>
//                     <td className="px-3 py-2 md:px-6 md:py-3 break-words">{'*'.repeat(u.password.length)}</td>
//                     <td className="px-3 py-2 md:px-6 md:py-3 break-words">{u.role}</td>
//                     <td className="px-3 py-2 md:px-6 md:py-3 break-words">
//                       {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
//                     </td>
//                     <td className="px-3 py-2 md:px-6 md:py-3 space-y-1 md:space-x-2 flex flex-col md:flex-row">
//                       <button onClick={() => handleEdit(u, i)} className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs md:text-sm">
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(u.username)} className="w-full md:w-auto px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm">
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showPlantDropdown, setShowPlantDropdown] = useState(false);

//   useEffect(() => {
//     fetchAll();

//     const handler = e => {
//       if (!e.target.closest('.role-dropdown')) setShowRoleDropdown(false);
//       if (!e.target.closest('.plant-dropdown')) setShowPlantDropdown(false);
//     };
//     window.addEventListener('click', handler);
//     return () => window.removeEventListener('click', handler);
//   }, []);

//   async function fetchAll() {
//     const [uRes, pRes] = await Promise.all([
//       fetch(`${API_URL}/api/users`),
//       fetch(`${API_URL}/api/plantmaster`)
//     ]);
//     setUsers(await uRes.json());
//     setPlants(await pRes.json());
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({
//       ...u,
//       allowedplants: u.allowedplants || '',
//       role: u.role || ''
//     });
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     setEditUser(prev => {
//       const cur = prev[field] || '';
//       const arr = cur.split(',').filter(Boolean);
//       const nextArr = arr.includes(value)
//         ? arr.filter(x => x !== value)
//         : [...arr, value];
//       return { ...prev, [field]: nextArr.join(',') };
//     });
//   };

//   const handleSave = async () => {
//     await fetch(`${API_URL}/api/users/${editUser.username}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser)
//     });
//     await fetchAll();
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleDelete = async username => {
//     if (!confirm(`Delete ${username}?`)) return;
//     await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
//     await fetchAll();
//   };

//   const getNames = (str, list, idKey, nameKey) => {
//     if (!str) return '';
//     return str
//       .split(',')
//       .map(id => {
//         const m = list.find(x => String(x[idKey]) === id);
//         return m ? m[nameKey] : id;
//       })
//       .join(', ');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-800">User Register</h1>

//         {/* Desktop Table */}
//         <div className="hidden md:block overflow-auto">
//           <table className="min-w-full border text-center text-sm">
//             <thead className="bg-blue-700 text-white">
//               <tr>
//                 <th className="px-3 py-2">Username</th>
//                 <th className="px-3 py-2">Password</th>
//                 <th className="px-3 py-2">Role</th>
//                 <th className="px-3 py-2">Allowed Plants</th>
//                 <th className="px-3 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u, i) => (
//                 <tr key={u.username} className="border-b hover:bg-gray-50">
//                   {editIdx === i ? (
//                     <>
//                       <td className="p-2">
//                         <input name="username" value={editUser.username} disabled className="w-full border-gray-300 rounded px-2 py-1 bg-gray-100" />
//                       </td>
//                       <td className="p-2">
//                         <input name="password" value={editUser.password} onChange={handleChange} className="w-full border-gray-300 rounded px-2 py-1" />
//                       </td>
//                       <td className="p-2 relative role-dropdown">
//                         <div onClick={() => setShowRoleDropdown(s => !s)} className="border rounded px-2 py-1 bg-white cursor-pointer text-xs">
//                           {editUser.role.split(',').filter(Boolean).join(', ') || 'Select Roles'}
//                         </div>
//                         {showRoleDropdown && (
//                           <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                             {ALL_ROLES.map(r => (
//                               <label key={r} className="flex items-center px-3 py-1 hover:bg-gray-100 text-xs">
//                                 <input type="checkbox" checked={editUser.role.split(',').includes(r)} onChange={() => toggleListValue('role', r)} className="mr-2" />
//                                 {r}
//                               </label>
//                             ))}
//                           </div>
//                         )}
//                       </td>
//                       <td className="p-2 relative plant-dropdown">
//                         <div onClick={() => setShowPlantDropdown(s => !s)} className="border rounded px-2 py-1 bg-white cursor-pointer text-xs">
//                           {getNames(editUser.allowedplants, plants, 'plantid', 'plantname') || 'Select Plants'}
//                         </div>
//                         {showPlantDropdown && (
//                           <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
//                             {plants.map(p => (
//                               <label key={p.plantid} className="flex items-center px-3 py-1 hover:bg-gray-100 text-xs">
//                                 <input type="checkbox" checked={(editUser.allowedplants || '').split(',').includes(String(p.plantid))} onChange={() => toggleListValue('allowedplants', String(p.plantid))} className="mr-2" />
//                                 {p.plantname}
//                               </label>
//                             ))}
//                           </div>
//                         )}
//                       </td>
//                       <td className="p-2 space-y-1 flex flex-col">
//                         <button onClick={handleSave} className="w-full bg-green-600 text-white py-1 rounded hover:bg-green-700 text-xs">Save</button>
//                         <button onClick={handleCancel} className="w-full bg-gray-500 text-white py-1 rounded hover:bg-gray-600 text-xs">Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="px-3 py-2 break-words">{u.username}</td>
//                       <td className="px-3 py-2 break-words">{'*'.repeat(u.password.length)}</td>
//                       <td className="px-3 py-2 break-words">{u.role}</td>
//                       <td className="px-3 py-2 break-words">{getNames(u.allowedplants, plants, 'plantid', 'plantname')}</td>
//                       <td className="px-3 py-2 space-y-1 flex flex-col">
//                         <button onClick={() => handleEdit(u, i)} className="w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 text-xs">Edit</button>
//                         <button onClick={() => handleDelete(u.username)} className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700 text-xs">Delete</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="block md:hidden space-y-3">
//           {users.map(u => (
//             <div key={u.username} className="border border-gray-300 rounded p-3 shadow-sm bg-white">
//               <p className="text-sm"><span className="font-semibold">Username:</span> {u.username}</p>
//               <p className="text-sm"><span className="font-semibold">Password:</span> {'*'.repeat(u.password.length)}</p>
//               <p className="text-sm"><span className="font-semibold">Role:</span> {u.role}</p>
//               <p className="text-sm"><span className="font-semibold">Allowed Plants:</span> {getNames(u.allowedplants, plants, 'plantid', 'plantname')}</p>
//               <div className="flex gap-2 mt-2">
//                 <button onClick={() => handleEdit(u, users.indexOf(u))} className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600">Edit</button>
//                 <button onClick={() => handleDelete(u.username)} className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }////////////////////////////////final ka bi final working code
//////////////

// import React, { useEffect, useState } from 'react';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   async function fetchAll() {
//     const [uRes, pRes] = await Promise.all([
//       fetch(`${API_URL}/api/users`),
//       fetch(`${API_URL}/api/plantmaster`)
//     ]);
//     setUsers(await uRes.json());
//     setPlants(await pRes.json());
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({
//       ...u,
//       allowedplants: u.allowedplants || '',
//       role: u.role || ''
//     });
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     setEditUser(prev => {
//       const cur = prev[field] || '';
//       const arr = cur.split(',').filter(Boolean);
//       const nextArr = arr.includes(value)
//         ? arr.filter(x => x !== value)
//         : [...arr, value];
//       return { ...prev, [field]: nextArr.join(',') };
//     });
//   };

//   const handleSave = async () => {
//     await fetch(`${API_URL}/api/users/${editUser.username}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser)
//     });
//     await fetchAll();
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleDelete = async username => {
//     if (!confirm(`Delete ${username}?`)) return;
//     await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
//     await fetchAll();
//   };

//   const getNames = (str, list, idKey, nameKey) => {
//     if (!str) return '';
//     return str
//       .split(',')
//       .map(id => {
//         const m = list.find(x => String(x[idKey]) === id);
//         return m ? m[nameKey] : id;
//       })
//       .join(', ');
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//        <CancelButton />
//       <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center">
//         User Register
//       </h1>

//       {/* Desktop Table View */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-[700px] w-full text-left text-sm">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {['Username', 'Password', 'Role', 'Allowed Plants', 'Actions'].map(c => (
//                 <th key={c} className="px-3 py-2 md:px-6 md:py-3 break-words">{c}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr key={u.username} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="px-3 py-2 md:px-6 md:py-3 break-words">{u.username}</td>
//                 <td className="px-3 py-2 md:px-6 md:py-3 break-words">{'*'.repeat(u.password.length)}</td>
//                 <td className="px-3 py-2 md:px-6 md:py-3 break-words">{u.role}</td>
//                 <td className="px-3 py-2 md:px-6 md:py-3 break-words">
//                   {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
//                 </td>
//                 <td className="px-3 py-2 md:px-6 md:py-3 space-y-1 md:space-x-2 flex flex-col md:flex-row">
//                   <button onClick={() => handleEdit(u, i)} className="w-full md:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs md:text-sm">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(u.username)} className="w-full md:w-auto px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Card View */}
//       <div className="block md:hidden space-y-3">
//         {users.map((u, i) => (
//           <div key={u.username} className="border border-gray-300 rounded p-3 shadow-sm bg-white">
//             <p className="text-sm"><span className="font-semibold">Username:</span> {u.username}</p>
//             <p className="text-sm"><span className="font-semibold">Password:</span> {'*'.repeat(u.password.length)}</p>
//             <p className="text-sm"><span className="font-semibold">Role:</span> {u.role}</p>
//             <p className="text-sm"><span className="font-semibold">Allowed Plants:</span> {getNames(u.allowedplants, plants, 'plantid', 'plantname')}</p>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => handleEdit(u, i)} className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(u.username)} className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Form View */}
//       {editIdx !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <h2 className="text-lg font-semibold mb-4">Edit User</h2>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   name="password"
//                   value={editUser.password}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <div className="border border-gray-300 rounded px-3 py-2 cursor-pointer" onClick={() => toggleListValue('role', '')}>
//                   {editUser.role ? editUser.role : 'Select Roles'}
//                 </div>
//                 <div className="mt-2 border rounded max-h-40 overflow-y-auto">
//                   {ALL_ROLES.map(r => (
//                     <label key={r} className="flex items-center px-3 py-1 text-sm">
//                       <input
//                         type="checkbox"
//                         checked={editUser.role.split(',').includes(r)}
//                         onChange={() => toggleListValue('role', r)}
//                         className="mr-2"
//                       />
//                       {r}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Allowed Plants</label>
//                 <div className="mt-2 border rounded max-h-40 overflow-y-auto">
//                   {plants.map(p => (
//                     <label key={p.plantid} className="flex items-center px-3 py-1 text-sm">
//                       <input
//                         type="checkbox"
//                         checked={(editUser.allowedplants || '').split(',').includes(String(p.plantid))}
//                         onChange={() => toggleListValue('allowedplants', String(p.plantid))}
//                         className="mr-2"
//                       />
//                       {p.plantname}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                   Save
//                 </button>
//                 <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { FiEdit2, FiTrash2, FiX, FiSave, FiUser, FiLock, FiCheck } from 'react-icons/fi';

// const API_URL = import.meta.env.VITE_API_URL;
// const ALL_ROLES = ['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'];

// export default function UserRegister() {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   async function fetchAll() {
//     setIsLoading(true);
//     try {
//       const [uRes, pRes] = await Promise.all([
//         fetch(`${API_URL}/api/users`),
//         fetch(`${API_URL}/api/plantmaster`)
//       ]);
//       setUsers(await uRes.json());
//       setPlants(await pRes.json());
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const handleEdit = (u, i) => {
//     setEditIdx(i);
//     setEditUser({
//       ...u,
//       allowedplants: u.allowedplants || '',
//       role: u.role || ''
//     });
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditUser({});
//   };

//   const handleChange = e => {
//     setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleListValue = (field, value) => {
//     setEditUser(prev => {
//       const cur = prev[field] || '';
//       const arr = cur.split(',').filter(Boolean);
//       const nextArr = arr.includes(value)
//         ? arr.filter(x => x !== value)
//         : [...arr, value];
//       return { ...prev, [field]: nextArr.join(',') };
//     });
//   };

//   const handleSave = async () => {
//     setIsLoading(true);
//     try {
//       await fetch(`${API_URL}/api/users/${editUser.username}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editUser)
//       });
//       await fetchAll();
//       setEditIdx(null);
//       setEditUser({});
//     } catch (error) {
//       console.error('Error saving user:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async username => {
//     if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;
//     setIsLoading(true);
//     try {
//       await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
//       await fetchAll();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getNames = (str, list, idKey, nameKey) => {
//     if (!str) return 'None';
//     return str
//       .split(',')
//       .map(id => {
//         const m = list.find(x => String(x[idKey]) === id);
//         return m ? m[nameKey] : id;
//       })
//       .join(', ');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               User Register
//             </span>
//           </h1>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         )}

//         {/* Desktop Table */}
//         <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Username
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Password
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Allowed Plants
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {users.map((u, i) => (
//                   <tr key={u.username} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
//                           <FiUser className="h-4 w-4 text-indigo-600" />
//                         </div>
//                         {u.username}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {'•'.repeat(8)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {u.role || '-'}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                       {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end space-x-2">
//                         <button
//                           onClick={() => handleEdit(u, i)}
//                           className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50"
//                           title="Edit"
//                         >
//                           <FiEdit2 className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(u.username)}
//                           className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50"
//                           title="Delete"
//                         >
//                           <FiTrash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {users.length === 0 && !isLoading && (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
//                       No users found. Create your first user to get started.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Mobile Cards */}
//         <div className="lg:hidden space-y-4">
//           {users.map((u, i) => (
//             <div key={u.username} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
//                     <FiUser className="h-5 w-5 text-indigo-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-medium text-gray-900 truncate">{u.username}</h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       <span className="font-medium">Role:</span> {u.role || '-'}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(u, i)}
//                       className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50"
//                       title="Edit"
//                     >
//                       <FiEdit2 className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(u.username)}
//                       className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50"
//                       title="Delete"
//                     >
//                       <FiTrash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   <div className="flex items-center text-sm text-gray-500">
//                     <FiLock className="flex-shrink-0 mr-2 h-4 w-4" />
//                     {'•'.repeat(8)}
//                   </div>
//                   <div className="text-sm">
//                     <span className="font-medium text-gray-500">Allowed Plants:</span>{' '}
//                     <span className="text-gray-700">{getNames(u.allowedplants, plants, 'plantid', 'plantname')}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {users.length === 0 && !isLoading && (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//               <div className="text-gray-400 mb-2">
//                 <FiUser className="mx-auto h-12 w-12" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
//               <p className="text-gray-500">Create your first user to get started</p>
//             </div>
//           )}
//         </div>

//         {/* Edit Modal */}
//         {editIdx !== null && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
//                   <button
//                     onClick={handleCancel}
//                     className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <FiX className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                     <div className="mt-1 flex rounded-md shadow-sm">
//                       <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                         <FiUser className="h-4 w-4" />
//                       </span>
//                       <input
//                         type="text"
//                         value={editUser.username}
//                         readOnly
//                         className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-100"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                     <div className="mt-1 flex rounded-md shadow-sm">
//                       <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                         <FiLock className="h-4 w-4" />
//                       </span>
//                       <input
//                         name="password"
//                         type="password"
//                         value={editUser.password}
//                         onChange={handleChange}
//                         className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
//                         placeholder="Enter new password"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
//                     <div className="mt-1 space-y-2">
//                       {ALL_ROLES.map(r => (
//                         <label key={r} className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={(editUser.role || '').split(',').includes(r)}
//                             onChange={() => toggleListValue('role', r)}
//                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                           />
//                           <span className="text-sm text-gray-700">{r}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Plants</label>
//                     <div className="mt-1 max-h-60 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-200">
//                       {plants.map(p => (
//                         <label key={p.plantid} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={(editUser.allowedplants || '').split(',').includes(String(p.plantid))}
//                             onChange={() => toggleListValue('allowedplants', String(p.plantid))}
//                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                           />
//                           <span className="text-sm text-gray-700">{p.plantname}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-end space-x-3 pt-4">
//                     <button
//                       onClick={handleCancel}
//                       className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       disabled={isLoading}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? 'Saving...' : 'Save Changes'}
//                       {!isLoading && <FiSave className="ml-2 h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiX, FiSave, FiUser, FiLock, FiCheck, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;
const ALL_ROLES = ['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'];

export default function UserRegister() {
  
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNames(user.allowedplants, plants, 'plantid', 'plantname').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users, plants]);

  async function fetchAll() {
    setIsLoading(true);
    try {
      const [uRes, pRes] = await Promise.all([
        fetch(`${API_URL}/api/users`),
        fetch(`${API_URL}/api/plantmaster`)
      ]);
      const usersData = await uRes.json();
      const plantsData = await pRes.json();
      setUsers(usersData);
      setFilteredUsers(usersData);
      setPlants(plantsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (u, i) => {
    setEditIdx(i);
    setEditUser({
      ...u,
      allowedplants: u.allowedplants || '',
      role: u.role || ''
    });
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditUser({});
  };

  const handleChange = e => {
    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleListValue = (field, value) => {
    setEditUser(prev => {
      const cur = prev[field] || '';
      const arr = cur.split(',').filter(Boolean);
      const nextArr = arr.includes(value)
        ? arr.filter(x => x !== value)
        : [...arr, value];
      return { ...prev, [field]: nextArr.join(',') };
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/api/users/${editUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser)
      });
      await fetchAll();
      setEditIdx(null);
      setEditUser({});
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async username => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
      await fetchAll();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNames = (str, list, idKey, nameKey) => {
    if (!str) return 'None';
    return str
      .split(',')
      .map(id => {
        const m = list.find(x => String(x[idKey]) === id);
        return m ? m[nameKey] : id;
      })
      .join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
          <div className="flex justify-end -mt-2 -mr-2 mb-2">
        
           <button 
                onClick={() => navigate('/home')}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 mr-12 md:mr-16"
                title="Close"
                >
                 <FiX className="h-5 w-5" />
                  </button>
                 </div>

        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              User Register
            </span>
          </h1>
         
           
    

          {/* Modern Search Bar */}
          <div className="relative w-full md:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allowed Plants
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((u, i) => (
                  <tr key={u.username} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <FiUser className="h-4 w-4 text-indigo-600" />
                        </div>
                        {u.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {'•'.repeat(8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {u.role || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(u, i)}
                          className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                          title="Edit"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.username)}
                          className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors duration-200"
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                      {searchTerm ? 'No matching users found' : 'No users found. Create your first user to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
     


        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.map((u, i) => (
            <div key={u.username} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <FiUser className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{u.username}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Role:</span> 
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {u.role || '-'}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(u, i)}
                      className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                      title="Edit"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(u.username)}
                      className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors duration-200"
                      title="Delete"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiLock className="flex-shrink-0 mr-2 h-4 w-4" />
                    {'•'.repeat(8)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Allowed Plants:</span>{' '}
                    <span className="text-gray-700">{getNames(u.allowedplants, plants, 'plantid', 'plantname')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && !isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-2">
                <FiUser className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {searchTerm ? 'No matching users' : 'No users found'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try a different search term' : 'Create your first user to get started'}
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editIdx !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <FiUser className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={editUser.username}
                        readOnly
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <FiLock className="h-4 w-4" />
                      </span>
                      <input
                        name="password"
                        type="password"
                        value={editUser.password}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
                    <div className="mt-1 space-y-2">
                      {ALL_ROLES.map(r => (
                        <label key={r} className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 cursor-pointer transition-colors duration-200">
                          <input
                            type="checkbox"
                            checked={(editUser.role || '').split(',').includes(r)}
                            onChange={() => toggleListValue('role', r)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Plants</label>
                    <div className="mt-1 max-h-60 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {plants.map(p => (
                        <label key={p.plantid} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                          <input
                            type="checkbox"
                            checked={(editUser.allowedplants || '').split(',').includes(String(p.plantid))}
                            onChange={() => toggleListValue('allowedplants', String(p.plantid))}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{p.plantname}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          Save Changes
                          <FiSave className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}