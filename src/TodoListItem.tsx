import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {KeyboardEvent, ChangeEvent, useState} from "react";

type titleType = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodoListItem = ({title, tasks, date, deleteTask, changeFilter, createTask, changeTaskStatus}: titleType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            <div>
                {tasks.length === 0 ? (
                    <p>Tasks is empty</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => {
                                deleteTask(task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
                            }

                            return (
                                <li key={task.id}>
                                    <input type='checkbox'
                                           checked={task.isDone}
                                           onChange={changeTaskStatusHandler}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={deleteTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}