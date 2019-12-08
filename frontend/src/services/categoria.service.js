import { authHeader, apiErp } from '../helpers'

export const categoriaService = {
    getData,
    getLista,
    getSearch,
    getItemCode,
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
    return fetch(`${apiErp}/categories/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/categories/${id}`, requestOptions).then(handleResponse);
}
function getItemCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/categories/lista/item/${code}`, requestOptions).then(handleResponse);
}
function getLista(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/categories/lista/items/${name}`, requestOptions).then(handleResponse);
}

function getSearch(category) {
    const requestOptions = {        
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };
    return fetch(`${apiErp}/categories/search/items`, requestOptions).then(handleResponse);
}


function create(categoriass) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(categoriass)
    };

    return fetch(`${apiErp}/categories`, requestOptions).then(handleResponse);
}

function update(categorias) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(categorias)
    };
    return fetch(`${apiErp}/categories/${categorias.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/categories/${id}`, requestOptions).then(handleResponse);
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
