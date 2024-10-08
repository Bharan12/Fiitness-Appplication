// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios'
const postData = (api,values) => {
    const url='https://fiitness-appplication-5.onrender.com';
    return axios.post(url+api,values)
};
const getData = (api) => {
    const url='https://fiitness-appplication-5.onrender.com';
    return axios.get(url+api)
};
const putData = (api,values) => {
    const url='https://fiitness-appplication-5.onrender.com';
    return axios.put(url+api,values)
};
const deleteData = (api) => {
    const url='https://fiitness-appplication-5.onrender.com';
    console.log(api);
    return axios.delete(url+api)
};
export {postData,getData,putData,deleteData}