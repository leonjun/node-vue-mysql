import axios from 'axios';

let base = '';

export const requestLogin = params => {
     return axios.post('/api/user/login', params).then(res => res); 
};
export const userlist = params => {
    return axios.post('/api/user/queryList', params).then(res => res); 
};
export const userListPage = params => {
    return axios.post('/api/user/userListPage', params).then(res => res); 
};
export const updateUser = params => {
    return axios.post('/api/user/update', params).then(res => res); 
};
export const deleteUser = params => {
    return axios.post('/api/user/delete', params).then(res => res); 
};
export const batchDelete = params => {
    return axios.post('/api/user/batchDelete', params).then(res => res); 
};

export const addUser = params => {
    return axios.post('/api/user/addUser', params).then(res => res); 
};
export const upload = params => {
    return axios.post('/api/user/img', params).then(res => res); 
};
export const addfwb = params => {
    return axios.post('/api/user/addUditor', params).then(res => res); 
};
export const fwblist = params => {
    return axios.post('/api/user/queryUditor', params).then(res => res); 
};
export const deletefwb = params => {
    return axios.post('/api/user/deletefwb', params).then(res => res); 
};


export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

//export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
