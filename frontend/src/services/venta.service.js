import { authHeader, apiErp } from '../helpers'

export const ventaService = {
    getData,
    getLista,
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
    return fetch(`${apiErp}/sales/list/${page}/${numPage}`, requestOptions).then(handleResponse);
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/sales/${id}`, requestOptions).then(handleResponse);
}

function getLista(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/sales/lista/items/${name}`, requestOptions).then(handleResponse);
}


function create(ventas) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ventas)
    };

    return fetch(`${apiErp}/sales`, requestOptions).then(handleResponse);
}

function update(ventas) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ventas)
    };
    return fetch(`${apiErp}/sales/${ventas.id}`, requestOptions).then(handleResponse);
}


function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/sales/${id}`, requestOptions).then(handleResponse);
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
