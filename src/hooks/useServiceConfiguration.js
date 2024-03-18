import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getSalonServices, createNewService, editService, deleteService, } from "../services/salonConfiguration";
import { AuthContext } from "../context/AuthContext";
import { ServiceContext } from "../context/ServiceContext";

export const useServiceConfiguration = () => {

    const { role } = useContext(AuthContext);
    const { performingChanges, serviceDetails, performedChanges, updateServiceDetails, updateServiceDetailsArrayVer, clearServiceDetails, } = useContext(ServiceContext);
    const navigate = useNavigate();


    const [tableData, setTableData] = useState({
        headers: [],
        servicesData: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchAllServiceRecords = async () => {
        try {
            const allServices = await getSalonServices();
            setTableData({
                headers: allServices.data.headers,
                servicesData: allServices.data.servicesData,
            })

        } catch (error) {
            setError(error.message);
        }

    }

    const handleSubmitForCreation = async (e) => {
        e.preventDefault();
        //rmb to change the performing state for all delete modify and create, to fetch the services again
        try {
            setLoading(true);
            const response = await createNewService(serviceDetails);
            clearServiceDetails();
            navigate(role === 'admin' ? '/admin/service-configurations' : '/staff/service-configurations', { state: { successMessage: `Successfully Created a New Service, Service Code : ${serviceDetails.serviceCode}` } })
        } catch (error) {
            setError(error.message);
        } finally {
            performedChanges();
            setLoading(false);
        }
    }

    const handleSubmitForEditService = async (e) => {
        e.preventDefault();
        //rmb to change the performing state for all delete modify and create, to fetch the services again
        try {
            setLoading(true);
            const response = await editService(serviceDetails);
            clearServiceDetails();
            navigate(role === 'admin' ? '/admin/service-configurations' : '/staff/service-configurations', { state: { successMessage: `Successfully Updated Service for Service Code : ${serviceDetails.serviceCode}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            performedChanges();
            setLoading(false);
        }
    }

    const handleEdit = (serviceDetails) => {
        updateServiceDetailsArrayVer(serviceDetails);
        navigate(role === 'admin' ? '/admin/service-configurations/modify' : '/staff/service-configurations/modify');
    }

    const handleDelete = async (serviceCode) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this service?');

        if (isConfirmed) {
            //rmb to change the performing state for all delete modify and create, to fetch the services again
            try {
                const response = await deleteService(serviceCode);

                navigate(role === 'admin' ? '/admin/service-configurations' : '/staff/service-configurations', { state: { successMessage: `Successfully Delete Service (Service Code : ${serviceCode})` } })
            } catch (error) {
                setError(error.message)
            } finally {
                performedChanges();
            }
        }

    }

    return { serviceDetails, tableData, loading, error, updateServiceDetails, fetchAllServiceRecords, handleSubmitForCreation, handleSubmitForEditService, handleEdit, handleDelete }

}
