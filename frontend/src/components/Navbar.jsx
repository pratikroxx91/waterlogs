import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const token = localStorage.getItem('token');

    const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <nav className="bg-gray-950 border-b border-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-2xl font-bold tracking-tight text-blue-500 hover:text-blue-400 transition"
                    >
                        WaterLogs
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">

                        {role === "admin" && (
                            <Link
                                to="/admin_dashboard"
                                className="hover:text-white transition"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        <Link
                            to={token ? "/user_dashboard" : "/login"}
                            className="hover:text-white transition"
                        >
                            My Reports
                        </Link>

                        <Link
                            to="/"
                            className="hover:text-white transition"
                        >
                            Latest Reports
                        </Link>

                        <Link
                            to="/create_report"
                            className="hover:text-white transition"
                        >
                            Submit Report
                        </Link>
                    </div>

                    {/* Desktop Authentication */}
                    <div className="hidden md:flex items-center gap-3">

                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg border border-gray-700 text-sm font-medium hover:border-gray-500 hover:text-white transition"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg text-sm font-medium hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 py-4">

                        <div className="flex flex-col gap-1 text-sm font-medium">

                            {role === "admin" && (
                                <Link
                                    to="/admin_dashboard"
                                    onClick={closeMenu}
                                    className="px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            <Link
                                to={token ? "/user_dashboard" : "/"}
                                onClick={closeMenu}
                                className="px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                            >
                                My Reports
                            </Link>

                            <Link
                                to="/public_reports"
                                onClick={closeMenu}
                                className="px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                            >
                                Latest Reports
                            </Link>

                            <Link
                                to="/create_report"
                                onClick={closeMenu}
                                className="px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                            >
                                Submit Report
                            </Link>

                            <div className="border-t border-gray-800 my-3"></div>

                            {token ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMenu();
                                    }}
                                    className="text-left px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        onClick={closeMenu}
                                        className="px-3 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={closeMenu}
                                        className="px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
