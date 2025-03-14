import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export const App = () => {
  const task1: Task[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JavaScript', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'NextJS', isDone: false},
    {id: 6, title: 'TypeScript', isDone: false},
  ]

  const task2: Task[] = [

  ]

  return (
      <div className="app">
       <TodoListItem title='What to learn' tasks={task1} date='14.03.2025'/>
       <TodoListItem title='Song' tasks={task2}/>
      </div>
  )
}