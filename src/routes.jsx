import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';


import Dashboard from './pages/AdminAndStaff/Dashboard/Dashboard';
import Reports from './pages/AdminAndStaff/Reports/Reports';
import AccessControl from './pages/AdminAndStaff/AccessControl/AccessControl';
import Roles from './pages/AdminAndStaff/Roles/Roles';
import CreateRole from './features/Role/CreateRole';
import ModifyRole from './features/Role/ModifyRole';
import PriceConfigurations from './pages/AdminAndStaff/PriceConfigurations/PriceConfigurations';
import ServiceConfigurations from './pages/AdminAndStaff/ServiceConfigurations/ServiceConfigurations';
import StaffProfileConfigurations from './pages/AdminAndStaff/StaffProfileConfigurations/StaffProfileConfigurations';
import FeedbackReviews from './pages/AdminAndStaff/FeedbackReviews/FeedbackReviews';
import StaffSchedules from './pages/AdminAndStaff/StaffSchedules/StaffSchedules';
import UpdateServicePrice from './pages/AdminAndStaff/UpdateServicePrice/UpdateServicePrice';
import ViewSchedule from './pages/AdminAndStaff/ViewSchedule/ViewSchedule';

import AppointmentHistory from './pages/Customer/AppointmentHistory/AppointmentHistory';
import CustomerDashboard from './pages/Customer/CustomerDashboard/CustomerDashboard';
import Profile from './pages/Customer/Profile/Profile';
import FeedbackRatings from './pages/Customer/FeedbackRatings/FeedbackRatings';
import NewAppointment from './pages/Customer/NewAppointment/NewAppointment';
import BookSummary from './pages/Customer/BookSummary/BookSummary';
import BookSuccess from './pages/Customer/BookSuccess/BookSuccess';
import PaymentPage from './pages/Customer/PaymentPage/PaymentPage';

import GuestDashboard from './pages/Guest/GuestDashboard/GuestDashboard';
import GuestAppointment from './pages/Guest/GuestAppointment/GuestAppointment';
import GuestBookSummary from './pages/Guest/GuestBookSummary/GuestBookSummary';
import GuestBookSuccess from './pages/Guest/GuestBookSuccess/GuestBookSuccess';

import ModifyPricingRule from './features/SalonPrice/ModifyPricingRule';
import CreatePricingRule from './features/SalonPrice/CreatePricingRule';
import CreateService from './features/SalonService/CreateService';
import ModifyService from './features/SalonService/ModifyService';
import CreateStaffProfile from './features/SalonStaffProfile/CreateStaffProfile';
import ModifyStaffProfile from './features/SalonStaffProfile/ModifyStaffProfile';
import GuestFeedbackRatings from './pages/Guest/GuestFeedbackRatings/GuestFeedbackRatings';
import GuestPaymentPage from './pages/Guest/GuestPaymentPage/GuestPaymentPage';

import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';





export default function AppRoutes() {
  const { isAuthenticated, role, permissions } = useContext(AuthContext);


  const adminRoutes = (
    <>
      {/* Admin Routes */}
      <Route path='/admin' element={<Dashboard />} />

      <Route path='/admin/reports' element={<Reports />} />
      <Route path='/admin/access-control' element={<AccessControl />} />

      <Route path='/admin/roles' element={<Roles />} >
        <Route path='create' element={<CreateRole />} />
        <Route path='modify' element={<ModifyRole />} />
      </Route>
      <Route path='/admin/price-configurations' element={<PriceConfigurations />} >
        <Route path='create' element={<CreatePricingRule />} />
        <Route path='modify' element={<ModifyPricingRule />} />
      </Route>

      <Route path='/admin/service-configurations' element={<ServiceConfigurations />}>
        <Route path='create' element={<CreateService />} />
        <Route path='modify' element={<ModifyService />} />
      </Route>
      <Route path='/admin/staff-profile-configurations' element={<StaffProfileConfigurations />} >
        <Route path='create' element={<CreateStaffProfile />} />
        <Route path='modify' element={<ModifyStaffProfile />} />
      </Route>
      <Route path='/admin/feedback-reviews' element={<FeedbackReviews />} />
    </>
  );

  const staffRoutes = (
    <>
      {/* Staff Routes */}
      <Route path='/staff' element={
        permissions && permissions.some(permission => {
          return permission.rolePermission === 'Dashboard';
        }) ? (
          <Dashboard />
        ) : permissions && permissions.some(permission => {
          return permission.rolePermission === 'Service Management';
        }) ? (
          <ViewSchedule />
        ) : (
          <UpdateServicePrice />
        )
      } />

      <Route path='/staff/reports' element={<Reports />} />
      <Route path='/staff/access-control' element={<AccessControl />} />

      <Route path='/staff/roles' element={<Roles />} >
        <Route path='create' element={<CreateRole />} />
        <Route path='modify' element={<ModifyRole />} />
      </Route>
      <Route path='/staff/price-configurations' element={<PriceConfigurations />} >
        <Route path='create' element={<CreatePricingRule />} />
        <Route path='modify' element={<ModifyPricingRule />} />
      </Route>

      <Route path='/staff/service-configurations' element={<ServiceConfigurations />}>
        <Route path='create' element={<CreateService />} />
        <Route path='modify' element={<ModifyService />} />
      </Route>
      <Route path='/staff/staff-profile-configurations' element={<StaffProfileConfigurations />} >
        <Route path='create' element={<CreateStaffProfile />} />
        <Route path='modify' element={<ModifyStaffProfile />} />
      </Route>
      <Route path='/staff/feedback-reviews' element={<FeedbackReviews />} />

      <Route path='/staff/staff-schedules' element={<StaffSchedules />} />

      <Route path='/staff/update-service-price' element={<UpdateServicePrice />} />
      <Route path='/staff/view-schedules' element={<ViewSchedule />} />

    </>
  );

  const customerRoutes = (
    <>
      {/* Customer Routes */}
      <Route path='/customer' element={<CustomerDashboard />} />
      <Route path='/customer/new-appointment' element={<NewAppointment />} />
      <Route path='/customer/booking-summary' element={<BookSummary />} />
      <Route path='/customer/booking-success' element={<BookSuccess />} />
      <Route path='/customer/appointment-history' element={<AppointmentHistory />} />
      {/* <Route path='/customer/cancel-appointment' element={<CancelAppointment />} /> can be removed? */}
      <Route path='/customer/feedback-ratings' element={<FeedbackRatings />} />
      <Route path='/customer/profile' element={<Profile />} />
      <Route path='/customer/payment/:appointmentId' element={<PaymentPage />} />
    </>

  );

  const guestRoutes = (
    <>
      {/* Guest Routes */}
      <Route path='/guest' element={<GuestDashboard />} />
      <Route path='/guest/new-appointment' element={<GuestAppointment />} />
      <Route path='/guest/booking-summary' element={<GuestBookSummary />} />
      <Route path='/guest/booking-success' element={<GuestBookSuccess />} />
      <Route path='/guest/feedback-ratings' element={<GuestFeedbackRatings />} />
      <Route path='/guest/payment/:appointmentId' element={<GuestPaymentPage />} />

    </>
  );

  const getRoutesBasedOnRole = () => {
    switch (role) {
      case 'admin':
        return adminRoutes;
      case 'staff':
        return staffRoutes;
      case 'customer':
        return customerRoutes;
    }
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route index element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        {isAuthenticated === true ? (
          <>
            {role === 'admin' && adminRoutes}
            {role === 'staff' && staffRoutes}
            {role === 'customer' && customerRoutes}
            {role === 'guest' && guestRoutes}
          </>
        ) : (
          guestRoutes
        )}

        {/* Fallback Route */}
        <Route path='*' element={<Login />} />
        {/* check if has dashboard route for staff else set the first to be the main page */}
        {/* <Route path='/staff' element={ } /> */}
      </Routes>
    </>
  );
} 
