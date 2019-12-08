import { cajaService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const cajaActions = {
    cajaData,
    cajaCreate,
    cajaItemCreate,
    cajaItemRemove,
    cajaUpdate,
    cajaReset,    
    modalRegistro,
    changeCaja,
    changesCaja,
    cajaLista,
    cajaItem,
    cajaItems,
    cajaAsignar,
    cajaInforme,
    cajaRecibo,
    cajaInformes,
    cajaRecibos,
    cajaUser,
    cajaSearch,
    cajaDelete: _cajaDelete
};


function cajaLista(name){
    return dispatch => {  
    dispatch(inicial());              
        cajaService.getLista(name)
        .then((response)=>{            
          dispatch(cajasLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function cajaData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        cajaService.getData(page,numPages)
        .then((response)=>{                
          dispatch(cajasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function cajaCreate(caja){
    return dispatch => {       
    dispatch(inicial());  
        cajaService.create(caja)
        .then((response)=>{        

            dispatch(cajasCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function cajaItemCreate(caja){
    return dispatch => {       
    dispatch(inicial());  
        cajaService.insertItem(caja)
        .then((response)=>{   
                         
            dispatch(cajasItemMU(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function cajaItemRemove(caja){
    return dispatch => {       
    dispatch(inicial());  
        cajaService.removeItem(caja)
        .then((response)=>{   
                       
            dispatch(cajasItemMU(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function cajaUpdate(caja){
    return dispatch => {       
    dispatch(inicial());  
        cajaService.update(caja)
        .then((response)=>{                         
            dispatch(cajasCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _cajaDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        cajaService.delete(id)
        .then((response)=>{             
            dispatch(cajasData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function cajaReset(){
    return dispatch => {       
    dispatch(cajasReset());      
    }
}

function modalRegistro(estado){
    return dispatch => { 
       
    dispatch(modalRegistros(estado));      
    }
}

function changeCaja(props, event){
    return dispatch =>{ dispatch(changsCaja(props, event.target.value)); }
}

function changesCaja(props, event){
    return dispatch =>{ dispatch(changsCaja(props, event)); }
}

function cajaItem(est,id){
    return dispatch => {    
    dispatch(inicial());    
        cajaService.getItem(id)
        .then((response)=>{       

            dispatch(cajasItemM(est,response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}

function cajaInforme(est,id){
    return dispatch => {    
    dispatch(inicial());    
        cajaService.getItem(id)
        .then((response)=>{                                             
            dispatch(cajasInforme(est,response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}

function cajaRecibo(est,id){
    return dispatch => {    
    dispatch(inicial());    
        cajaService.getSingle(id)
        .then((response)=>{                                             
            dispatch(cajasRecibo(est,response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}

function cajaUser(id){
    return dispatch => {    
    dispatch(inicial());    
        cajaService.getUser(id)
        .then((response)=>{                                                       
            dispatch(cajasUser(response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}


function cajaInformes(est){
    return dispatch => {                   
         dispatch(cajasInformes(est))
  }
}

function cajaRecibos(est){
    return dispatch => {                   
         dispatch(cajasRecibos(est))
  }
}


function cajaSearch(title){
    return dispatch => {  
    dispatch(inicial());              
        cajaService.getSearch(title)
        .then((response)=>{                     
          dispatch(cajasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

export function cajasRecibos(state){
    return{
        type: "CAJA_ITEM_RECIBOS",        
        state: state
    }
}

export function cajasUser(response){
    return{
        type: "CAJA_ITEM_USER",        
        item: response.item,
        [ pendingTask ]: end 
    }
}

export function cajasInformes(state){
    return{
        type: "CAJA_ITEM_INFORMES",        
        state: state
    }
}





function cajaItems(state){
    return dispatch =>{ dispatch(cajasItemMS(state)); }
}

function cajaAsignar(item){
    return dispatch =>{ dispatch(cajasItem(item)); }
}

export function cajasRecibo(state,response){
    return{
        type: "CAJA_ITEM_RECIBO",        
        response: response,
        state: state,
        [ pendingTask ]: end 
    }
}

export function cajasInforme(state,response){
    return{
        type: "CAJA_ITEM_INFORME",        
        response: response,
        state: state,
        [ pendingTask ]: end 
    }
}



export function cajasItem(item){
    return{
        type: "CAJA_ITEM",        
        item: item
    }
}


export function cajasItemM(state,response){
    return{
        type: "CAJA_ITEM_MODAL",        
        response: response,
        state: state,
        [ pendingTask ]: end 
    }
}

export function cajasItemMU(response){
    return{
        type: "CAJA_ITEMU_MODAL",        
        item: response.cajas[0].item,
        items: response.cajas[0].items,
        [ pendingTask ]: end 
    }
}
export function cajasItemMS(state){
    return{
        type: "CAJA_ITEM_MODALS",                
        state: state
    }
}

export function changsCaja(props, value){
    return{
        type: "CAJA_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'CAJA_MODAL_REGISTRO',
        state:state
    }
}


export function cajasReset(){
    return{        
        type: 'CAJA_RESET'
    }
}

export function cajasData(response){
    return{        
        type: 'CAJA_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function cajasLista(response){
    return{        
        type: 'CAJA_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function cajasCreate(response){
    return{        
        type: 'CAJA_CREATE',     
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