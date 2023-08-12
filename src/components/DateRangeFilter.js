import React, { useState } from "react";

const DateRangeFilter = ({ onChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleApplyFilter = () => {
        onChange({ startDate, endDate });
    };

    const handleClearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        onChange({ startDate: null, endDate: null });
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2 ml-2">
                Date Range Filter
            </h2>
            <div className="flex gap-4 ml-2">
                <input
                    type="date"
                    value={startDate || ""}
                    onChange={handleStartDateChange}
                    className="border border-gray-300 p-2 rounded-md w-1/4"
                />
                <input
                    type="date"
                    value={endDate || ""}
                    onChange={handleEndDateChange}
                    className="border border-gray-300 p-2 rounded-md w-1/4"
                />
            </div>
            <div className="mt-2 ml-2 mb-4">
                <button
                    onClick={handleApplyFilter}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                    Apply Filter
                </button>
                <button
                    onClick={handleClearFilter}
                    className="bg-gray-300 px-4 py-2 rounded-md"
                >
                    Clear Filter
                </button>
            </div>
        </div>
    );
};

export default DateRangeFilter;
