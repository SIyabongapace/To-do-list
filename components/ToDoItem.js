import React from 'react';

const ToDoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span>{todo.task}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem;
