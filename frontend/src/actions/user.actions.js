import { userService } from '../services';
import { alertActions } from './'
import {history} from '../helpers'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';


export const userActions = {
    login,
    logout,
    userDataList,
    setUser,    
    userData,
    userCreate,
    userUpdate,
    userReset,       
    modalRegistro,
    changeUser,
    changesUser,
     userDelete: _userDelete
};

function userDataList(user){
    return dispatch => {  
    dispatch(inicial());              
        userService.getDataList(user)
        .then((response)=>{                      
          dispatch(usersDataList(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}


function login(user){    
    return dispatch => {     
        dispatch(inicial());                   
        userService.login(user)                
        .then((response)=>{                    
           dispatch(LOGIN(response.user,response.data));
           dispatch(createNotification(alertActions.success(response.message)));
           history.push('/admin');                        
        }).catch((err)=>{                               
            dispatch(createNotification(alertActions.error(err)));
            dispatch(final());             
        })
    };
}

function logout(){
    return dispatch =>{   
      userService.logout();   
      dispatch(loginOut());
      history.push('/admin');      
    }
}

function setUser(user){
    return dispatch =>{             
      dispatch(setUsers(user));      
    }
}

function userReset(){
    return dispatch =>{         
      dispatch(resetUsers());      
    }
}

function userData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        userService.getData(page,numPages)
        .then((response)=>{                
          dispatch(usersData(response));})
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

function userCreate(user){
    return dispatch => {       
    dispatch(inicial());  
        userService.create(user)
        .then((response)=>{                      
            dispatch(usersCreate(response));
            dispatch(createNotification(alertActions.success("dato creado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}

function userUpdate(user){
    return dispatch => {       
    dispatch(inicial());  
        userService.update(user)
        .then((response)=>{                         
            dispatch(usersCreate(response));
            dispatch(createNotification(alertActions.success("dato actualizado !!")));
        })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err))); })
    }
}


function _userDelete(id){
    return dispatch => {    
    dispatch(inicial());    
        userService.delete(id)
        .then((response)=>{             
            dispatch(usersData(response));
            dispatch(createNotification(alertActions.error("dato eliminado !!")));            
        })
        .catch((err)=>{ 
        dispatch(final());       
           dispatch(createNotification(alertActions.error("no se puede eliminar !!"))); 
        })
    }
}


function modalRegistro(estado){
    return dispatch => { 
    
    dispatch(modalRegistros(estado));      
    }
}

function changeUser(props, event){
    return dispatch =>{ dispatch(changsUser(props, event.target.value)); }
}

function changesUser(props, event){
    return dispatch =>{ dispatch(changsUser(props, event)); }
}


export function loginOut(){
    return{
        type: "LOGIN_LOGOUT"
    }
}

export function resetUsers(){
    return{
        type: "USER_RESET"
    }
}

export function setUsers(user){
    return{
        type: "USER_SET_ID",
        user: user
    }
}

export function LOGIN(user,data){
    return{        
        type: 'LOGIN_SUCCESS',
        user: user,
        items: data,
        [ pendingTask ]: end                 
    }
}

export function usersDataList(response){
    return{        
        type: 'USER_DATA_LIST',
        data: response.data,        
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

export function usersItemM(state,item){
    return{
        type: "USER_ITEM_MODAL",        
        item: item,
        state: state
    }
}

export function changsUser(props, value){
    return{
        type: "USER_CHANGE",
        props: props,
        value: value
    }
}

export function modalRegistros(state){
    return{        
        type: 'USER_MODAL_REGISTRO',
        state:state
    }
}



export function usersData(response){
    return{        
        type: 'USER_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function usersLista(response){
    return{        
        type: 'USER_LISTA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function usersCreate(response){
    return{        
        type: 'USER_CREATE',     
        response: response,   
        [ pendingTask ]: end                 
    }
}
