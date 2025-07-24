import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-5 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
        {/* Company Info */}
        <div>
          <h1 className="text-lg font-semibold">Lemon Software</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Building smart ERP for smart businesses.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-sm">
          <p className="text-gray-300">📍 Gujarat, India</p>
          <p className="text-gray-300">📞 +91 9723822139</p>
          <p className="text-gray-300">✉️ info@lemonsoft.com</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-4">
        © 2025 Lemon Software Solution. All rights reserved.
      </div>
    </footer>
  );
}

