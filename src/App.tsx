import './App.css';
import React from 'react';
import { useState, useEffect} from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const getTasks = () => {
  const showTasks = sessionStorage.getItem("showTasks");
  return showTasks  ? JSON.parse(showTasks) : []
}

const getCount = () => {
  const showCount = sessionStorage.getItem("showCount");
  return showCount  ? JSON.parse(showCount) : 0
}

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState<TodoItem[]>(getTasks);
  const [countTask, setCountTask] = useState(getCount);
  const [showAllTasks, setShowAllTasks] = useState(true);
  const [showActive, setShowActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [listCompleted, setListCompleted] = useState<TodoItem[]>(list);
  const [listUncompleted, setListUncompleted] = useState<TodoItem[]>(list);

  useEffect(() => {
    document.title = 'todos';
  }, []);
  
  useEffect(() => {
    sessionStorage.setItem('showTasks', JSON.stringify(list));
  }, [list]); 

  useEffect(() => {
    sessionStorage.setItem('showCount', JSON.stringify(countTask));
  }, [countTask])

  useEffect(() => {
    const updatedList = list.filter((task) => task.completed);
    setListCompleted(updatedList);
  }, [list])

  useEffect(() => {
    const updatedList = list.filter((task) => !task.completed);
    setListUncompleted(updatedList);
  }, [list])

  const addTask= () => {
    if (task !== '') {
      const newId = JSON.stringify(Math.floor(Math.random() * (9999 - 1 + 1) + 1))
      const newTodoItem: TodoItem = {
        id: newId,
        text: task,
        completed: false,
      };
      setList([...list, newTodoItem]);
      setTask(' ');
      setCountTask(countTask + 1)
    }
  };

  let tasksLeft: number = list.length

  const removeTodo = () => {
    const updatedList = list.filter((task) => !task.completed);
    setList(updatedList);
    setCountTask(updatedList.length)
  };

  const toggleComplete = (id: string) => {
    const updatedList = list.map((task) => {
      if (task.id === id) {
        !task.completed ? setCountTask(countTask - 1) : setCountTask(countTask + 1)
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setList(updatedList);
  };

  const sortAll = ():void =>{
    setShowActive(false);
    setShowAllTasks(true);
    setShowCompleted(false)
  }

  const sortActive = ():void =>{
    setShowActive(true);
    setShowAllTasks(false);
    setShowCompleted(false)
  }

  const sortCompleted = ():void =>{
    setShowActive(false);
    setShowAllTasks(false);
    setShowCompleted(true)
  }

  return (
    <div className="wrapper">
      <div className = 'w'>
      <h1 id = "header">todos</h1>
      </div>
      <div className = "list">
        <input
        id = "result"
        type ="text"
        value = {task}
        placeholder='What needs to be done?'
        onChange = {(event) =>{
          setTask(event.target.value)
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && addTask();
        }} 
        />
        {showAllTasks && (   
          <div> 
          {list.map((todo) => (
             <p key={todo.id}>
               <input
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => toggleComplete(todo.id)}
               />
               <span id = "tasks" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                 {todo.text}
               </span>
             </p>
           ))}
         </div>
        )}
        {showActive && (   
          <div> 
          {listUncompleted.map((todo) => (
             <p key={todo.id}>
               <input
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => toggleComplete(todo.id)}
               />
               <span id = "tasks" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                 {todo.text}
               </span>
             </p>
           ))}
         </div>
        )}
        {showCompleted && (   
          <div> 
          {listCompleted.map((todo) => (
             <p key={todo.id}>
               <input
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => toggleComplete(todo.id)}
               />
               <span id = "tasks" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                 {todo.text}
               </span>
             </p>
           ))}
         </div>
        )}
         <div>
          <span>{countTask} items left</span>
          <button onClick={() => sortAll()}>All</button>
          <button onClick={() => sortActive()}>Active</button>
          <button onClick={() => sortCompleted()}>Completed</button>
          <button className='clear' onClick={() => removeTodo()}>Clear completed</button>
         </div>
      </div>
    </div>
  );
}

export default App;
