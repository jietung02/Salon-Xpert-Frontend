
import { useGenerateReports } from "../../hooks/useGenerateReports";
import Dropdown from "../../components/Dropdown/Dropdown";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { DatePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Viewer } from "@grapecity/activereports-react";

export default function GenerateReports() {
  const viewerRef = useRef();
  const { width } = useScreenSize();
  const { loading, error, setError, successMessage, setSuccessMessage, reportDetails, updateReportDetails, resetReportDetailsExceptSelectedReport, fetchAllSpecialist, specialists, handleReportGeneration, reportData, loadStaffPerformanceReportLayout, loadFeedbackReportLayout, loadRevenueReportLayout, } = useGenerateReports();

  const openStaffPerformanceReport = async () => {
    const report = await loadStaffPerformanceReportLayout();
    report.DataSources[0].ConnectionProperties.ConnectString =
      "jsondata=" + JSON.stringify(reportData);
    viewerRef.current.Viewer.open(report);
  };

  const openFeedbackReport = async () => {
    const report = await loadFeedbackReportLayout();
    report.DataSources[0].ConnectionProperties.ConnectString =
      "jsondata=" + JSON.stringify(reportData);
    viewerRef.current.Viewer.open(report);
  };

  const openRevenueReport = async () => {
    const report = await loadRevenueReportLayout();
    report.DataSources[0].ConnectionProperties.ConnectString =
      "jsondata=" + JSON.stringify(reportData);
    viewerRef.current.Viewer.open(report);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchAllSpecialist();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();

  }, []);

  useEffect(() => {

    resetReportDetailsExceptSelectedReport();
  }, [reportDetails.selectedReport]);


  useEffect(() => {

    if (reportData && reportDetails.selectedReport === 'staffPerformanceReport') {
      openStaffPerformanceReport();
    }
    else if (reportData && reportDetails.selectedReport === 'feedbackReport') {
      openFeedbackReport();
    }
    else if (reportData && reportDetails.selectedReport === 'revenueReport') {
      openRevenueReport();
    }
  }, [reportData]);

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Generate Reports</h1>

      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleReportGeneration(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Select Report Type</span>
          </div>
        </div>
        {successMessage && successMessage !== null && (
          <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
            <InformationCircleIcon className="h-6 w-6" />
            <span class="sr-only">Info</span>
            <div>
              <span className="pl-2">{successMessage}</span>
            </div>
          </div>
        )}
        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <div className="w-full">
          <Dropdown
            disabled={false}
            isSelected={reportDetails.selectedReport}
            label='Report Type'
            name='selectedReport'
            handleOnChange={updateReportDetails}
            options={[
              { label: '', value: '' },
              { label: 'Staff Performance', value: 'staffPerformanceReport' },
              { label: 'Feedback Report', value: 'feedbackReport' },
              { label: 'Revenue Report', value: 'revenueReport' },
            ]}

          />
        </div>

        {reportDetails.selectedReport && reportDetails.selectedReport === 'staffPerformanceReport' &&
          (<div className="w-full">
            <Dropdown
              disabled={false}
              isSelected={reportDetails.selectedSpecialist}
              label='Select a Specialist'
              name='selectedSpecialist'
              handleOnChange={updateReportDetails}
              options={[
                { label: '', value: '' },
                ...(Array.isArray(specialists) && specialists.map((specialist) => ({
                  value: specialist.staffId,
                  label: specialist.staffName,
                })))
              ]}
            />
          </div>)
        }

        {reportDetails.selectedReport && (reportDetails.selectedReport === 'feedbackReport' || reportDetails.selectedReport === 'revenueReport') &&
          <>
            {width > 768 ? (
              <>
                <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                  <DatePicker
                    className="w-full"
                    value={reportDetails.dateFrom ? dayjs(reportDetails.dateFrom) : null}
                    label="From Date"
                    slotProps={{ textField: { size: 'medium' } }}
                    name="dateFrom"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setError(newError)}
                    disableFuture
                    onChange={(e) => { updateReportDetails(e, 'dateFrom') }}
                    onAccept={(e) => { updateReportDetails(e, 'dateFrom') }}
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                  <DatePicker
                    className="w-full"
                    value={reportDetails.dateTo ? dayjs(reportDetails.dateTo) : null}
                    label="To Date"
                    slotProps={{ textField: { size: 'medium' } }}
                    name="dateTo"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setError(newError)}
                    disableFuture
                    minDate={dayjs(reportDetails.dateFrom)}
                    onChange={(e) => { updateReportDetails(e, 'dateTo') }}
                    onAccept={(e) => { updateReportDetails(e, 'dateTo') }}
                  />
                </div>
              </>
            ) :
              <>
                <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                  <MobileDatePicker
                    className="w-full"
                    value={reportDetails.dateFrom ? dayjs(reportDetails.dateFrom) : null}
                    label="From Date"
                    slotProps={{ textField: { size: 'medium' } }}
                    name="dateFrom"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setError(newError)}
                    disableFuture
                    onAccept={(e) => { updateReportDetails(e, 'dateFrom') }}
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                  <MobileDatePicker
                    className="w-full"
                    value={reportDetails.dateTo ? dayjs(reportDetails.dateTo) : null}
                    label="To Date"
                    slotProps={{ textField: { size: 'medium' } }}
                    name="dateTo"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setError(newError)}
                    disableFuture
                    minDate={dayjs(reportDetails.dateFrom)}
                    onAccept={(e) => { updateReportDetails(e, 'dateTo') }}
                  />
                </div>
              </>
            }
          </>
        }
        <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Generate
          </button>
        </div>
      </form>

      {reportData && <div className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12">
        <div id="viewer-host">
          <Viewer ref={viewerRef} />
        </div>
      </div>}

    </div >


  );
}