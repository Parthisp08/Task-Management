import React, { useEffect, useState } from 'react';
import './list.css';
import { MdModeEditOutline } from 'react-icons/md';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiFillSave } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../Constants/URL';
import axios from 'axios';
import {
  listTask,
  getAllTasks,
  deleteTaskList,
  editTask,
} from '../features/Tasks';
import { fetchTask, deleteTask, updateTask } from '../Constants/URL';
import { useNavigate } from 'react-router-dom';

export const List = () => {
  // const [taskData, setTaskData] = useState([]);
  const taskData = useSelector(getAllTasks); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');


  const getApiTasks = async () => {
    try {
      const data = await fetchTask();
      dispatch(listTask(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getApiTasks();
  }, [dispatch]);

  
 //status filter 

 const fetchTasksByStatus = async (status) => {

  console.log("status is new " + status)
  try {
    let url = API_URL;
    if (status !== "All") {
      url += `?tstatus=${status}`;
      
    }

    const response = await axios.get(url);
    console.log("url is " + url)
    const resData = response.data;
    // const task = resData
    console.log(JSON.stringify(resData, null, 2));

    dispatch({
      type: 'task/listTask',
      payload: {
        data: resData,
        status: response.status, // HTTP status code
        message: response.statusText,
      }
    });

   
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




// const taskData = useSelector(getAllTasks);

const statusOnChange = (e) => {
  const newStatus = e.target.value;
  setSelectedStatus(newStatus);
  console.log(newStatus)
  fetchTasksByStatus(newStatus);
}

  useEffect(() => {
    console.log('taskData:', taskData);
  }, [taskData]);

// handle the delete function
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      dispatch(deleteTaskList(id));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleUpdateTask = (data) => {
    dispatch(editTask(data));
    navigate(`/update/${data.id}`, data);
  };

  const gotoNewTask = () => {
    navigate('/add');
  };

  return (
    <div className="listContainer">
      <div className="headerTaskList">
        <div className="add">
          <span className="addNewTask" onClick={gotoNewTask}>
            Add List <IoIosAddCircleOutline className="addIcon" />
          </span>
        </div>
        <div className="statusFilter">
          Filter:
          <select
            className="status"
            value={selectedStatus}
            onChange={statusOnChange}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(taskData.data) && taskData.data.length > 0 ? (
            taskData.data.map((data, index) => (
              <tr key={index}>
                <td>{data.tname}</td>
                <td>{data.tdescription}</td>
                <td>{data.tstatus}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => handleUpdateTask(data)}
                    />
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDelete(data.id)}
                    />
                    <AiFillSave className="save-btn" />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
