import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>
([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JavaScript', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'NextJS', isDone: false},
    {id: 6, title: 'TypeScript', isDone: false}
])


const deleteTask = (taskId: number) => {
    const filteredTasks = tasks.filter(task => {
        return task.id !== taskId
    })
    setTasks(filteredTasks);
}

return (
    <div className="app">
        <TodoListItem title='What to learn'
                      tasks={tasks}
                      deleteTask={deleteTask}
                      date='14.03.2025'/>
    </div>
)
}