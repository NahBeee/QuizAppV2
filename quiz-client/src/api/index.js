import axios from 'axios';

export const BASE_URL= 'https://localhost:7223/';

export const ENDPOINTS = {
    user:'user',
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}

//above function provides a convenient way to interact with different endpoints of an API by encapsulating common HTTP request methods (GET, POST, PUT, DELETE) into a single object.