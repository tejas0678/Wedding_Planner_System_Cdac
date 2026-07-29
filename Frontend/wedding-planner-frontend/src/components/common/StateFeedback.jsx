import React from 'react';
import { FiAlertCircle, FiRefreshCw, FiInbox } from 'react-icons/fi';

export const LoadingSpinner = ({ text = "Loading data..." }) => (
  <div className="flex flex-col items-center justify-center p-12 space-y-4">
    <div className="w-10 h-10 border-4 border-rose-200 border-t-[#EC3664] rounded-full animate-spin"></div>
    <p className="text-sm font-medium text-gray-500 animate-pulse">{text}</p>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse space-y-4">
    <div className="w-full h-44 bg-gray-200 rounded-xl"></div>
    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-8 bg-gray-200 rounded-full w-full"></div>
  </div>
);

export const EmptyState = ({ title = "No data found", message = "There are no records to show at the moment." }) => (
  <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-xs">
    <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-[#EC3664] mb-3">
      <FiInbox className="w-6 h-6" />
    </div>
    <h4 className="font-serif text-lg font-bold text-gray-800">{title}</h4>
    <p className="text-xs text-gray-500 mt-1 max-w-sm">{message}</p>
  </div>
);

export const ErrorAlert = ({ message = "Failed to load data from server.", onRetry }) => (
  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-3 text-rose-700">
      <FiAlertCircle className="w-6 h-6 shrink-0" />
      <div>
        <h4 className="text-sm font-bold">Error Loading Content</h4>
        <p className="text-xs text-rose-600 mt-0.5">{message}</p>
      </div>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 transition cursor-pointer"
      >
        <FiRefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    )}
  </div>
);
