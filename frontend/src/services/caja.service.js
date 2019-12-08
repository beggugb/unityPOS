import { authHeader, apiErp } from '../helpers'

export const cajaService = {
    getData,
    getLista,
    getSearch,
    getItem,
    getSingle,
    getUser,
    removeItem,
    insertItem,
    create,   
    update,
    upload, 
    delete: _delete 
}

function upload(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader()},         
        body: data
    };            
    return fetch(`${apiErp}/cajas/upload/item/`, requestOptions).then(handleResponse);    
}

function getData(page,numPage) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/cajas/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}

function getSearch(article) {
    const requestOptions = {        
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };
    return fetch(`${apiErp}/cajas/search/items`, requestOptions).then(handleResponse);
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/cajas/${id}`, requestOptions).then(handleResponse);
}

function getSingle(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/cajas/single/${id}`, requestOptions).then(handleResponse);
}

function getUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/cajas/user/${id}`, requestOptions).then(handleResponse);
}

function getLista(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/cajas/lista/items/${name}`, requestOptions).then(handleResponse);
}

function insertItem(item) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    return fetch(`${apiErp}/cajas/item/${item.cajaId}`, requestOptions).then(handleResponse);
}

function removeItem(item) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    return fetch(`${apiErp}/cajas/items/${item.cajaId}`, requestOptions).then(handleResponse);
}


function create(cajas) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(cajas)
    };

    return fetch(`${apiErp}/cajas`, requestOptions).then(handleResponse);
}

function update(cajas) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(cajas)
    };
    return fetch(`${apiErp}/cajas/${cajas.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/cajas/${id}`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
               // logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
