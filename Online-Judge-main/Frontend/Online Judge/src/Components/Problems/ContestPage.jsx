import React from 'react';

const ContestPage = () => {
    return (
        <div className="min-h-[93vh] bg-gray-100 flex flex-col flex-grow items-center overflow-hidden px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Contests</h1>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h2 className="text-lg sm:text-xl font-bold mb-4">No Upcoming Contests</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Check back later for updates!</p>
                {/* You can add a button or link to create a new contest if needed */}
            </div>
        </div>
    );
};

export default ContestPage;
