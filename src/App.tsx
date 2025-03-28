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

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TaskState = {
    [key: string]: Task[]
}

export const App = () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to do', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'NextJS', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false}
        ]
    })


    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !==taskId)} );
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter} : todolist))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="app">
            {todolists.map(mapToDo => {
                const todolistTasks = tasks[mapToDo.id]
                let filteredTasks = todolistTasks
                if (mapToDo.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (mapToDo.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }
                return (
                    <TodoListItem key={mapToDo.id}
                                  todolist={mapToDo}
                                  tasks={filteredTasks}
                                  deleteTodolist={deleteTodolist}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  createTask={createTask}
                                  date='14.03.2025'/>
                )
            })}
        </div>
    )
}