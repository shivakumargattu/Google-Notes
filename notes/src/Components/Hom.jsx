import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loading from './Loading';
import Error from './Error';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NoteView from "./NoteView"


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [viewNote, setViewNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/");
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentNote(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleRead = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/${id}`);
      setViewNote(response.data);
    } catch (err) {
      console.error("Error fetching note:", err);
      setError("Failed to fetch note details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      if (isEditing) {
        await axios.put(`http://localhost:5000/${currentNote.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/", formData);
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1>Make It a Notes</h1>
          <button className='createNote' onClick={handleCreate}>Add Note +</button>
        </div>

        <NoteList 
          data={data} 
          onRead={handleRead} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />

        {showForm && (
          <NoteForm
            initialData={currentNote || {}}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
            isEditing={isEditing}
          />
        )}

        {viewNote && (
          <NoteView
            note={viewNote}
            onClose={() => setViewNote(null)}
            onEdit={(note) => {
              setViewNote(null);
              handleEdit(note);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;