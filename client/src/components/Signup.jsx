import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                setLoading(false);
                return;
            }

            // Go to login and show a success message there
            navigate('/login', { state: { registered: true } });
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
                    <p className="text-4xl mb-2">🚀</p>
                    <h2 className="text-3xl font-extrabold">Create account</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Join and start sharing your blogs</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                                placeholder="At least 6 characters"
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

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Type the password again"
                            required
                            className={inputClass}
                        />
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
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Already have an account?{' '}
                    <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;