import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', contact: '', problem: ''
  });
  const [dataList, setDataList] = useState([]);
  const [showData, setShowData] = useState(false); // 👈 toggle state

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(res => setDataList(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleAdd = () => {
    const { name, age, gender, contact, problem } = formData;
    if (!name || !age || !gender || !contact || !problem) return;

    axios.post('http://localhost:5000/api/data', formData)
      .then(res => {
        setDataList([...dataList, res.data]);
        setFormData({ name: '', age: '', gender: '', contact: '', problem: '' });
      })
      .catch(err => console.error('Add error:', err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hospital Patient Detail Form</h1>

      <div style={styles.inputGroup}>
        <input
          type="text" placeholder="Patient Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.input}
        />
        <input
          type="number" placeholder="Age" value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={styles.input}
        />
        <input
          type="text" placeholder="Gender" value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={styles.input}
        />
        <input
          type="text" placeholder="Contact Number" value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })} style={styles.input}
        />
        <input
          type="text" placeholder="Problem Description" value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })} style={styles.input}
        />

        <button onClick={handleAdd} style={styles.button}>Add Patient</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <button onClick={() => setShowData(!showData)} style={styles.toggleButton}>
          {showData ? "Hide Patient Records" : "Show Patient Records"}
        </button>

        {showData && (
          <>
            <h2 style={styles.subheading}>Patient Records</h2>
            {dataList.length === 0 ? (
              <p style={{ color: '#888' }}>No patients added yet.</p>
            ) : (
              <ul style={styles.list}>
                {dataList.map((item, i) => (
                  <li key={i} style={styles.listItem}>
                    | Age: {item.age} | Gender: {item.gender} | Contact: {item.contact} | Issue: {item.problem}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 750,
    margin: '40px auto',
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#fefefe',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    marginBottom: 20,
    color: '#222',
  },
  subheading: {
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    padding: '10px 15px',
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 10,
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  toggleButton: {
    marginBottom: 10,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: 10,
  },
  listItem: {
    padding: '8px 0',
    fontSize: 16,
    borderBottom: '1px solid #eee',
  },
};

export default App;
