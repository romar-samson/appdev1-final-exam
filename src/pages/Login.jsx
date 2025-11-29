// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import todosAPI from '../features/todos/todosAPI';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    todosAPI.fetchUsers(3).then(res => setUsers(res.data)).catch(err => {
      console.error(err);
      setError('Failed to load users');
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const secret = import.meta.env.VITE_APP_SECRET_PASSWORD;
    if (password !== secret) {
      setError('Invalid password');
      return;
    }
    if (!selectedUserId) {
      setError('Select a user');
      return;
    }
    navigate('/todos', { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">-- Select user --</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
