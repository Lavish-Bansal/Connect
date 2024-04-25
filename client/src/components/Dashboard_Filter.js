import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";

function Dashboard_Filter({
    filterOptions = {
        keyword: "",
        category: "",
        dateRange: "",
    },
    setFilterOptions,
    handleFilterClear,
}) {
    // function to handle filter values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "keyword":
                setFilterOptions({ ...filterOptions, keyword: value });
                break;
            case "category":
                setFilterOptions({ ...filterOptions, category: value });
                break;
            case "dateRange":
                setFilterOptions({ ...filterOptions, dateRange: value });
                break;
            default:
                break;
        }
    };

    return (
        // Add filter options to the DOM element
        <div className="border-red-800">
            <h2 style={{color: "#f05454", fontWeight: 1000, marginBottom: 15}} className="text-lg font-medium mb-2">Filter Options</h2>
            <form className="flex flex-col gap-y-3">
                {/* Input to search through keyword */}
                <div style={{color: "#f05454", fontWeight: 1000}} className="mb-2">
                    <label htmlFor="keyword" className="font-medium block mb-1">
                        Keyword
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={filterOptions.keyword}
                        onChange={handleInputChange}
                        className="filterInput"
                        placeholder="Search by keyword..."
                    />
                </div>
                {/* Selection menu to choose a category */}
                <div style={{color: "#f05454", fontWeight: 1000}} className="mb-2">
                    <label
                        htmlFor="category"
                        className="font-medium block mb-1"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={filterOptions.category}
                        onChange={handleInputChange}
                        className="filterInput"
                        style={{color: "black"}} 
                    >
                        <option value="">Select a category...</option>
                        <option value="category1">Technical</option>
                        <option value="category2">Non-technical</option>
                        <option value="category3">Personalized</option>
                    </select>
                </div>
                {/* Input field to filter through a date range */}
                <div style={{color: "#f05454", fontWeight: 1000}} className="mb-2">
                    <label
                        htmlFor="dateRange"
                        className="font-medium block mb-1"
                    >
                        Date Range
                    </label>
                    <input
                        type="date"
                        id="dateRange"
                        name="dateRange"
                        value={filterOptions.dateRange}
                        onChange={handleInputChange}
                        className="filterInput"
                        style={{color: "black"}} 
                    />
                </div>
            </form>
            <button style={{backgroundColor: "#f05454", fontWeight: 1000}} 
                onClick={handleFilterClear}
                className="w-full mt-2 text-white py-2 px-4 rounded-lg "
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Dashboard_Filter;
