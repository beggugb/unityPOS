import { tipoService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const tipoActions = {
    tipoData,
    tipoCreate,
    tipoUpdate,
    tipoReset,    
    modalRegistro,
    changeTipo,
    changesTipo,
    tipoLista,
    tipoItem,
    tipoAsignar,
    tipoDelete: _tipoDelete
};


function tipoLista(name){
    return dispatch => {  
    dispatch(inicial());              
        tipoService.getLista(name)
        .then((response)=>{            
          dispatch(tiposLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function tipoData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        tipoService.getData(page,numPages)
        .then((response)=>{                
          dispatch(tiposData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function tipoCreate(tipo){
    return dispatch => {       
    dispatch(inicial());  
        tipoService.create(tipo)
        .then((response)=>{                      
            dispatch(tiposCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function tipoUpdate(tipo){
    return dispatch => {       
    dispatch(inicial());  
        tipoService.update(tipo)
        .then((response)=>{                         
            dispatch(tiposCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _tipoDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        tipoService.delete(id)
        .then((response)=>{             
            dispatch(tiposData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function tipoReset(){
    return dispatch => {       
    dispatch(tiposReset());      
    }
}

function modalRegistro(estado){
    return dispatch => {          
    dispatch(modalRegistros(estado));      
    }
}

function changeTipo(props, event){
    return dispatch =>{ dispatch(changsTipo(props, event.target.value)); }
}

function changesTipo(props, event){
    return dispatch =>{ dispatch(changsTipo(props, event)); }
}

function tipoItem(state,item){    
    return dispatch =>{ dispatch(tiposItemM(state, item)); }
}

function tipoAsignar(item){
    return dispatch =>{ dispatch(tiposItem(item)); }
}

export function tiposItem(item){
    return{
        type: "TIPO_ITEM",        
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

export function tiposItemM(state,item){
    return{
        type: "TIPO_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsTipo(props, value){
    return{
        type: "TIPO_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'TIPO_MODAL_REGISTRO',
        state:state
    }
}


export function tiposReset(){
    return{        
        type: 'TIPO_RESET'
    }
}

export function tiposData(response){
    return{        
        type: 'TIPO_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function tiposLista(response){
    return{        
        type: 'TIPO_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function tiposCreate(response){
    return{        
        type: 'TIPO_CREATE',     
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