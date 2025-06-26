import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AssistantDashboard from './Pages/Assistant/AssistantDashboard';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import DoctorAnalytics from './Pages/Doctor/DoctorAnalytics';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/assistant" element={<AssistantDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard/>} />
        <Route path="/doctor/analytics" element={<DoctorAnalytics />} />

      </Routes>
    </Router>
  );
}

export default App;
