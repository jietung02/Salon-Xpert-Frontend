import { purple } from "@mui/material/colors";
import { useAllStaffSchedules } from "../../hooks/useAllStaffSchedules";
import { useEffect } from "react";


export default function AllStaffSchedulesMain() {

  const { loading, error, calendarIdsString, fetchCalendarIds } = useAllStaffSchedules();


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

      {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FKuala_Lumpur&bgcolor=%23ffffff&mode=WEEK&hl=en_GB&title=Schedules&src=NDdkZjI1MmU5ZDAxMmFkMWE2MTQ1ZDhhNjQ4MjBmMTMyZmExYmQ3NTg3MDk3NmYxM2RlYWY3MzBjN2I0OTFlOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZGJhN2QyMjg3NTI0NDcyZDJhYTViMGQzOGRiZjZhMzM0ZmNmODhiYjc4MDU2YjNhOGIxMzBhYzcwZTM5YmUxY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZWY1MWRhYTUxNDRkZmU5MDNmODA3NzBlYWY3Mzk2NjJmZTJhZDQwYTg3MmI3YjMzMzFhYzdlYzFhMDkyMDllZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NGQ3OWZkZTBiNzZiNDdhZGNjMDU4NGQzNDU0OWVmMTE4MGU0M2YyOWFmMzcxYjdkZjEyMDRkNjI0NmVkNTdlMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NTg4OTlhMmJhMGFkYzg3ZTAwNzQ3ZjYwOTdhMTJhNTRhMWFmZDgyM2RkMjMxODkxMWY2ZTk1ZmVmMjc2MzhmYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZjJiYjMxYjk4MmI3ZmRiZjcxYmExMTg2YzYyZDI2ZWE1YmZmNDg4MjM3MzgwOTc2N2I1NDBlYzYyYTc0YjcyZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MjJmZmQxMGE2ZmQ0NDUyOWUxYTY2MmMxNDQ4ZTA2ZDU3MGU1Mzg5OThlNTg5MGVjZDc3ZWM4OWM3NjM3Zjk5ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MzRjNDI1OWY5NGRmMjFiZmRmMGNkOTdkZmRiODM5NDkzZTM4NWU0ZjViOTVhZDBmMzFkMDJhYTUyMmM5MjdlZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MDA0OTFmMjc1N2MzNzBlNjliMDJjOGRmMjFkNjRhNDUyYzU4YjA2ZDEwNmMyN2M3NTU5YTQwZjIyMzQ5OGU4N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NGNlOWRmYmM2NDRhNjM2ZDgyNjE0OTZmZTYxOTNkNjk5MTJkNTBiOWUyMmI3NjRmNzQ5NzhhNWFiMmU5YjBkMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTg4M2M4MWEyMThjNDI1YWFkNjlmZjYwOWY1OThkNmZiMDAyNDcwN2RmMTY2M2NiYjgwNjA4MjIxNThjYjViNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%238E24AA&color=%23B39DDB&color=%23AD1457&color=%23EF6C00&color=%23F09300&color=%234285F4&color=%23616161&color=%23A79B8E&color=%239E69AF&color=%234285F4&color=%23E67C73" className="mx-auto my-5 w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-14 2xl:px-14 py-12 bg-gray-200 h-screen overflow-auto" style={{backgroundColor:purple}} frameborder="0" scrolling="yes"></iframe>

            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKuala_Lumpur&bgcolor=%23ffffff&src=NDdkZjI1MmU5ZDAxMmFkMWE2MTQ1ZDhhNjQ4MjBmMTMyZmExYmQ3NTg3MDk3NmYxM2RlYWY3MzBjN2I0OTFlOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NzYwNWNiYjBiZjFkNTM1NjYyMTllZDNiMGIyOWRjYjFiODNmOWUzY2FjZTVhYWNjMmZkNTAzNDZkNTQ3ZDVjZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZGJhN2QyMjg3NTI0NDcyZDJhYTViMGQzOGRiZjZhMzM0ZmNmODhiYjc4MDU2YjNhOGIxMzBhYzcwZTM5YmUxY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZWY1MWRhYTUxNDRkZmU5MDNmODA3NzBlYWY3Mzk2NjJmZTJhZDQwYTg3MmI3YjMzMzFhYzdlYzFhMDkyMDllZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NGQ3OWZkZTBiNzZiNDdhZGNjMDU4NGQzNDU0OWVmMTE4MGU0M2YyOWFmMzcxYjdkZjEyMDRkNjI0NmVkNTdlMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NTg4OTlhMmJhMGFkYzg3ZTAwNzQ3ZjYwOTdhMTJhNTRhMWFmZDgyM2RkMjMxODkxMWY2ZTk1ZmVmMjc2MzhmYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZjJiYjMxYjk4MmI3ZmRiZjcxYmExMTg2YzYyZDI2ZWE1YmZmNDg4MjM3MzgwOTc2N2I1NDBlYzYyYTc0YjcyZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MjJmZmQxMGE2ZmQ0NDUyOWUxYTY2MmMxNDQ4ZTA2ZDU3MGU1Mzg5OThlNTg5MGVjZDc3ZWM4OWM3NjM3Zjk5ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MzRjNDI1OWY5NGRmMjFiZmRmMGNkOTdkZmRiODM5NDkzZTM4NWU0ZjViOTVhZDBmMzFkMDJhYTUyMmM5MjdlZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MDA0OTFmMjc1N2MzNzBlNjliMDJjOGRmMjFkNjRhNDUyYzU4YjA2ZDEwNmMyN2M3NTU5YTQwZjIyMzQ5OGU4N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NGNlOWRmYmM2NDRhNjM2ZDgyNjE0OTZmZTYxOTNkNjk5MTJkNTBiOWUyMmI3NjRmNzQ5NzhhNWFiMmU5YjBkMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTg4M2M4MWEyMThjNDI1YWFkNjlmZjYwOWY1OThkNmZiMDAyNDcwN2RmMTY2M2NiYjgwNjA4MjIxNThjYjViNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%238E24AA&color=%237CB342&color=%23B39DDB&color=%23AD1457&color=%23EF6C00&color=%23F09300&color=%234285F4&color=%23616161&color=%23A79B8E&color=%23009688&color=%234285F4&color=%23E67C73" className="mx-auto my-5 w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-14 2xl:px-14 py-12 bg-gray-200 h-screen overflow-auto" style={{backgroundColor:purple}} scrolling="no"></iframe> */}


      {calendarIdsString &&
          <iframe src={`https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FKuala_Lumpur&bgcolor=%23ffffff&showPrint=0&mode=WEEK&hl=en_GB&title=Schedules&${calendarIdsString}&color=%238E24AA&color=%23B39DDB&color=%23AD1457&color=%23EF6C00&color=%23F09300&color=%234285F4&color=%23616161&color=%23A79B8E&color=%239E69AF&color=%234285F4&color=%23E67C73`} className="mx-auto my-5 w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-14 2xl:px-14 py-12 bg-gray-200 custom-height-iframe overflow-auto" style={{ backgroundColor: purple }} frameborder="0" scrolling="yes"></iframe>

        }

      {/* <iframe src="https://calendar.google.com/calendar/embed?src=00491f2757c370e69b02c8df21d64a452c58b06d106c27c7559a40f223498e87%40group.calendar.google.com&ctz=Asia%2FKuala_Lumpur" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe> */}
    </div>
  );
}