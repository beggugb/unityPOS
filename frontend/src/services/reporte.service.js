import { authHeader, apiErp } from '../helpers'

export const reporteService = {
    searchArt,
    searchCaj,
    searchVen
}

function searchArt(dato) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
    };
    return fetch(`${apiErp}/reports/searcharticulos/`, requestOptions).then(handleResponse);
}

function searchCaj(dato) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
    };
    return fetch(`${apiErp}/reports/searchcajas/`, requestOptions).then(handleResponse);
}

function searchVen(dato) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
    };
    return fetch(`${apiErp}/reports/searchventas/`, requestOptions).then(handleResponse);
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
