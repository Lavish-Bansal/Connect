import React from "react";
import { useState, useEffect } from "react";
import Dashboard_Filter from "@/components/Dashboard_Filter";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";

function Dashboard() {
  const [allEvents, setAllEvents] = useState([]);
  const [popupFilterOpen, setPopupFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    keyword: "",
    category: "",
    dateRange: "",
    price: [10, 3000],
  });

  const fetchAllEvents = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/getallevents`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    try {
      const data = await response.json();
      setAllEvents(data);
    } catch (error) {
      console.error("Invalid JSON string:", error.message);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  useEffect(() => {
    const newFilteredEvents = allEvents.filter((event) => {
      // Check if keyword filter matches
      if (
        filterOptions.keyword.toLowerCase() &&
        !event.name.toLowerCase().includes(filterOptions.keyword.toLowerCase())
      ) {
        return false;
      }

      // Check if date range filter matches
      if (filterOptions.dateRange) {
        const date = filterOptions.dateRange;
        // Split the date string into an array of substrings
        const dateParts = event.date.split("/");
        // Rearrange the array elements to get yyyy-mm-dd format
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        if (formattedDate < date) {
          return false;
        }
      }

      // Check if price filter matches
      // if (
      //     event.price < filterOptions.price[0] ||
      //     event.price > filterOptions.price[1]
      // ) {
      //     return false;
      // }
      return true;
    });

    setFilteredEvents(newFilteredEvents);
  }, [allEvents, filterOptions]);

  const handleFilterClear = () => {
    setFilterOptions({
      keyword: "",
      category: "",
      dateRange: "",
    });
    setFilteredEvents(allEvents);
    setPopupFilterOpen(false);
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <br />
        <div className="py-12 md:py-20 border-t border-gray-800">
          <br />
          <br />
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore All Events</h1>
          </div>
        </div>
      </div>

      <div className="pt-20 lg:pt-8 overflow-y-hidden">
        <div className="flex m-auto">
          <div className="flex mx-auto container ">
            <div className="flex m-auto overflow-y-hidden gap-4 lg:gap-8 w-full h-[calc(88vh)]">
              {/* Render the regular filter for medium screens and above */}
              <div className="hidden md:flex flex-col p-4 sticky top-0 w-1/6 md:w-1/4">
                <Dashboard_Filter
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                  handleFilterClear={handleFilterClear}
                />
              </div>
              {/* Render the popup filter for small screens */}
              {popupFilterOpen && (
                <div className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 w-5/6">
                    {/* <Popup_Filter
                      filterOptions={filterOptions}
                      setFilterOptions={setFilterOptions}
                      handleFilterClear={handleFilterClear}
                      handleClose={() => setPopupFilterOpen(false)}
                    /> */}
                  </div>
                </div>
              )}
              {/* Render the main content of the dashboard */}
              <div className="flex w-full md:w-3/4 mx-auto justify-between container">
                <div className="p-4 overflow-y-auto w-full h-[calc(80vh)]">
                  <h2 className="text-lg font-medium mb-4">Events</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredEvents.length === 0 ? (
                      <p>No events yet</p>
                    ) : (
                      filteredEvents.map((event) => (
                        <div
                          onClick={() => {
                            router.push(`/event/${event.event_id}`);
                          }}
                          className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                          key={event._id}
                        >>
                          <div className="relative h-[25rem]">
                            {event.profile && (
                              <img
                                fill
                                className="object-cover h-full w-full rounded-md"
                                src={event.profile}
                                alt=""
                                sizes="(min-width: 640px) 100vw, 50vw"
                                priority
                              />
                            )}
                          </div>
                          <div className="flex flex-row justify-between items-start mt-4">
                            <div className="px-2">
                              <p className="text-sm text-gray-800 font-bold">
                                {event.name.length > 30
                                  ? event.name.slice(0, 30) + "..."
                                  : event.name}
                              </p>
                              <p className="text-sm text-gray-800">
                                {event.venue}
                              </p>
                              <p className="text-sm text-gray-800">
                                {event.date}
                              </p>
                            </div>
                            {/* Star component */}
                            <div className="flex flex-col justify-end items-center">
                              <span className="w-full flex flex-row items-center">
                                <FaUsers />
                                <span className="ml-2 text-sm">4,92</span>
                              </span>
                              <p className="text-sm text-gray-800 mt-2">
                                <strong className="whitespace-nowrap">
                                  ₹ {event.price}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              {/* Bottom buttons */}
              <div className="fixed bottom-3 right-3">
                {/* Button to open the popup filter */}
                <button
                  onClick={() => setPopupFilterOpen(true)}
                  className="md:hidden flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                  title="Filter Events"
                >
                  <RxHamburgerMenu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
