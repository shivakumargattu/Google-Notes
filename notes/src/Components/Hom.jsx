import React, { useEffect, useState } from 'react';
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1>Student Tasks</h1>
         <button className='crateNote'>Add Note +</button>
        </div>

        <div className="table-container">
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Note Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                
                    <tr  className="table-row">
                      <td>dhsghd</td>
                      <td>edejdhdhdh</td>
                      <td className="task-cell">ddc,hcea</td>
                      <td className="action-cell">
                        <button className='read-btn'>Read</button>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                    
                  <tr>
                    <td colSpan="4" className="empty-message">
                      <div className="empty-content">
                        <svg className="empty-icon" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p>No student tasks found</p>
                      </div>
                    </td>
                  </tr>
              
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;