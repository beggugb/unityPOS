import { authHeader, apiErp } from '../helpers'
export const userService = {
    login,
    logout,
    getDataList,
    getData,       
    getItem,
    create,   
    update,
    delete: _delete 

}
function getData(page,numPage) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/users/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}
function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/users/${id}`, requestOptions).then(handleResponse);
}

function create(users) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(users)
    };

    return fetch(`${apiErp}/users`, requestOptions).then(handleResponse);
}

function update(users) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(users)
    };
    return fetch(`${apiErp}/users/${users.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/users/${id}`, requestOptions).then(handleResponse);
}

function getDataList(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/users/lista/${user}`, requestOptions).then(handleResponse);
}
function login(usuario) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    };
         
    return fetch(`${apiErp}/users/login/user`, requestOptions).then(handleResponse) 
        .then(response => {           
            localStorage.setItem('user',JSON.stringify(response.user));
            localStorage.setItem('token',JSON.stringify(response.token));            
            localStorage.setItem('items',JSON.stringify(response.data));            
            return response;
        })        

}

function logout() {    
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');    
    localStorage.removeItem('items');    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}