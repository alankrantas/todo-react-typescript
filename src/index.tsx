import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TodoItem } from "./data/entities"
import { nanoid } from "nanoid";

const data: TodoItem[] = [
    { name: "Learn JavaScript", completed: true, id: "todo-" + nanoid() },
    { name: "Understand TypeScript", completed: false, id: "todo-" + nanoid() },
    { name: "Build website with React", completed: false, id: "todo-" + nanoid() }
];

ReactDOM.render(
    <React.StrictMode>
        <App tasks={data}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
