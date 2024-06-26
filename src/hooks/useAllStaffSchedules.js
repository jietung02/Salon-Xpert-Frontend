import { useState } from "react";
import { getAllStaffCalendarIds } from "../services/Dashboard";

export const useAllStaffSchedules = () => {
    const [calendarIdsString, setCalendarIdsString] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refreshPage = () => {
        setRefresh(!refresh);
    }

    const fetchCalendarIds = async () => {
        try {
            const allCalIds = await getAllStaffCalendarIds();
            setCalendarIdsString(allCalIds.data);
        } catch (error) {
            setError(error.message);
        }
    };

    return { loading, error, setError, refresh, refreshPage, calendarIdsString, fetchCalendarIds };
}

