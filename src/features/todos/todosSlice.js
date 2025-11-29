// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosAPI from './todosAPI';

// thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await todosAPI.fetchTodos({ _limit: 20 });
  return res.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const res = await todosAPI.createTodo(todo);
  return res.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, changes }) => {
  const res = await todosAPI.putTodo
    ? await todosAPI.putTodo(id, changes)
    : await todosAPI.updateTodo(id, changes);
  return res.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await todosAPI.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // local optimistic updates if needed
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // updateTodo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
