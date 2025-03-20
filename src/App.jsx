import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StartupDetail from './pages/StartupDetail';
import AddStartup from './pages/AddStartup';
import NotFound from './pages/NotFound';
import { StartupsProvider } from './context/StartupsContext';
import ZaptBadge from './components/ZaptBadge';

export default function App() {
  return (
    <Router>
      <StartupsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/startup/:id" element={<StartupDetail />} />
            <Route path="/add-startup" element={<AddStartup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ZaptBadge />
        </Layout>
      </StartupsProvider>
    </Router>
  );
}