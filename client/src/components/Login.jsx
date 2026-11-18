import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API_URL from '../config/api';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Set when the user has just registered
    const justRegistered = location.state?.registered;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
                setLoading(false);
                return;
            }

            // Save the login in the browser
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);

            navigate('/blogs');
        } catch (err) {
            setError('Cannot connect to server. Is the backend running?');
            setLoading(false);
        }
    };

    const inputClass = 'w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400';

    return (
        <div className="flex justify-center items-center py-12 sm:py-20">
            <div className="w-full max-w-md p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-xl">

                <div className="text-center mb-8">
                    <p className="text-4xl mb-2">👋</p>
                    <h2 className="text-3xl font-extrabold">Welcome back</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Login to continue to your blogs</p>
                </div>

                {justRegistered && (
                    <div className="mb-5 p-3 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm">
                        ✅ Registered successfully! Please login.
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                required
                                className={`${inputClass} pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                                aria-label="Show or hide password"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold p-3 rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    New user?{' '}
                    <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;