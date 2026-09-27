import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { statusStyles, waterloggingStyles } from "../utils/reportStyles.js";
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import EmptyState from '../../components/EmptyState.jsx';

const UserDashboard = () => {
    const [myReports, setMyReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchMyReports = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/my-reports`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            setMyReports(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
            navigate("/login");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchMyReports();
    }, []);


    return (
        <>
            <div className='min-h-screen bg-black text-white p-8'>
                <div className='max-w-3xl mx-auto'>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold mb-2">
                            My Reports
                        </h1>

                        <p className="text-gray-400">
                            Reports submitted by the user
                        </p>
                    </div>
                    <div className='grid gap-4'>
                        {loading ? (<LoadingSpinner />) : myReports.length === 0 ? (
                            <EmptyState message="There are no reports to show." />
                        ) : (
                            myReports.map((report) => (
                                <div key={report._id}
                                    className='bg-gray-900 border border-gray-700 rounded-xl p-6' >

                                    <h2 className='text-lg font-bold mb-3'> Waterlogging Level:{" "}
                                        <span className={`px-3 py-1 rounded-full ${waterloggingStyles[report.waterloggingType]}`}>
                                            {report.waterloggingType}
                                        </span>
                                    </h2>
                                    <p className='text-gray-300 mb-4'>
                                        Location: {report.location.area}, {report.location.landmark}
                                    </p>
                                    <p className='text-gray-300 mb-4'>
                                        Description: {report.description}
                                    </p>
                                    <div className='border-t border-gray-700 pt-4'> <p className='text-sm'>
                                        <span className='text-gray-400'>
                                            Status:
                                        </span>{' '}
                                        <span className={`px-3 py-1 rounded-full ${statusStyles[report.status]}`}>
                                            {report.status}
                                        </span>
                                    </p> {report.status === "Rejected" && (
                                        <div className='mt-3 bg-red-950/40 border border-red-900 rounded-lg p-3'>
                                            <p className='text-sm text-red-300'> <span className='font-semibold'> Rejection reason:
                                            </span>{' '}
                                                {report.rejectionReason}
                                            </p>
                                        </div>
                                    )}
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;
