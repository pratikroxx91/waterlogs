import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import EmptyState from '../../components/EmptyState.jsx';

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPendingReports = async () => {

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/reports/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setReports(data);
        } catch (error) {
            console.error("Error fetching pending reports:", error);
        } finally {
            setLoading(false);
        }

    };

    const approveReport = async (id) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/admin/reports/${id}/approve`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
            setReports(prev =>
                prev.filter(report => report._id !== id)
            );
        }
    };

    const rejectReport = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/admin/reports/${selectedReport._id}/reject`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    rejectionReason: rejectionReason
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            setReports(prevReports =>
                prevReports.filter(report => report._id !== selectedReport._id)
            );

            setSelectedReport(null);
            setRejectionReason("");
        }
    };

    useEffect(() => {
        fetchPendingReports();
    }, []);


    return (
        <>
            <div className='min-h-screen bg-black text-white p-8'>

                <div className='max-w-4xl mx-auto'>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold mb-2">
                            Admin Dashboard
                        </h1>

                        <p className="text-gray-400">
                            Review and manage submitted waterlogging reports
                        </p>
                    </div>

                    <h2 className="text-xl text-gray-300 font-semibold mb-7">
                        Pending Reports
                    </h2>
                    <div className='grid gap-6'>

                        {loading ? (<LoadingSpinner />) : reports.length === 0 ? (
                            <EmptyState message="There are no reports to show." />) : (
                            reports.map((report) => (
                                <div
                                    key={report._id}
                                    className='bg-gray-900 border border-gray-700 rounded-xl p-6'
                                >
                                    {report.images.length > 0 && (
                                        <img
                                            src={report.images[0]}
                                            alt="Waterlogging report"
                                            className='w-full max-h-80 object-cover rounded-lg mb-5'
                                        />
                                    )}

                                    <h3 className='text-lg font-bold mb-3'>
                                        {report.waterloggingType} Waterlogging
                                    </h3>
                                    <p className='text-gray-300 mb-5'>
                                        {report.description}
                                    </p>

                                    <div className='space-y-2 text-sm mb-6'>

                                        <p>
                                            <span className='text-gray-400'>
                                                Pedestrian:
                                            </span>{' '}
                                            {report.pedestrianAdvice}
                                        </p>

                                        <p>
                                            <span className='text-gray-400'>
                                                Two-Wheeler:
                                            </span>{' '}
                                            {report.vehicleAdvice.twoWheeler}
                                        </p>

                                        <p>
                                            <span className='text-gray-400'>
                                                Three-Wheeler:
                                            </span>{' '}
                                            {report.vehicleAdvice.threeWheeler}
                                        </p>

                                        <p>
                                            <span className='text-gray-400'>
                                                Status:
                                            </span>{' '}
                                            {report.status}
                                        </p>

                                        <p>
                                            <span className='text-gray-400'>
                                                Area:
                                            </span>{' '}
                                            {report.location.area}, {report.location.landmark}
                                        </p>

                                    </div>

                                    <div className='flex gap-3'>

                                        <button
                                            onClick={() => approveReport(report._id)}
                                            className='bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg transition'
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() => setSelectedReport(report)}
                                            className='bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition'
                                        >
                                            Reject
                                        </button>

                                    </div>

                                    {selectedReport?._id === report._id && (
                                        <div className='mt-5 border-t border-gray-700 pt-5'>

                                            <h3 className='font-semibold mb-3'>
                                                Reject Report
                                            </h3>

                                            <textarea
                                                placeholder="Enter rejection reason"
                                                value={rejectionReason}
                                                onChange={(e) =>
                                                    setRejectionReason(e.target.value)
                                                }
                                                className='w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none'
                                                rows='4'
                                            />

                                            <div className='flex gap-3 mt-3'>

                                                <button
                                                    onClick={rejectReport}
                                                    className='bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition'
                                                >
                                                    Confirm Reject
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedReport(null);
                                                        setRejectionReason("");
                                                    }}
                                                    className='bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg transition'
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </div>
                                    )}

                                </div>
                            ))
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}

export default AdminDashboard
