import { useState } from "react";
import { fetchSpecialists, generateReport, } from "../services/reportService";

export const useGenerateReports = () => {

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [specialists, setSpecialists] = useState([]);

    const [reportDetails, setReportDetails] = useState({
        selectedReport: null,
        selectedSpecialist: null,
        dateFrom: null,
        dateTo: null,
    });

    const [reportData, setReportData] = useState(null);

    const updateReportDetails = (e, key) => {
        setError(null);
        if (e === null) {
            return;
        }
        if (e.hasOwnProperty('target')) {
            const { name, value, checked, type } = e.target;

            setReportDetails((prevDetails) => {

                if (type === 'checkbox') {

                    return {
                        ...prevDetails,
                        [name]: checked ? [...prevDetails[name], value] : prevDetails[name].filter(item => item !== value),
                    };
                }

                return {
                    ...prevDetails,
                    [name]: value,
                };
            });
        }
        else {
            setReportDetails((prevDetails) => {
                return {
                    ...prevDetails,
                    [key]: e.tz('Asia/Kuala_Lumpur').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                }
            });
        }
    };

    const resetReportDetailsExceptSelectedReport = () => {
        setReportDetails((prevDetails) => {
            return {
                ...prevDetails,
                selectedSpecialist: null,
                dateFrom: null,
                dateTo: null,
            }

        })
    }

    const fetchAllSpecialist = async () => {
        try {
            const allSpecialists = await fetchSpecialists();
            setSpecialists(allSpecialists.data)

        } catch (error) {
            setError(error.message);
        }
    }

    const loadStaffPerformanceReportLayout = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/reports/staff-performance-report/layout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    };

    const loadFeedbackReportLayout = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/reports/feedback-report/layout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    };

    const loadRevenueReportLayout = async () => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/reports/revenue-report/layout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    };
    
    const handleReportGeneration = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);

            if (error || (reportDetails.selectedReport === 'feedbackReport' && (reportDetails.dateFrom === null || reportDetails.dateTo === null)) || (reportDetails.selectedReport === 'revenueReport' && (reportDetails.dateFrom === null || reportDetails.dateTo === null))) {
                setError('Please fill up all the required field')
                return;
            }
            const response = await generateReport(reportDetails);
            setReportData(response.data)

            // clearRoleDetails();
            // navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Created a New Role, Role Code : ${roleDetails.roleCode}` } })
            // performedChanges();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, setError, successMessage, setSuccessMessage, reportDetails, resetReportDetailsExceptSelectedReport, updateReportDetails, fetchAllSpecialist, specialists, handleReportGeneration, reportData, loadStaffPerformanceReportLayout, loadFeedbackReportLayout,loadRevenueReportLayout, };
};