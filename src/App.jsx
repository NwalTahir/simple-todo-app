import React, { useState, useEffect } from 'react';
export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });  
  const [input, setInput] = useState('');
  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 My Day Planner</h2>
        
        <form onSubmit={addTask} style={styles.form}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What to do today?..." 
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add</button>
        </form>
        <ul style={styles.list}>
          {tasks.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center' }}>All of your tasks are managed well! 😎</p>
          ) : (
            tasks.map(task => (
              <li key={task.id} style={styles.listItem}>
                <span 
                  onClick={() => toggleComplete(task.id)}
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#333'
                  }}
                >
                  {task.completed ? '✅ ' : '⏳ '} {task.text}
                </span>
                <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
const styles = {
  bodyWrapper: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: '20px'
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none'
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #eee'
  },
  taskText: {
    flex: 1,
    cursor: 'pointer',
    fontSize: '16px',
    userSelect: 'none'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  }
};