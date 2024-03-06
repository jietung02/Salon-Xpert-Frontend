import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getSalonServices, createNewService } from "../services/salonConfiguration";
import { AuthContext } from "../context/AuthContext";
import { ServiceContext } from "../context/ServiceContext";

export const useServiceConfiguration = () => {

    const { role } = useContext(AuthContext);
    const { performingChanges, performedChanges } = useContext(ServiceContext);
    const navigate = useNavigate();

    const [serviceDetails, setServiceDetails] = useState({
        serviceCode: null,
        serviceName: null,
        serviceDuration: null,
        serviceBasedPrice: null,
    });

    const [tableData, setTableData] = useState({
        headers: [],
        servicesData: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const updateServiceDetails = (e) => {
        console.log(e.target.value)

        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setServiceDetails({
                ...serviceDetails,
                [name]: value,
            });
        }

    }

    const fetchAllServiceRecords = async () => {
        try {
            const allServices = await getSalonServices();
            setTableData({
                headers: allServices.data.headers,
                servicesData: allServices.data.servicesData,
            })

        } catch (error) {
            // if (error.message === 'No Services Found') {
            setError(error.message);
            // }
        }

    }

    const handleSubmitForCreation = async (e) => {
        e.preventDefault();
        //rmb to change the performing state for all delete modify and create, to fetch the services again
        try {
            const response = await createNewService(serviceDetails);

            navigate(role === 'admin' ? '/admin/service-configurations' : '/staff/service-configurations')
        } catch (error) {
            setError(error.message)
        } finally {
            performedChanges();
        }
    }

    const handleEdit = (serviceDetails) => {
        // rmb to check authcontext role for navigating
        navigate('/admin/service-configurations/modify', { state: { serviceDetails: serviceDetails } });
    }

    const handleDelete = (serviceCode) => {

    }

    return { serviceDetails, tableData, loading, error, updateServiceDetails, fetchAllServiceRecords, handleSubmitForCreation, handleEdit, handleDelete }

}
