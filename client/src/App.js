import {Paper, TextField, Checkbox, Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import {addTask, deleteTask, getTasks, updateTask} from './http/index'
import './App.css'


function App() {
    const [taskText, setTasksText] = useState('')
    const [tasks, setTasks] = useState([])
    const [isUpdating, setIsUpdating] = useState('')
    const [updateTaskText, setUpdateTaskText] = useState('')

    const newTask = async (e) => {
        e.preventDefault()
        try {
            const response = await addTask({task: taskText})
            setTasks(prev => [...prev, response.data])
            setTasksText('')
        } catch (e) {
            console.log(e.message)
        }
    }

    const removeTask = async (id) => {
        try {
            await deleteTask(id)
            const newListTasks = tasks.filter(task => task._id !== id)
            setTasks(newListTasks)
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await getTasks()
                setTasks(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, []);

    const changeTask = async (e) => {
        e.preventDefault()
        try {
            await updateTask(isUpdating, {task: updateTaskText})
            const updateTaskIndex = tasks.findIndex(task => task._id === isUpdating)
            const updatedTask = tasks[updateTaskIndex].task = updateTaskText
            setUpdateTaskText('')
            setIsUpdating('')
        } catch (e) {
            console.log(e)
        }
    }

    const renderUpdatingForm = () => (
        <form className='form' onSubmit={e => changeTask(e)}>
            <input className='input' type='text' placeholder='New Task'
                   onChange={e => setUpdateTaskText(e.target.value)} value={updateTaskText}></input>
            <Button color="inherit" type='submit'>Update</Button>
        </form>
    )

    return (
        <div className="App flex">
            <Paper elevation={3} className="container">
                <div className="heading">TO-DO</div>
                <form
                    className="flex"
                    style={{margin: "15px 0"}}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{width: "80%"}}
                        value={taskText}
                        required={true}
                        onChange={e => setTasksText(e.target.value)}
                        placeholder="Add New TO-DO"
                    />
                    <Button
                        style={{height: "40px", marginLeft: '15px'}}
                        color="primary"
                        variant="outlined"
                        type="submit"
                        onClick={newTask}
                    >
                        Add task
                    </Button>
                </form>
                <div>
                    {tasks.map((task) => (
                        <Paper
                            key={task._id}
                            className="flex task_container"
                        >

                            {isUpdating === task._id
                                ? renderUpdatingForm()
                                : (
                                    <div className='content'>
                                        <div>
                                            <Checkbox
                                                checked={task.completed}
                                                color="primary"/>
                                            {task.task}
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => setIsUpdating(task._id)}
                                                color="primary">
                                                update
                                            </Button>
                                            <Button
                                                onClick={() => removeTask(task._id)}
                                                color="secondary">
                                                delete
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }

                        </Paper>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default App;
