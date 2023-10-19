import React, { useState, useEffect } from 'react'
import '../Tasks.css';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../features/Tasks';
import { createTask } from '../Constants/URL';
import { useNavigate, useParams  } from 'react-router-dom';
import { listTask, getAllTasks, filterTask, deleteTaskList, editTask, getSelectedTask } from '../features/Tasks';
import { fetchTask, deleteTask, updateTask } from '../Constants/URL';

const UpdateTask = () => {
  // console.log("the task is " + JSON.stringify(data, null, 2));
  const {id} = useParams();
  const task = useSelector(getAllTasks);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("the new tasl is " + getAllTasks)
  
  const selectedTask = useSelector((state) => getSelectedTask(state, id)); 
  const [tname, setTName] = useState(selectedTask ? selectedTask.tname : '');
  const [tdescription, setTDescription] =  useState(selectedTask ? selectedTask.tdescription : '');
  const [options, setOptions] = useState([
    { value: 'All', label: 'All' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ]);
  const [selectedOption, setSelectedOption] = useState(selectedTask ? selectedTask.tstatus : '');
  

 
  useEffect(() => {
  }, [selectedTask]);
  
  const gotoList = () => {
    navigate('/list')
}


// handle edit function 

const handleEditTask = async () => {
  try {
    const updatedData = {
      tname: tname,
      tdescription: tdescription,
      tstatus: selectedOption,
    };
   await  updateTask(id, updatedData);
    dispatch(editTask(updatedData))
    console.log(updatedData)
  } catch (err) {
    console.error('Error fetching data:', err)
  }
 
};


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

             <div className="sttatusDiv">
        

          <label htmlFor="status" className='lblStatus'>Status</label>
          <select id="status" className="stattusFilter" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

        </div>

        
        <div className='btnDiv'>
          <div><button type="submit" className='btnSave' onClick={() =>{handleEditTask(); gotoList()}}>Update</button></div>
        <div><button className='btnCancel' onClick={gotoList}>Cancel</button></div>
        
        </div>
        

        </div>

    </div>
  )
}

export default UpdateTask