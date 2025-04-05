import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import { ChangeEvent } from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type titleType = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolist: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodoListItem = ({todolist: {id, title, filter},
                                 tasks,
                                 date,
                                 createTask,
                                 deleteTask,
                                 changeFilter,
                                 changeTaskTitle,
                                 changeTaskStatus,
                                 deleteTodolist}: titleType) => {
    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler} />
            </div>

            <CreateItemForm onCreateItem={createTaskHandler} />

            <div>
                {tasks.length === 0 ? (
                    <p>Tasks is empty</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => {
                                    deleteTask(id, task.id)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
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
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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