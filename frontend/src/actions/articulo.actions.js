import { articuloService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const articuloActions = {
    articuloData,
    articuloCreate,
    articuloUpdate,
    articuloReset,  
    articuloItem,
    articuloView,
    articuloViews,
    articuloImagen,  
    articuloUpload,
    articuloItemCode,  
    articuloSearch,  
    articuloSearchCategory,  
    modalRegistro,    
    changeArticulo,
    changesArticulo,    
    articuloDelete: _articuloDelete
};


function articuloData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        articuloService.getData(page,numPages)
        .then((response)=>{                
          dispatch(articulosData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function articuloCreate(articulo){
    return dispatch => {       
    dispatch(inicial());  
        articuloService.create(articulo)
        .then((response)=>{             
            dispatch(articulosCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function articuloUpdate(articulo){
    return dispatch => {       
    dispatch(inicial());  
        articuloService.update(articulo)
        .then((response)=>{                         
            dispatch(articulosCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _articuloDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        articuloService.delete(id)
        .then((response)=>{             
            dispatch(articulosData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function articuloReset(){
    return dispatch => {       
    dispatch(articulosReset());      
    }
}

function modalRegistro(state){
    return dispatch => {       
    dispatch(modalRegistros(state));      
    }
}

function articuloItem(est,id){
    return dispatch => {    
    dispatch(inicial());    
        articuloService.getItem(id)
        .then((response)=>{                         
           
            dispatch(itemCategoria(response.article))
            dispatch(itemMarca(response.article))
            dispatch(itemTipo(response.article))            
            dispatch(itemArticulo(est,response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}

function articuloView(est,id){
    return dispatch => {    
    dispatch(inicial());    
        articuloService.getItem(id)
        .then((response)=>{                
           dispatch(itemArticuloView(est,response)) })           
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}
function articuloViews(est){
    return dispatch => {        
        dispatch(itemArticuloViews(est))
    }
}

function articuloItemCode(code){
    return dispatch => {    
    dispatch(inicial());    
        articuloService.getItemCode(code)
        .then((response)=>{                                    
         
            dispatch(itemArticuloCode(response)) })
        .catch((err)=>{ 
           dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede cargar !!"))); 
        })    
    
  }
}

function articuloSearch(title){
    return dispatch => {  
    dispatch(inicial());              
        articuloService.getSearch(title)
        .then((response)=>{                     
          dispatch(articulosData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function articuloSearchCategory(id){
    return dispatch => {  
    dispatch(inicial());              
        articuloService.searchCategory(id)
        .then((response)=>{                     
          dispatch(articulosData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function articuloImagen(est,item){
    return dispatch => {           
    dispatch(articulosImagen(est,item));            
  }
}

function articuloUpload(data,articuloId){
    return dispatch => {       
        dispatch(inicial());
        articuloService.upload(data)        
        .then((response)=>{          
            let articulo = {
                id :articuloId,
                filename: response.filename                
            }
           articuloService.update(articulo)
             .then((response)=>{                         
                dispatch(articulosCreate(response));
                dispatch(createNotification(alertActions.success("dato actualizado !!")));
           })
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }    
}

export function articulosImagen(state,item){
    return{
        type: "ARTICULO_IMAGEN",
        item: item,
        state: state
    }
}



//dewey
export function itemCategoria(item){
    return{
        type: "CATEGORIA_ITEM",
        item: item.Category
    }
}

//cutter
export function itemMarca(item){
    return{
        type: "MARCA_ITEM",
        item: item.Mark
    }
}

//editorial
export function itemTipo(item){
    return{
        type: "TIPO_ITEM",
        item: item.Type
    }
}

//articulo
export function itemArticuloView(state,item){
    return{
        type: "ARTICULO_ITEM_VIEW",
        item: item.article,
        state: state,
        [ pendingTask ]: end
    }
}

export function itemArticuloViews(state){
    return{
        type: "ARTICULO_ITEM_VIEWS",        
        state: state
    }
}

export function itemArticulo(state,item){
    return{
        type: "ARTICULO_ITEM",
        item: item.article,
        state: state,
        [ pendingTask ]: end
    }
}

//articuloCode
export function itemArticuloCode(item){
    return{
        type: "ARTICULO_ITEM_CODE",
        item: item.book,        
        [ pendingTask ]: end
    }
}





function changeArticulo(props, event){
    return dispatch =>{ dispatch(changsArticulo(props, event.target.value)); }
}

function changesArticulo(props, event){
    return dispatch =>{ dispatch(changsArticulo(props, event)); }
}

export function changsArticulo(props, value){
    return{
        type: "ARTICULO_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'ARTICULO_MODAL_REGISTRO',
        state: state
    }
}


export function articulosReset(){
    return{        
        type: 'ARTICULO_RESET'
    }
}

export function articulosData(response){
    return{        
        type: 'ARTICULO_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function articulosCreate(response){
    return{        
        type: 'ARTICULO_CREATE',  
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