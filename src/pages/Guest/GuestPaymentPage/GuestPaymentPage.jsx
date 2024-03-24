import { useContext, useEffect } from "react";
import { useGuest } from "../../../hooks/useLogin";
import { AuthContext } from "../../../context/AuthContext";
import MakeFullPaymentPage from "../../../features/Customer/MakeFullPaymentPage";

export default function GuestPaymentPage() {

  const { dispatch } = useContext(AuthContext);
  const { guestAuth } = useGuest();

  const handleGuestMode = () => {

    const fetchGuestData = async () => {
      const guestData = await guestAuth();

      if (guestData !== undefined) {
        dispatch({ type: 'GUESTLOGIN', payload: guestData });
      }
      sessionStorage.setItem('authData', JSON.stringify(guestData));
    }
    fetchGuestData();
  }

  useEffect(() => {
    handleGuestMode();
  }, []);

  return (
    <MakeFullPaymentPage />
  );
};