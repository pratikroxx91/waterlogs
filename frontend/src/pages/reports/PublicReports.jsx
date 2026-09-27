import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import { statusStyles, waterloggingStyles } from "../utils/reportStyles.js";
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import EmptyState from '../../components/EmptyState.jsx';

const AllReports = () => {

    const [publicReports, setPublicReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicReports = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
                const data = await response.json();

                setPublicReports(data)
            } catch (error) {
                console.error('Error fetching public reports');
            } finally {
                setLoading(false);
            };
        };

        fetchPublicReports();
    }, []);

    return (
        <>
            <div className='bg-black min-h-screen text-white p-8'>

                <div className="mt-12 max-w-3xl mx-auto border-t border-gray-800 pt-8 text-center">
                    <h2 className="text-xl font-bold text-white mb-3">
                        About Waterlogs
                    </h2>

                    <p className="text-gray-400 leading-relaxed">
                        Waterlogs is a community-driven platform for reporting and tracking
                        waterlogged streets in the Shyamnagar area. Check recent reports to understand local waterlogging
                        conditions and whether an area is passable for pedestrians and smaller vehicles.
                    </p>

                    <p className="text-gray-400 mt-3">
                        Have you encountered waterlogging in your area?{" "}
                        <Link
                            to="/login"
                            className="text-green-400 font-medium hover:text-green-300 transition"
                        >
                            Log in to submit a report
                        </Link>{" "}
                        and help keep the local community up to date.
                    </p>
                </div>

                <h1 className='font-semibold text-xl text-gray-300 py-5'>Latest Waterlogging Reports</h1>

                <div className='grid gap-2'>
                    {loading ? (<LoadingSpinner />) : publicReports.length === 0 ? (
                        <EmptyState message="There are no reports to show." />
                    ) : (
                        publicReports.map((report) => (
                            <div
                                key={report._id}
                                onClick={() => navigate(`/reports/${report._id}`)}
                                className='bg-gray-900 border border-gray-700 rounded-lg p-5 cursor-pointer hover:border-gray-500 transition'
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {report.location.area}, {report.location.landmark}
                                </h2>
                                <h2 className='text-lg font-bold mb-2'>Waterlogging Level:{" "}
                                    <span className={`px-3 py-1 rounded-full ${waterloggingStyles[report.waterloggingType]}`}>
                                        {report.waterloggingType}
                                    </span>
                                </h2>
                                <div className='space-y-3'>
                                    <p className='text-gray-300 mb-3'>Description: {report.description}</p>
                                    <p className='text-sm text-gray-400'>Status:{" "}
                                        <span className={`px-3 py-1 rounded-full ${statusStyles[report.status]}`}>
                                            {report.status}
                                        </span>
                                    </p>
                                    <p className='text-sm text-gray-400'>Submitted: {new Date(report.submittedAt).toLocaleString()} </p>
                                </div>
                            </div>
                        ))
                    )}
                </div >

            </div>
        </>
    )
}

export default AllReports;