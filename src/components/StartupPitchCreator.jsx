import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartupPitchCreator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home', { replace: true });
  }, [navigate]);

  return null;
};

export default StartupPitchCreator;
