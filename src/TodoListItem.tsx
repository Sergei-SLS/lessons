import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type titleType = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
}

export const TodoListItem = ({title, tasks, date, deleteTask }: titleType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                {tasks.length === 0 ? (
                    <p>Tasks is empty</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type='checkbox' checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}