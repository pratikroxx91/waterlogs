import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { statusStyles, waterloggingStyles } from "../utils/reportStyles.js";
import LoadingSpinner from '../../components/LoadingSpinner.jsx';


const ReportDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReportDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`);
            const data = await response.json();

            setReport(data);
        } catch (error) {
            console.error("Error fetching report details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportDetails();
    }, []);

    return (
        <>
            <div className='min-h-screen bg-black text-white p-8'>
                <div className='max-w-3xl mx-auto'>
                    <h1 className='text-2xl font-bold mb-6'>Report Details</h1>

                    <div>
                        {loading ? (<LoadingSpinner />) : (
                            report && (
                                <div className='bg-gray-900 border border-gray-700 rounded-xl p-6'>

                                    {report.images.length > 0 && (
                                        <img src={report.images}
                                            alt="Waterlogged area"
                                            className='w-full max-h-72 object-cover rounded-lg mb-6'
                                        />
                                    )}

                                    <h2 className='text-xl font-bold mb-4'>
                                        Waterlogging Level:{" "}
                                        <span
                                            className={`px-3 py-1 rounded-full ${waterloggingStyles[report.waterloggingType]}`}
                                        >
                                            {report.waterloggingType}
                                        </span></h2>
                                    <div className='space-y-4'>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Description </h3>
                                            <p className='text-sm text-gray-200'>{report.description}</p>
                                        </div>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Status:{" "}
                                                <span
                                                    className={`px-3 py-1 rounded-full ${statusStyles[report.status]}`}
                                                >
                                                    {report.status}
                                                </span>
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Pedestrian Advice </h3>
                                            <p className='text-gray-200 mt-1'> {report.pedestrianAdvice} </p>
                                        </div>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Two-Wheeler Advice </h3>
                                            <p className='text-gray-200 mt-1'> {report.vehicleAdvice.twoWheeler} </p>
                                        </div>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Three-Wheeler Advice </h3>
                                            <p className='text-gray-200 mt-1'> {report.vehicleAdvice.threeWheeler} </p>
                                        </div>

                                        <div>
                                            <h3 className='text-sm text-gray-400'> Location </h3>
                                            <p className='text-gray-200 mt-1'> {report.location.area}, {report.location.landmark} </p>
                                        </div>
                                        <div>
                                            <h3 className='text-sm text-gray-400'> Submitted At </h3>
                                            <p className='text-gray-200 mt-1'> {new Date(report.submittedAt).toLocaleString()} </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-5 py-2 rounded-lg transition' >
                        Back to Reports
                    </button>
                </div>
            </div>
        </>
    )
}

export default ReportDetails
