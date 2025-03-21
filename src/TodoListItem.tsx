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
    filter: FilterValues
}

export const TodoListItem = ({title, tasks, date, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: titleType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
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

    return (
        <div>
            <h3>{title}</h3>
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
                                    deleteTask(task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
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
                        onClick={() => changeFilter('all')}
                />
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilter('active')}
                />
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilter('completed')}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}