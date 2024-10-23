import React, { useState, useEffect } from 'react';
import './App.css';
import background from './background.webp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const notify = (task) => {
    toast(`Reminder: ${task}`, { position: 'bottom-right' });
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      notify(newTask);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={`App ${theme}`} style={{ backgroundImage: `url(${background})`, minHeight: '100vh', backgroundSize: 'cover', display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: '1', padding: '20px', textAlign: 'center' }}>
        <header>
          <h1 style={{ margin: '20px 0' }}>Good Afternoon.</h1>
          <h2 style={{ margin: '10px 0' }}>What's your plan for today?</h2>
        </header>

        <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        <div className="task-input" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add Todo"
            style={{ padding: '8px', width: '300px', marginRight: '10px' }}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <TransitionGroup component="ul" style={{ padding: '0', margin: '0', listStyleType: 'none' }}>
          {tasks.map((task, index) => (
            <CSSTransition key={index} timeout={300} classNames="slide">
              <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                    flex: '1'
                  }}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.text}
                </span>

                {!task.completed && (
                  <button onClick={() => toggleTaskCompletion(index)} style={{ marginLeft: "10px", backgroundColor: 'green', color: 'white' }}>
                    Finish
                  </button>
                )}

                <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px", backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>

        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>© 2024 My To-Do App. All rights reserved.</p>
          <p>Contact: <a href="mailto:bucks@gmail.com" style={{ color: 'black', textDecoration: 'underline' }}>bucks@gmail.com</a></p>
        </footer>
      </div>

      <div className="calendar-container" style={{ width: '300px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '10px' }}>Calendar</h3>
        <div style={{ marginBottom: '20px' }}>
          <Calendar
            onChange={setDate}
            value={date}
            style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setDate(new Date())} style={{ marginRight: '10px' }}>Today</button>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))} style={{ marginRight: '10px' }}>Next Month</button>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>Previous Month</button>
        </div>

        <h3 style={{ marginBottom: '10px', marginTop: '30px' }}>Project Settings</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li><button style={{ width: '100%', padding: '10px', margin: '5px 0' }}>Enable Notifications</button></li>
          <li><button style={{ width: '100%', padding: '10px', margin: '5px 0' }}>Clear Completed Tasks</button></li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
