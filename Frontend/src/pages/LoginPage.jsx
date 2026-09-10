import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      return setError('Please enter your email.');
    }
    if (!password) {
      return setError('Password is required.');
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = async () => {
    try {
      setLoading(true);
      setError('');
      await demoLogin();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cream-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-charcoal-600 mt-1">
            Log in to continue your 2-minute wellness journey.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              className="w-full px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-hidden focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 text-sm bg-cream-50/40 text-charcoal-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-hidden focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 text-sm bg-cream-50/40 text-charcoal-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md shadow-lavender-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-charcoal-500 font-semibold">Hackathon Demo</span>
          </div>
        </div>

        {/* Demo Account Button */}
        <button
          type="button"
          onClick={handleUseDemo}
          disabled={loading}
          className="w-full py-3 px-4 bg-charcoal-50 hover:bg-charcoal-100 text-charcoal-800 font-semibold rounded-xl text-sm border border-charcoal-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Use Demo Account (One-Click)</span>
        </button>

        <div className="mt-4 p-3 bg-lavender-50/60 rounded-xl border border-lavender-100 text-[11px] text-charcoal-600 text-center">
          Demo login: <span className="font-mono text-lavender-800 font-semibold">demo@example.com</span> /{' '}
          <span className="font-mono text-lavender-800 font-semibold">Demo123!</span>
        </div>

        <p className="text-center text-xs text-charcoal-600 mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-lavender-600 hover:text-lavender-800 underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
