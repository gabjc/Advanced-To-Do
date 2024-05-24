import React from 'react';
import './TopNavBar.css'; // Import your CSS file for styling

const TopNavBar = ({userName}) => {
  return (
    <div className="top-nav-bar">

      <div className="user-name">User123</div>
      <div className="buttons-container">
        <div className="home-button"> Home </div>
        <div className="create-button"> Create </div>
      </div>
    </div>
  );
}

export default TopNavBar;
