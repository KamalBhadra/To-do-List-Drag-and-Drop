import React, { useState } from 'react';

export default function Main() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editedTaskText, setEditedTaskText] = useState('');
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const isUpdating = editedTaskIndex !== null;

    // funcion for adding and updating tasks from created task's division.
    const addOrUpdateTask = () => {
        if (isUpdating) {
            if (taskInput.trim() !== '') {
                const updatedTasks = [...tasks];
                updatedTasks[editedTaskIndex] = taskInput;
                setTasks(updatedTasks);
                setTaskInput('');
                setEditedTaskText('');
                setEditedTaskIndex(null);
            } else {
                setErrorMessage('Please enter a task before updating.');
            }
        } else if (taskInput.trim() !== '') {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
            setErrorMessage('');
            
        } else {
            setErrorMessage('Please enter a task before adding.');
        }
    };

    const handleInputKeyUp = (e) => {
        if (e.key === 'Enter') {
            addOrUpdateTask();
        }
    }
        //edit task by clicking edit svg
        const editTask = (index) => {
            setEditedTaskText(tasks[index]);
            setEditedTaskIndex(index);
            setTaskInput(tasks[index]);
        };

        //function for delete task by clicking delete svg from read-task division.
        const deleteTask = (index) => {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        };

        // delete task by clicking delete svg from completed-task division
        const deleteCompletedTask = (index) => {
            const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
            setCompletedTasks(updatedCompletedTasks);
        };

        //funcionality to drag and drop task from read task to completed task and vice-versa.
        const handleDragStart = (e, index) => {
            e.dataTransfer.setData('text/plain', index.toString());
        };

        const handleDragOver = (e) => {
            e.preventDefault();
        };
        // function for drag and drop to completed-task div from read-task
        const handleDropToCompleted = (e) => {
            e.preventDefault();
            const index = parseInt(e.dataTransfer.getData('text/plain'));
            if (!isNaN(index) && index >= 0 && index < tasks.length) {
                const completedTask = tasks[index];
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
                setCompletedTasks([...completedTasks, completedTask]);
            }
        };
        //function for drag and drop again to read-task division from completed task division.
        const handleDropToReadTasks = (e) => {
            e.preventDefault();
            const index = parseInt(e.dataTransfer.getData('text/plain'));
            if (!isNaN(index) && index >= 0 && index < completedTasks.length) {
                const taskToUndo = completedTasks[index];
                const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
                setCompletedTasks(updatedCompletedTasks);
                setTasks([...tasks, taskToUndo]);
            }
        };

        return (
            <div className="main">
                {/* create tak division for adding task*/}
                <div className="create-task">
                    <h1>Todos</h1>
                    <input
                        className="create-task-input"
                        placeholder="Add a task here..."
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                    {errorMessage && <span>{errorMessage}</span>}
                    <button onClick={addOrUpdateTask} className="create-task-button">
                        {isUpdating ? 'Update' : 'Add Task'}
                    </button>
                    
                </div>
                <div className="read-complete-task">
                    {/* added task will be displayed here*/}
                    {/* drag and drop functionality implemented here*/}
                    <div className="read-task" onDragOver={handleDragOver} onDrop={handleDropToReadTasks}>
                        <h2>My Tasks</h2>
                        {tasks.map((task, index) => (
                            <div
                                className="added-task"
                                key={index}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, index)}
                            >
                                <span>{task}</span>
                                <div className='svg-update-delete-container'>
                                    <svg
                                        onClick={() => editTask(index)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="svg-icon"
                                        viewBox="0 0 16 16"
                                    >
                                        {/* update or edit task icon */}
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                    </svg>
                                    <svg
                                        onClick={() => deleteTask(index)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="svg-icon"
                                        viewBox="0 0 16 16"
                                    >
                                        {/* Delete icon svg fro removing task */}
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                                        />
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1h3.5a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* division for task  dragged and dropped here which are added in read-task division */}
                    {/* division for tasks dragged and dropped again back to the read-task division*/}
                    <div className="completed-task" onDragOver={handleDragOver} onDrop={handleDropToCompleted}>
                        <h2>Completed Task</h2>
                        {completedTasks.map((completedTask, index) => (
                            <div
                                className="completed-task-item"
                                key={index}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, index)}
                            >
                                <span>{completedTask}</span>
                                <svg
                                    onClick={() => deleteCompletedTask(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="white"
                                    className="svg-icon"
                                    viewBox="0 0 16 16"
                                >
                                    {/* Delete svg for removing completed task from the completed-task division */}
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                                    />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1h3.5a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        );
    }
