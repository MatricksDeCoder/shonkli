import React from 'react'
import GradientButton from '../components/common/GradientButton'

const Support = () => {

  return (
    <>
    <div className="mt-0 flex items-center justify-center h-screen bg-gray-200">
        <div className="container">
            <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
            <div className="text-center">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                <span><GradientButton text="Coming Soon!" type="submit" /></span><span className="text-indigo-600">Live Chat</span>
                </h2>
                <p className="text-md md:text-xl mt-10">Talk to one of our consultants live! Get help and guidance on how to use our services and more.</p>
            </div>
            </div>
        </div>
    </div>
    </>

  );
};

export default Support;