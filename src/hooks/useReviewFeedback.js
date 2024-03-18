import { useState } from "react";
import { fetchAllFeedbackAndRatings } from "../services/feedback";
import dayjs from "dayjs";

export const useReviewFeedback = () => {

    const serviceSpecificTableHeaders = ['Appointment ID', 'Gender', 'Age', 'Feedback Category', 'Feedback Comments', 'Overall Serivce Rating', 'Cleaniness', 'Satisfaction', 'Communication', 'Submitted Date'];

    const generalTableHeaders = ['Gender', 'Age', 'Feedback Category', 'Feedback Comments', 'Submitted Date'];
    const [tableData, setTableData] = useState({
        headers: [],
        feedbackDetails: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [sortIsOpen, setSortIsOpen] = useState(false);

    const toggleFilterButton = () => {
        setFilterIsOpen(!filterIsOpen);
    };

    const toggleSortButton = () => {
        setSortIsOpen(!sortIsOpen);
    };

    const [filterDetails, setFilterDetails] = useState({
        feedbackType: null,
        gender: null,
        age: null,
        feedbackCategory: null,
        overallRating: null,
        cleanlinessRating: null,
        satisfactionWithResultRating: null,
        communicationRating: null,
    });

    // true = ascending , false = descending
    const [sortDetails, setSortDetails] = useState({
        date: null,
        overallRating: null,
    });

    const [allServiceSpecificFeedback, setAllServiceSpecificFeedback] = useState([]);
    const [allGeneralFeedback, setAllGeneralFeedback] = useState([]);

    const updateFilterDetails = (e) => {
        setError(null);
        if (e === null) {
            return;
        }
        if (e.hasOwnProperty('target')) {
            const { name, value, checked, type } = e.target;

            setFilterDetails((prevDetails) => {

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

    }

    const updateSortDetails = (e) => {
        setError(null);
        if (e === null) {
            return;
        }
        if (e.hasOwnProperty('target')) {

            const { name, value, checked, type } = e.target;

            setSortDetails((prevDetails) => {

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
    }

    const overallServiceRatingScale = [
        { id: 'osrs1', value: '1', label: '1' },
        { id: 'osrs2', value: '2', label: '2' },
        { id: 'osrs3', value: '3', label: '3' },
        { id: 'osrs4', value: '4', label: '4' },
        { id: 'osrs5', value: '5', label: '5' },
    ];

    const cleaninessRatingScale = [
        { id: 'crs1', value: '1', label: '1' },
        { id: 'crs2', value: '2', label: '2' },
        { id: 'crs3', value: '3', label: '3' },
        { id: 'crs4', value: '4', label: '4' },
        { id: 'crs5', value: '5', label: '5' },
    ];

    const serviceSatisfactionRatingScale = [
        { id: 'ssrs1', value: '1', label: '1' },
        { id: 'ssrs2', value: '2', label: '2' },
        { id: 'ssrs3', value: '3', label: '3' },
        { id: 'ssrs4', value: '4', label: '4' },
        { id: 'ssrs5', value: '5', label: '5' },
    ];

    const communicationRatingScale = [
        { id: 'comsrs1', value: '1', label: '1' },
        { id: 'comsrs2', value: '2', label: '2' },
        { id: 'comsrs3', value: '3', label: '3' },
        { id: 'comsrs4', value: '4', label: '4' },
        { id: 'comsrs5', value: '5', label: '5' },
    ];

    const resetFilterDetails = () => {
        setFilterDetails({
            ...filterDetails,
            gender: null,
            age: null,
            feedbackCategory: null,
            overallRating: null,
            cleanlinessRating: null,
            satisfactionWithResultRating: null,
            communicationRating: null,
        })
    }

    const fetchAllFeedback = async () => {
        try {
            const allFeedback = await fetchAllFeedbackAndRatings(filterDetails.feedbackType);
            if (filterDetails.feedbackType === 'service-specific') {
                setAllServiceSpecificFeedback(allFeedback.data);
            }
            else if (filterDetails.feedbackType === 'general') {
                setAllGeneralFeedback(allFeedback.data);
            }
            convertToTable(filterDetails.feedbackType, allFeedback.data);

        } catch (error) {
            setError(error.message);
        }
    }

    const convertToTable = (feedbackType, data) => {


        if (feedbackType === 'service-specific') {

            const feedbackData = data.map((value) => {
                const reformatDate = dayjs(value.feedbackCreatedDate).tz('Asia/Kuala_Lumpur').format('DD-MM-YYYY');

                return [value.appointmentId, value.gender, value.age, value.feedbackCategory, value.feedbackComments, value.overallRating, value.cleanlinessRating, value.satisfactionWithResultRating, value.communicationRating, reformatDate];
            });
            setTableData({
                headers: serviceSpecificTableHeaders,
                feedbackDetails: feedbackData,
            });

        }
        else if (feedbackType === 'general') {

            const feedbackData = data.map((value) => {
                const reformatDate = dayjs(value.feedbackCreatedDate).tz('Asia/Kuala_Lumpur').format('DD-MM-YYYY');

                return [value.gender, value.age, value.feedbackCategory, value.feedbackComments, reformatDate];
            });
            setTableData({
                headers: generalTableHeaders,
                feedbackDetails: feedbackData,
            });
        }
    };

    const handleFilterApply = (e) => {
        e.preventDefault();
        filterData();

        toggleFilterButton();

    };

    const filterData = () => {

        const filterCriteria = Object.fromEntries(
            Object.entries(filterDetails).filter(([key, value]) => key !== 'feedbackType' && value !== null)
        );

        const filtered = allServiceSpecificFeedback.filter(feedback => {
            return Object.entries(filterCriteria).every(([key, value]) => {
                if (key === 'age') {
                    const [from, to] = value.split('-');
                    return feedback[key] >= parseInt(from) && feedback[key] <= parseInt(to);
                }
                else {
                    return feedback[key] === value;
                }

            });
        });
        convertToTable(filterDetails.feedbackType, filtered);


    }

    return { loading, error, filterIsOpen, sortIsOpen, toggleFilterButton, toggleSortButton, filterDetails, sortDetails, updateFilterDetails, resetFilterDetails, updateSortDetails, overallServiceRatingScale, cleaninessRatingScale, serviceSatisfactionRatingScale, communicationRatingScale, fetchAllFeedback, tableData, handleFilterApply, };
}