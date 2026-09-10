import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Menu, X, User, LogOut, Compass, Heart, History, Zap, Clock } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, demoMode, toggleDemoMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'Check Mood', path: '/mood-check', icon: Heart },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-charcoal-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-500 to-lavender-700 flex items-center justify-center text-white shadow-sm shadow-lavender-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-charcoal-900 tracking-tight flex items-center gap-1.5">
                Mood-to-Move
                <span className="text-[10px] uppercase font-semibold bg-lavender-100 text-lavender-700 px-1.5 py-0.5 rounded-full tracking-wider">
                  2-Min
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-lavender-50 text-lavender-700 font-semibold'
                        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-lavender-600' : 'text-charcoal-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Judge Demo Mode Toggle Pill */}
            <button
              onClick={toggleDemoMode}
              title={demoMode ? 'Timer runs 10 seconds for fast hackathon demo' : 'Timer runs full 120 seconds in standard mode'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                demoMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                  : 'bg-charcoal-50 text-charcoal-600 border-charcoal-200 hover:bg-charcoal-100'
              }`}
            >
              {demoMode ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
                  <span>Demo Mode (10s)</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-charcoal-500" />
                  <span>Standard Mode (120s)</span>
                </>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-charcoal-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-charcoal-800 hover:text-lavender-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center font-semibold text-xs border border-lavender-200">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user?.name?.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-lavender-600 hover:bg-lavender-700 rounded-xl shadow-xs shadow-lavender-600/25 transition-all hover:shadow-md"
                >
                  Start Your Reset
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDemoMode}
              className={`p-1.5 rounded-lg text-xs font-medium border ${
                demoMode ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-charcoal-50 text-charcoal-600 border-charcoal-200'
              }`}
            >
              {demoMode ? '10s' : '120s'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-charcoal-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="pb-3 border-b border-charcoal-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-charcoal-900">{user?.name}</p>
                  <p className="text-xs text-charcoal-500">{user?.email}</p>
                </div>
                <div className="px-2 py-1 bg-lavender-100 text-lavender-700 text-xs font-semibold rounded-full">
                  Student
                </div>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                        isActive ? 'bg-lavender-50 text-lavender-700 font-semibold' : 'text-charcoal-700 hover:bg-charcoal-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-lavender-600" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-charcoal-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-medium text-charcoal-700 bg-charcoal-100 hover:bg-charcoal-200 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-lavender-600 hover:bg-lavender-700 rounded-xl"
              >
                Start Your Reset
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
