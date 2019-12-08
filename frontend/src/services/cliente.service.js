import { authHeader, apiErp } from '../helpers'

export const clienteService = {
    getData,
    getLista,
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
    return fetch(`${apiErp}/clients/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/clients/${id}`, requestOptions).then(handleResponse);
}

function getItemCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/clients/lista/item/${code}`, requestOptions).then(handleResponse);
}

function getLista(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/clients/lista/items/${name}`, requestOptions).then(handleResponse);
}

function create(clients) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(clients)
    };

    return fetch(`${apiErp}/clients`, requestOptions).then(handleResponse);
}

function update(clients) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(clients)
    };
    return fetch(`${apiErp}/clients/${clients.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/clients/${id}`, requestOptions).then(handleResponse);
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
