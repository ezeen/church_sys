import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../member_components/Login';
import StaffLogin from '../admin_components/AdminLogin';
import Home from '../member_components/Home';
import PrimaryRegistration from '../member_components/PrimaryRegistration';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../member_components/Dashboard';
import Events from '../member_components/Events';
import Sermons from '../member_components/Sermons';
import District from '../member_components/District';
import Family from '../member_components/Family';
import Settings from '../member_components/Settings';
import Profile from '../member_components/Profile';
import AdminHome from '../admin_components/AdminHome';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/home" replace />;
}

const AppRouter = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/stafflogin" element={<StaffLogin />} />
                <Route path='/register' element={<PrimaryRegistration />} />
                <Route path="/" element={<ProtectedRoute><Home darkMode={darkMode} toggleDarkMode={toggleDarkMode}/></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="events" element={<Events />} />
                    <Route path="sermons" element={<Sermons />} />
                    <Route path="district" element={<District />} />
                    <Route path="family" element={<Family darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="/admin" element={<ProtectedRoute><AdminHome darkMode={darkMode} toggleDarkMode={toggleDarkMode}/></ProtectedRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="events" element={<Events />} />
                    <Route path="sermons" element={<Sermons />} />
                    <Route path="district" element={<District />} />
                    <Route path="family" element={<Family darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
                {/* Add more routes here */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;