import { taskService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const taskActions = {
    taskData,
    taskCreate,
    taskReset,
    taskUpdate,
    taskDelete: _taskDelete
};


function  taskData(user){
    return dispatch => {  
    dispatch(inicial());              
        taskService.getData(user)
        .then((response)=>{                
          dispatch(tasksData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function taskCreate(task){
    return dispatch => {       
    dispatch(inicial());  
        taskService.create(task)
        .then((response)=>{             
            dispatch(tasksData(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ 
        	dispatch(createNotification(alertActions.error(err))); 
        	 dispatch(final()); 
        })
    }
}

function taskUpdate(task){
    return dispatch => {       
    dispatch(inicial());  
        taskService.update(task)
        .then((response)=>{             
            dispatch(tasksData(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ 
            dispatch(createNotification(alertActions.error(err))); 
             dispatch(final()); 
        })
    }
}


function _taskDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        taskService.delete(id)
        .then((response)=>{             
            dispatch(tasksData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function taskReset(){
    return dispatch => {       
    dispatch(tasksReset());      
    }
}

export function tasksReset(){
    return{        
        type: 'TASK_RESET'
    }
}

export function tasksData(response){
    return{        
        type: 'TASK_DATA',
        data: response.data,        
        [ pendingTask ]: end                 
    }
}

export function inicial(){
    return{        
        type: 'INICIO',
        [ pendingTask ]: begin                 
    }
}

export function final(){
    return{        
        type: 'FINAL',
        [ pendingTask ]: end                 
    }
}