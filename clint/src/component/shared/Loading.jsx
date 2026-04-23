import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative inline-block">
                        <Loader className="w-16 h-16 text-indigo-600 animate-spin" />
                        <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Loading Classes...</p>
                    <p className="text-sm text-gray-500">Please wait while we fetch all our amazing courses</p>
                </div>
            </div>
    );
}

export default Loading;

