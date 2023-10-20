import React, { useState } from 'react'
import '../Tasks.css';
import {useDispatch} from 'react-redux';
import {addTask} from '../features/Tasks';
import { createTask } from '../Constants/URL';
import { useNavigate } from 'react-router-dom'

const AddTask = () => {

  const [tname, setTName] = useState('');
  const [tdescription, setTDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoList = () => {
    navigate('/list')
}

  const handleAddTask = async () => {
   
    try {
      if(!tname || !tdescription) {
        console.log("Name and description are required!");
        return
      }

      const data = {
        tname,
        tdescription,
        tstatus:"Pending",
      };
     const newTask = await createTask(data);
      dispatch(addTask(newTask));
      setTName('');
      setTDescription('');
      console.log(data)
    
     

    }

    catch (error) {
      console.error('Error creating a new task:', error);
    }

  }
  return (
    <div className='container'>
        
        <div className="wrapper">
            
        <h2 className='header'>Task Management</h2>
        <div className="tasknameDiv">
        <label htmlFor="taskName" className='lblTaskName'>Task Name</label>
        <input type='text'  value={tname}  onChange={(event) => setTName(event.target.value)} id='taskName' name='taskName' className='taskInput' placeholder='Enter your Task Name' maxLength="50"/>
        </div>

        <div className="taskdescDiv">
        <label htmlFor="taskDesc" className='lblTaskDesc'>Task Description</label>
        <textarea id='taskDesc' value={tdescription}  onChange={(event) => setTDescription(event.target.value)}  name='taskDesc' className='taskDescription' placeholder='Enter your Task Description' maxLength="100"/>
        </div>
        
        <button type="submit" className='btnSaveTasks' onClick={() =>{handleAddTask(); gotoList()}}>Save</button>

        </div>

    </div>
  )
}

export default AddTask