// src/features/todos/todosAPI.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_APP_API_URL || 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  // users limited (used by Login.jsx)
  fetchUsers: (limit = 3) => api.get('/users', { params: { _limit: limit } }),

  // todos
  fetchTodos: (params = { _limit: 20 }) => api.get('/todos', { params }),
  fetchTodoById: (id) => api.get(`/todos/${id}`),
  createTodo: (data) => api.post('/todos', data),
  updateTodo: (id, data) => api.put(`/todos/${id}`, data),
  patchTodo: (id, data) => api.patch(`/todos/${id}`, data),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};
