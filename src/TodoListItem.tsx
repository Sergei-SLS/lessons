import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {KeyboardEvent, ChangeEvent, useState} from "react";

type titleType = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolist: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodoListItem = ({todolist: {id, title, filter}, tasks, date, deleteTask, changeFilter, createTask, changeTaskStatus, deleteTodolist}: titleType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(id,trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }
    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler} />
            </div>

            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <div>
                {tasks.length === 0 ? (
                    <p>Tasks is empty</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => {
                                    deleteTask(id, task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(id, task.id, newStatusValue)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
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
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}
                />
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}
                />
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}