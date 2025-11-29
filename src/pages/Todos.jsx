// src/pages/Todos.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../features/todos/todosSlice';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';

export default function Todos() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.todos);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTodos());
  }, [dispatch, status]);

  const handleAdd = (title) => {
    const newTodo = { title, completed: false, userId: 1 };
    dispatch(addTodo(newTodo));
  };

  const handleToggle = (todo) => {
    dispatch(updateTodo({ id: todo.id, changes: { completed: !todo.completed, title: todo.title } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <Header />
      <div id="form">
        <AddTodoForm onAdd={handleAdd} />
      </div>

      <div id="myUnOrdList">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        <TodoList todos={items} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
}
