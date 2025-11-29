// src/components/TodoItem.jsx
import React from 'react';
import { useTheme } from '../ThemeProvider';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const { theme } = useTheme();
  const todoClass = `todo ${theme}-todo` + (todo.completed ? ' completed' : '');
  return (
    <li className={todoClass} style={{ display: 'flex', alignItems: 'center' }}>
      <div className="todo-item" style={{ flex: 1 }}>{todo.title} <small style={{ color: '#666' }}>#{todo.id}</small></div>
      <button className={`check-btn ${theme}-button`} onClick={() => onToggle(todo)} aria-label="toggle">
        <i className="fas fa-check"></i>
      </button>
      <button className={`delete-btn ${theme}-button`} onClick={() => onDelete(todo.id)} aria-label="delete">
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
}
