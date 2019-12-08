import { messageService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const messageActions = {
    messageData,
    messageCreate,
    messageReset,    
    modalRegistro,
    messageDelete: _messageDelete
};


function  messageData(page,user,tipo){
    return dispatch => {  
    dispatch(inicial());              
        messageService.getData(page,user,tipo)
        .then((response)=>{                                   
          dispatch(messagesData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function messageCreate(message){
    return dispatch => {       
    dispatch(inicial());  
        messageService.create(message)
        .then((response)=>{             
            dispatch(messagesCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _messageDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        messageService.delete(id)
        .then((response)=>{             
            dispatch(messagesData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function messageReset(){
    return dispatch => {       
    dispatch(messagesReset());      
    }
}

function modalRegistro(estado){
    return dispatch => {       
    dispatch(modalRegistros(estado));      
    }
}

export function modalRegistros(estado){
    return{        
        type: 'MESSAGE_MODAL_REGISTRO',
        estado:estado
    }
}


export function messagesReset(){
    return{        
        type: 'MESSAGE_RESET'
    }
}

export function messagesData(response){
    return{        
        type: 'MESSAGE_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function messagesCreate(){
    return{        
        type: 'MESSAGE_CREATE',        
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