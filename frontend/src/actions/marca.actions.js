import { marcaService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const marcaActions = {
    marcaData,
    marcaCreate,
    marcaUpdate,
    marcaReset,    
    modalRegistro,
    changeMarca,
    changesMarca,
    marcaLista,
    marcaItem,
    marcaAsignar,
    marcaDelete: _marcaDelete
};


function marcaLista(name){
    return dispatch => {  
    dispatch(inicial());              
        marcaService.getLista(name)
        .then((response)=>{            
          dispatch(marcasLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function marcaData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        marcaService.getData(page,numPages)
        .then((response)=>{                
          dispatch(marcasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function marcaCreate(marca){
    return dispatch => {       
    dispatch(inicial());  
        marcaService.create(marca)
        .then((response)=>{                      
            dispatch(marcasCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function marcaUpdate(marca){
    return dispatch => {       
    dispatch(inicial());  
        marcaService.update(marca)
        .then((response)=>{                         
            dispatch(marcasCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _marcaDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        marcaService.delete(id)
        .then((response)=>{             
            dispatch(marcasData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function marcaReset(){
    return dispatch => {       
    dispatch(marcasReset());      
    }
}

function modalRegistro(estado){
    return dispatch => { 
       
    dispatch(modalRegistros(estado));      
    }
}

function changeMarca(props, event){
    return dispatch =>{ dispatch(changsMarca(props, event.target.value)); }
}

function changesMarca(props, event){
    return dispatch =>{ dispatch(changsMarca(props, event)); }
}

function marcaItem(state,item){
    return dispatch =>{ dispatch(marcasItemM(state, item)); }
}

function marcaAsignar(item){
    return dispatch =>{ dispatch(marcasItem(item)); }
}

export function marcasItem(item){
    return{
        type: "MARCA_ITEM",        
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

export function marcasItemM(state,item){
    return{
        type: "MARCA_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsMarca(props, value){
    return{
        type: "MARCA_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'MARCA_MODAL_REGISTRO',
        state:state
    }
}


export function marcasReset(){
    return{        
        type: 'MARCA_RESET'
    }
}

export function marcasData(response){
    return{        
        type: 'MARCA_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function marcasLista(response){
    return{        
        type: 'MARCA_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function marcasCreate(response){
    return{        
        type: 'MARCA_CREATE',     
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