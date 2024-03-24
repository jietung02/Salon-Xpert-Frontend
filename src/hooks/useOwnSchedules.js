import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchStaffCalendarId } from "../services/serviceManagementService";

export const useOwnSchedules = () => {

    const { id } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [calendarIdString, setCalendarIdString] = useState(null);

    const refreshPage = () => {
        setRefresh(!refresh);
    }


    const fetchCalendarId = async () => {
        try {
            const calId = await fetchStaffCalendarId(id);
            setCalendarIdString(calId.data);
        } catch (error) {
            setError(error.message);
        }
    }

    return { loading, error, setError, refresh, refreshPage, calendarIdString, fetchCalendarId, };
}