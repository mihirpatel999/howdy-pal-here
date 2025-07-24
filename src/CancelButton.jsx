// // src/CancelButton.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function CancelButton() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-end mb-4">
//       <button
//         onClick={() => navigate('/home')}
//         className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }

// src/CancelButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CancelButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => navigate('/home')}
        className="text-black-600 bg-white hover:bg-red-100 hover:text-red-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        title="Cancel"
      >
        &times;
      </button>
    </div>
  );
}