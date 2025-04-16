import React from 'react';

const NoteView = ({ note, onClose, onEdit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{note.title}</h2>
        <div className="note-content">
          <p>{note.description}</p>
        </div>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="edit-btn">
            Edit
          </button>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteView;