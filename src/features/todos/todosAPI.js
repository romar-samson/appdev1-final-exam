import axios from 'axios';

const API_BASE = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  fetchTodos: (params) => api.get('/todos', { params }),
  fetchTodoById: (id) => api.get(`/todos/${id}`),
  createTodo: (data) => api.post('/todos', data),
  updateTodo: (id, data) => api.put(`/todos/${id}`, data),
  patchTodo: (id, data) => api.patch(`/todos/${id}`, data),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
  fetchUsers: (limit = 3) => api.get('/users', { params: { _limit: limit } }),
};
