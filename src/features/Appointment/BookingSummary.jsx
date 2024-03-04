import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BookingSummary() {
    let location = useLocation();
    const { summaryDetails } = location.state;


    return (
        <div>
            <h1 className="px-8 py-6 text-3xl sm:px-7 md:px-11 md:py-6 md:text-4xl lg:px-11 md:text-left text-center font-bold text-gray-900">Book Appointment</h1>
            <h1>{summaryDetails.name}</h1>
            <h2>{summaryDetails.specialist}</h2>
        </div>
    );
}