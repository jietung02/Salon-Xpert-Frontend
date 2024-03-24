import { purple } from "@mui/material/colors";
import { useAllStaffSchedules } from "../../hooks/useAllStaffSchedules";
import { useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function AllStaffSchedulesMain() {

  const { loading, error,setError, refresh, refreshPage, calendarIdsString, fetchCalendarIds } = useAllStaffSchedules();


  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchCalendarIds();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Staff Schedules</h1>

      {error && (
        <div class="w-4/5 text-center bg-red-100 border border-red-400 text-red-700 mx-auto px-5 py-2 rounded relative" role="alert">
          <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
        </div>
      )}

      {calendarIdsString &&
        (
          <div className="mx-auto my-5 w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-14 2xl:px-14 py-12 bg-gray-200 h-fit">
            <div className="relative w-full">
              <button
                type='button'
                className="absolute top-0 left-full z-10"
                onClick={() => {
                  setError(null);
                  refreshPage();
                }}
              >
                <ArrowPathIcon className="h-6 w-6 hover:text-gray-500" color="#111827" />
              </button>
            </div>
            {refresh === true &&
              <iframe src={`https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FKuala_Lumpur&bgcolor=%23ffffff&showPrint=0&mode=WEEK&hl=en_GB&title=Schedules&${calendarIdsString}&color=%238E24AA&color=%23B39DDB&color=%23AD1457&color=%23EF6C00&color=%23F09300&color=%234285F4&color=%23616161&color=%23A79B8E&color=%239E69AF&color=%234285F4&color=%23E67C73`} className="mx-auto w-full flex flex-wrap md:items-end custom-height-iframe overflow-auto" frameborder="0" scrolling="yes">
              </iframe>

            }

            {refresh === false &&
              <iframe src={`https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FKuala_Lumpur&bgcolor=%23ffffff&showPrint=0&mode=WEEK&hl=en_GB&title=Schedules&${calendarIdsString}&color=%238E24AA&color=%23B39DDB&color=%23AD1457&color=%23EF6C00&color=%23F09300&color=%234285F4&color=%23616161&color=%23A79B8E&color=%239E69AF&color=%234285F4&color=%23E67C73`} className="mx-auto w-full flex flex-wrap md:items-end custom-height-iframe overflow-auto" frameborder="0" scrolling="yes">
              </iframe>

            }
          </div>

        )}

    </div>
  );
}