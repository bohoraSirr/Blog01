// components/LoadingPostSkeleton.jsx
import React from 'react'

export default function LoadingPostSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-xl bg-white w-full">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-2/3 bg-gray-200 rounded mb-4"></div>
      <div className="h-48 w-full bg-gray-200 rounded mb-3"></div>
      <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
    </div>
  )
}
