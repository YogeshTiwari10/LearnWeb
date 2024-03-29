import React from 'react';

const ProgressTracker = ({ progress }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Your Progress</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              {`${progress.toFixed(2)}%`}
            </span>
          </div>
        </div>
        <div className="flex mb-2 items-center justify-between">
          <div className="w-full overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
