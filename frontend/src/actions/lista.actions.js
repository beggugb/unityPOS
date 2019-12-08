import { listaService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const listaActions = {
    loadInitialDataSocket,
    addNewItemSocket,
    markItemCompleteSocket,
    completeItem,
    AddItem

  
};

function loadInitialDataSocket(socket){
  return dispatch => {
  
      socket.on('initialList',(res)=>{

        dispatch(initialItems(res))
    })    
  }
}

function addNewItemSocket(socket,id,item){
    return dispatch => {
       
        let postData = ''
        socket.emit('addItem',postData)     
    }   
}

function markItemCompleteSocket(socket,id,completedFlag){
    return dispatch => {
        let postData = {
                id:id,
                completed:completedFlag
             }
        socket.emit('markItem',postData)
    }   
}

export function listasReset(){
    return{        
        type: 'TASK_RESET'
    }
}

function AddItem(res){
  return dispatch => {           
    dispatch(AddItems(res))     
  }
}

function completeItem(res){
  return dispatch => {           
    dispatch(completeItems(res))     
  }
}

export function AddItems(data){
    return{  
    type: "ADD_ITEM",
    item: data.item,
    itemId:data.id,
    completed:data.completed
}}

export function completeItems(data){
    return{  
    type: "COMPLETED_ITEM",
    itemId: data.id,
    completed:data.completed
}}

export function initialItems(res){
    return{  
    type: "INITIAL_ITEMS",
    items: res }
}