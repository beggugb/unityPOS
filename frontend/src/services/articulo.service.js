import { authHeader, apiErp } from '../helpers'

export const articuloService = {
    getData,
    getLista,
    getSearch,
    searchCategory,
    getItem,
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
    return fetch(`${apiErp}/articles/upload/item/`, requestOptions).then(handleResponse);    
}

function getData(page,numPage) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/articles/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/articles/${id}`, requestOptions).then(handleResponse);
}

function getLista(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/articles/lista/items/${name}`, requestOptions).then(handleResponse);
}

function getSearch(article) {
    const requestOptions = {        
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };
    return fetch(`${apiErp}/articles/search/items`, requestOptions).then(handleResponse);
}

function searchCategory(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/articles/search/category/${id}`, requestOptions).then(handleResponse);
}



function create(articuloss) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(articuloss)
    };

    return fetch(`${apiErp}/articles`, requestOptions).then(handleResponse);
}

function update(articulos) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(articulos)
    };
    return fetch(`${apiErp}/articles/${articulos.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/articles/${id}`, requestOptions).then(handleResponse);
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
