import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_URL} from '../Constants/URL';
import axios from 'axios';
import React, { useEffect, useState } from 'react'





const initialState = {
    task: {},
    // filter:'all',
}
 const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{
       addTask:(state,action) =>{
        state.task = action.payload
       },

        // listTask:(state,action) => {
        //     state.task = action.payload
        // },
        listTask: (state, action) => {
            state.task = { ...state.task, data: action.payload.data };
          },

        deleteTaskList: (state, action) => {
            const id = action.payload
            state.task = state.task.filter((task) => task.id !== id)
        },

        editTask: (state, action) => {
            state.selectedTask = action.payload;
          }
    },
},


)

export default taskSlice.reducer;
export const getAllTasks = (state) => state.task.task;
export const getSelectedTask = (state) => state.task.selectedTask;
export const {addTask, listTask, setFilter, deleteTaskList, editTask} = taskSlice.actions;