import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PreviewPage from './pages/PreviewPage';
import CreateDBPage from './pages/CreateDBPage';
import DataPage from './pages/DataPage';
import ProgressApprovalPage from './pages/ProgressApprovalPage';
import ApprovalPage from './pages/ApprovalPage';
import HistoryPage from './pages/HistoryPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/data-page/preview" element={<PreviewPage />} />
        <Route path="/create-database" element={<CreateDBPage />} />
        <Route path="/data-page" element={<DataPage />} />
        <Route path="/data-page/progress-approval" element={<ProgressApprovalPage />} />
        <Route path="/approval-page" element={<ApprovalPage />} />
        <Route path="/history-page" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
