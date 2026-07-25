'use client';

import { useState } from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';

export const ResumeActions = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Trigger print for now
      window.print();
    } catch (error) {
      console.error('Error downloading resume:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3 px-6 sm:px-8 lg:px-10 py-4 border-b border-gray-200 dark:border-gray-800 print:hidden">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
          isDownloading
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isDownloading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FaDownload size={14} />
            Download Resume
          </>
        )}
      </button>
      
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <FaPrint size={14} />
        Print Resume
      </button>
    </div>
  );
};