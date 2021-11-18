import { FunctionComponent, useState } from "react";
import { Todo } from "./components/Todo";
import { Form } from "./components/Form";
import { FilterButton } from "./components/FilterButton";
import { TodoItem } from "./data/entities"
import { nanoid } from "nanoid";

interface Props {
    tasks: TodoItem[];
}

type filterOptions = {
    [key: string]: any
}

export const App: FunctionComponent<Props> = (props) => {

    const [tasks, setTasks] = useState<TodoItem[]>(props.tasks);
    const [filter, setFilter] = useState<string>("All");

    const filterMap: filterOptions = {
        All: () => true,
        Active: (task: TodoItem) => !task.completed,
        Completed: (task: TodoItem) => task.completed
    };
    const FILTER_NAMES = Object.keys(filterMap);

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    let addTask = (name: string) => {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    };

    let toggleTaskCompleted = (id: string) => {
        const updatedTasks: TodoItem[] = tasks.map(task => {
            if (id === task.id) {
                return { ...task, completed: !task.completed }
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    let editTask = (id: string, newName: string) => {
        const editedTaskList: TodoItem[] = tasks.map(task => {
            if (id === task.id) {
                return { ...task, name: newName }
            }
            return task;
        });
        setTasks(editedTaskList);
    };

    let deleteTask = (id: string) => {
        const remainingTasks: TodoItem[] = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    };

    const taskList = tasks
        .filter(filterMap[filter])
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {headingText}
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
