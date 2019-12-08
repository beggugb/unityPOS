import { clienteService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const clienteActions = {
    clienteData,
    clienteCreate,
    clienteUpdate,
    clienteReset,   
    clienteSearch, 
    modalRegistro,
    changeCliente,
    changesCliente,
    clienteLista,
    clienteItem,
    clienteAsignar,
    clienteDelete: _clienteDelete
};


function clienteLista(name){
    return dispatch => {  
    dispatch(inicial());              
        clienteService.getLista(name)
        .then((response)=>{            
          dispatch(clientesLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function clienteData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        clienteService.getData(page,numPages)
        .then((response)=>{                
          dispatch(clientesData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function clienteCreate(cliente){
    return dispatch => {       
    dispatch(inicial());  
        clienteService.create(cliente)
        .then((response)=>{                      
            dispatch(clientesCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function clienteUpdate(cliente){
    return dispatch => {       
    dispatch(inicial());  
        clienteService.update(cliente)
        .then((response)=>{                         
            dispatch(clientesCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _clienteDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        clienteService.delete(id)
        .then((response)=>{             
            dispatch(clientesData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function clienteReset(){
    return dispatch => {       
    dispatch(clientesReset());      
    }
}

function modalRegistro(estado){
    return dispatch => { 
      
    dispatch(modalRegistros(estado));      
    }
}

function changeCliente(props, event){
    return dispatch =>{ dispatch(changsCliente(props, event.target.value)); }
}

function changesCliente(props, event){
    return dispatch =>{ dispatch(changsCliente(props, event)); }
}

function clienteItem(state,item){
    return dispatch =>{ dispatch(clientesItemM(state, item)); }
}

function clienteAsignar(item){
    return dispatch =>{ dispatch(clientesItem(item)); }
}

function clienteSearch(name){
    return dispatch => {  
    dispatch(inicial());              
        clienteService.getLista(name)
        .then((response)=>{           
          dispatch(clientesData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}


export function clientesItem(item){
    return{
        type: "CLIENTE_ITEM",        
        item: item
    }
}


//facultades
export function itemFacultades(item){
    return{
        type: "FACULTAD_ITEM",
        item: item.Faculty
    }
}

export function clientesItemM(state,item){
    return{
        type: "CLIENTE_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsCliente(props, value){
    return{
        type: "CLIENTE_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'CLIENTE_MODAL_REGISTRO',
        state:state
    }
}


export function clientesReset(){
    return{        
        type: 'CLIENTE_RESET'
    }
}

export function clientesData(response){
    return{        
        type: 'CLIENTE_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function clientesLista(response){
    return{        
        type: 'CLIENTE_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function clientesCreate(response){
    return{        
        type: 'CLIENTE_CREATE',     
        response: response,   
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