// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosAPI from './todosAPI';

// Fetch list
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const res = await todosAPI.fetchTodos({ _limit: 50 });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Add (POST)
export const addTodo = createAsyncThunk('todos/addTodo', async (todo, { rejectWithValue }) => {
  try {
    const res = await todosAPI.createTodo(todo);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Update (PUT)
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, changes }, { rejectWithValue }) => {
  try {
    const res = await todosAPI.patchTodo(id, changes);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Delete
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { rejectWithValue }) => {
  try {
    await todosAPI.deleteTodo(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // local-only reducer if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // JSONPlaceholder returns id but doesn't persist; still show in UI
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
