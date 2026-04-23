import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const ErrorPage = () => {
  const routeError = useRouteError();
  const status = routeError?.status || 404;
  const message = routeError?.message || 'Sorry, the page you are looking for does not exist.';

  return (
   <>
   <Navbar/>
    <section className='min-h-screen  flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full'>
        <div className='bg-white rounded-3xl shadow p-8 md:p-12 text-center transform hover:scale-105 transition-transform duration-300'>
          {/* Animated Error Icon */}
          <div className='mb-8 flex justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-red-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse'></div>
              <svg 
                className='w-32 h-32 text-red-500 relative z-10' 
                fill='none' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' 
                />
              </svg>
            </div>
          </div>

          {/* Status Code */}
          <h1 className='text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            {status}
          </h1>

          {/* Error Message */}
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
            Oops! Something went wrong
          </h2>
          
          <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
            {message}
          </p>

          {/* Divider */}
          <div className='w-24 h-1 bg-gradient-to-r from-red-500 to-purple-500 mx-auto mb-8 rounded-full'></div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              to='/' 
              className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200'
            >
              Back to Homepage
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className='px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 transform hover:-translate-y-1 transition-all duration-200'
            >
              Go Back
            </button>
          </div>

          {/* Additional Help Text */}
          <p className='text-sm text-gray-500 mt-8'>
            If you think this is a mistake, please contact our support team.
          </p>
        </div>
      </div>
    </section>
    <Footer/>

   </>
  );
};

export default ErrorPage;