import React from 'react';

const NoteList = ({ data, onRead, onEdit, onDelete, isConnected = true }) => {
  // Fake data to display when backend isn't connected
  const fakeData = [
    {
      id: 1,
      title: "Sample Note 1",
      description: "This is a sample note description when backend is offline."
    },
    {
      id: 2,
      title: "Sample Note 2",
      description: "Another example note showing UI works without backend."
    }
  ];

  // Determine which data to use
  const displayData = isConnected ? data : fakeData;
  const isDataEmpty = displayData.length === 0;

  return (
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
            {!isDataEmpty ? (
              displayData.map((note, index) => (
                <tr key={note.id} className="table-row">
                  <td>{index + 1}</td>
                  <td>{note.title}</td>
                  <td className="task-cell">{note.description}</td>
                  <td className="action-cell">
                    <button className='read-btn' onClick={() => onRead(note.id)}>
                      Read
                    </button>
                    <button className="edit-btn" onClick={() => onEdit(note)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(note.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-message">
                  <div className="empty-content">
                    <svg className="empty-icon" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p>No notes found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!isConnected && (
          <div className="connection-warning">
            <span className="warning-icon">⚠️</span>
            Currently showing demo data (backend not connected)
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;