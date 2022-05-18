import React, {useEffect, useState} from 'react';
import {addTask, deleteTask, getTasks, updateTask} from "../../http/index";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');




    return (
        <div>

        </div>
    );
};

export default Task;
