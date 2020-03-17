// export function request(url, options) {
//   options.credentials = 'include';
//   options.headers = {
//     Accept: 'application/json, text/plain, */*'
//   };

//   if (options.method === 'POST' || options.method === 'PUT') {
//     //根据后端接受什么形式的数据选择对应的body与headers
//     options.body = JSON.stringify(options.body);
//     options.headers = {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json; charset=utf-8'
//     };
//     /* options.body = qs.stringify(options.body);
//        options.headers={
//        'Accept': 'application/json, text/plain, *!/!*',
//        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//        }
//      */
//   }
//   return new Promise((resolve, reject) => {
//     fetch(url, options)
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         resolve(data);
//       })
//       .catch(err => {
//         //捕获异常
//         console.log(err.msg);
//         reject(err);
//       });
//   });
// }

import axios from 'axios';
import { message } from 'antd';

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  success => {
    return success
  },

  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   message.error('Time Out!!');
    //   return Promise.reject();
    // } else {
      return res;
    // }
  },
  error => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
