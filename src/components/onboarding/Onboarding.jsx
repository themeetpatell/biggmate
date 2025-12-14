import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import QuickSetup from './QuickSetup';

const Onboarding = () => {
  const location = useLocation();
  
  // Get the current path relative to /onboarding
  const currentPath = location.pathname.replace('/onboarding', '').replace(/^\//, '') || 'mission';

  // If we're at the root onboarding path, redirect to mission
  if (location.pathname === '/onboarding' || location.pathname === '/onboarding/') {
    return <Navigate to="/onboarding/mission" replace />;
  }

  // Render based on current path
  const renderComponent = () => {
    switch (currentPath) {
      case 'mission':
        return <QuickSetup />;
      case 'pitch':
        return <Navigate to="/home" replace />;
      default:
        return <Navigate to="/onboarding/mission" replace />;
    }
  };

  return renderComponent();
};

export default Onboarding;
