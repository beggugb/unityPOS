import { ventaService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const ventaActions = {
    ventaData,
    ventaCreate,
    ventaUpdate,
    ventaReset,    
    modalPagar,
    changeVenta,
    changesVenta,
    ventaLista,
    ventaItem,
    ventaAsignar,
    ventaDelete: _ventaDelete,
    addItems,
    setIndex
};


function ventaLista(name){
    return dispatch => {  
    dispatch(inicial());              
        ventaService.getLista(name)
        .then((response)=>{            
          dispatch(ventasLista(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function ventaData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        ventaService.getData(page,numPages)
        .then((response)=>{                
          dispatch(ventasData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function ventaCreate(venta){
    return dispatch => {       
    dispatch(inicial());  
        ventaService.create(venta)
        .then((response)=>{           
                 
            dispatch(ventasCreate());
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function ventaUpdate(venta){
    return dispatch => {       
    dispatch(inicial());  
        ventaService.update(venta)
        .then((response)=>{                         
            dispatch(ventasCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _ventaDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        ventaService.delete(id)
        .then((response)=>{             
            dispatch(ventasData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function ventaReset(){
    return dispatch => {       
    dispatch(ventasReset());      
    }
}

function modalPagar(estado){
    return dispatch => { 
        
    dispatch(modalsPagar(estado));      
    }
}

function changeVenta(props, event){
    return dispatch =>{ dispatch(changsVenta(props, event.target.value)); }
}

function changesVenta(props, event){
    return dispatch =>{ dispatch(changsVenta(props, event)); }
}

function ventaItem(state,item){
    return dispatch =>{ dispatch(ventasItemM(state, item)); }
}

function ventaAsignar(item){
    return dispatch =>{ dispatch(ventasItem(item)); }
}

function addItems(items,total,cantidad){
    return dispatch =>{
        dispatch(itemAdds(items,total,cantidad));
    }
}

function setIndex(dato,index){
    return dispatch =>{
        dispatch(indexAdd(dato,index));
    }
}

export function indexAdd(dato,inter){
    return{
        type: "VENTA_SET",
        dato: dato,
        inter: inter

    }
}

export function itemAdds(data,suma,cantidad){
    return{
        type: "VENTA_DIRECTA_LISTA",
        items: data,
        suma: suma,
        cantidad: cantidad
    }
}




export function ventasItem(item){
    return{
        type: "VENTA_ITEM",        
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

export function ventasItemM(state,item){
    return{
        type: "VENTA_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsVenta(props, value){
    return{
        type: "VENTA_CHANGE",
        props: props,
        value: value
    }
}

export function modalsPagar(state){
    return{        
        type: 'VENTA_MODAL_PAGAR',
        state:state
    }
}


export function ventasReset(){
    return{        
        type: 'VENTA_RESET'
    }
}

export function ventasData(response){
    return{        
        type: 'VENTA_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function ventasLista(response){
    return{        
        type: 'VENTA_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function ventasCreate(){
    return{        
        type: 'VENTA_CREATE',             
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