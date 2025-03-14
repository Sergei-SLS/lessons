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
  ]

  const task2: Task[] = [
    {id: 1, title: 'Hello!', isDone: true},
    {id: 2, title: 'I am happy!', isDone: false},
    {id: 3, title: 'Yo!', isDone: false},
  ]

  return (
      <div className="app">
       <TodoListItem title='What to learn' tasks={task1}/>
       <TodoListItem title='Song' tasks={task2}/>
      </div>
  )
}