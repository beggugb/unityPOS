import { reporteService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin,  end } from 'react-redux-spinner';

export const reporteActions = {    
    change,
    changes,
    searchArticulos,
    searchCajas,
    searchVentas,    
    reportReset
}

function searchArticulos(item){
    return dispatch => { 
    dispatch(inicial());        
        reporteService.searchArt(item)
        .then((response)=>{                                            
           dispatch(reporteArticulos(response,item));              
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); dispatch(final());})
    };
}

function searchCajas(item){
    return dispatch => {      
    dispatch(inicial());        
        reporteService.searchCaj(item)
        .then((response)=>{                                                   
           dispatch(reporteCajas(response,item));              
        })
        .catch((err)=>{ 
            dispatch(createNotification(alertActions.error(err)));
            dispatch(final());
        })
    };
}

function searchVentas(item){
    return dispatch => {    
    dispatch(inicial());          
        reporteService.searchVen(item)
        .then((response)=>{                                      
           dispatch(reporteVentas(response,item));              
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); dispatch(final());})
    };
}


function change(props, event){
    return dispatch =>{ dispatch(itemChange(props, event.target.value)); }
}

function changes(props, value){
    return dispatch =>{ dispatch(itemChange(props, value)); }
}


function reportReset(){
    return dispatch =>{ 
        dispatch(reset()); 
    }
}

export function reporteVentas(response,item){
    return{
        type: "REPORTE_VENTAS_LIST",
        data: response.data,
        cantidad: response.cantidad,
        item: item,
        [ pendingTask ]: end       
    }
}

export function reporteArticulos(response,item){
    return{
        type: "REPORTE_ARTICULOS_LIST",
        data: response.data,
        item: item,
        cantidad: response.cantidad,
        [ pendingTask ]: end        
    }
}

export function reporteCajas(response,item){    
    return{
        type: "REPORTE_CAJAS_LIST",
        data: response.cajas.data,
        cantidad: response.cajas.cantidad,
        suma: response.totales[0].total,        
        item: item,
        [ pendingTask ]: end
    }
}




export function reset(){
    return{
        type: "REPORTE_RESET"
    }
}

export function itemChange(props, value){
    return{
        type: "REPORTE_CHANGE",
        props: props,
        value: value
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