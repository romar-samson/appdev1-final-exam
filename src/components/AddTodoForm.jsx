// src/components/AddTodoForm.jsx
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const { theme } = useTheme();

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      alert('You must write something!');
      return;
    }
    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={submit}>
      <input
        className={`${theme}-input`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task."
      />
      <button className={`${theme}-button todo-btn`} type="submit">I Got This!</button>
    </form>
  );
}
