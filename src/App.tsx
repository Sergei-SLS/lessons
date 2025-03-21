import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed';

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>
    ([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'NextJS', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false}
    ])

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValues>('all')
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
        setTasks(newState)
    }

    return (
        <div className="app">
            <TodoListItem title='What to learn'
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          changeTaskStatus={changeTaskStatus}
                          createTask={createTask}
                          filter={filter}
                          date='14.03.2025'/>
        </div>
    )
}