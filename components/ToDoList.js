import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/todos').then((res) => {
      setTodos(res.data);
    });
  }, []);

  const addTodo = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:4000/todos', { task: newTask }).then((res) => {
        setTodos([...todos, res.data]);
        setNewTask('');
      });
    }
  };

  const toggleComplete = (id) => {
    axios.patch(`http://localhost:4000/todos/${id}`).then((res) => {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? res.data : todo
      );
      setTodos(updatedTodos);
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTodo}>Add Task</button>
      <div>
        {todos.map((todo) => (
          <ToDoItem
            key={todo._id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
