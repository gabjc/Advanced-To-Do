import React from 'react';
import './TopNavBar.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

const TopNavBar = ({userName}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    navigate('/create');
  };
  return (
    <div className="top-nav-bar">

      <div className="user-name">User123</div>
      <div className="buttons-container">
        <div className="home-button" onClick={handleHomeClick}> Home </div>
        <div className="create-button" onClick={handleCreateClick}> Create </div>
      </div>
    </div>
  );
}

export default TopNavBar;
