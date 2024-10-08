// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios'
const postData = (api,values) => {
    const url='http://localhost:3000';
    return axios.post(url+api,values)
};
const getData = (api) => {
    const url='http://localhost:3000';
    return axios.get(url+api)
};
const putData = (api,values) => {
    const url='http://localhost:3000';
    return axios.put(url+api,values)
};
const deleteData = (api) => {
    const url='http://localhost:3000';
    console.log(api);
    return axios.delete(url+api)
};
export {postData,getData,putData,deleteData}