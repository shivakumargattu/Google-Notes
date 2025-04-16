import React from 'react';


const Error = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Error;