import { categoriaService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const categoriaActions = {
    categoriaData,
    categoriaCreate,
    categoriaUpdate,
    categoriaReset,    
    categoriaSearch, 
    modalRegistro,
    changeCategoria,
    changesCategoria,
    categoriaLista,
    categoriaItem,
    categoriaAsignar,
    categoriaDelete: _categoriaDelete
};


function categoriaLista(name){
    return dispatch => {  
    dispatch(inicial());              
        categoriaService.getLista(name)
        .then((response)=>{            
          dispatch(categoriasLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function categoriaData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        categoriaService.getData(page,numPages)
        .then((response)=>{                
          dispatch(categoriasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function categoriaCreate(categoria){
    return dispatch => {       
    dispatch(inicial());  
        categoriaService.create(categoria)
        .then((response)=>{                      
            dispatch(categoriasCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function categoriaUpdate(categoria){
    return dispatch => {       
    dispatch(inicial());  
        categoriaService.update(categoria)
        .then((response)=>{                         
            dispatch(categoriasCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _categoriaDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        categoriaService.delete(id)
        .then((response)=>{             
            dispatch(categoriasData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function categoriaReset(){
    return dispatch => {       
    dispatch(categoriasReset());      
    }
}

function modalRegistro(estado){
    return dispatch => { 
       
    dispatch(modalRegistros(estado));      
    }
}

function changeCategoria(props, event){
    return dispatch =>{ dispatch(changsCategoria(props, event.target.value)); }
}

function changesCategoria(props, event){
    return dispatch =>{ dispatch(changsCategoria(props, event)); }
}

function categoriaItem(state,item){
    return dispatch =>{ dispatch(categoriasItemM(state, item)); }
}

function categoriaAsignar(item){
    return dispatch =>{ dispatch(categoriasItem(item)); }
}

function categoriaSearch(name){
    return dispatch => {  
    dispatch(inicial());              
        categoriaService.getSearch(name)
        .then((response)=>{           
          dispatch(categoriasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}


export function categoriasItem(item){
    return{
        type: "CATEGORIA_ITEM",        
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

export function categoriasItemM(state,item){
    return{
        type: "CATEGORIA_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsCategoria(props, value){
    return{
        type: "CATEGORIA_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'CATEGORIA_MODAL_REGISTRO',
        state:state
    }
}


export function categoriasReset(){
    return{        
        type: 'CATEGORIA_RESET'
    }
}

export function categoriasData(response){
    return{        
        type: 'CATEGORIA_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function categoriasLista(response){
    return{        
        type: 'CATEGORIA_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function categoriasCreate(response){
    return{        
        type: 'CATEGORIA_CREATE',     
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