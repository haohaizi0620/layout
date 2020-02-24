/*
 * @Author: your name
 * @Date: 2020-02-23 15:17:54
 * @LastEditTime: 2020-02-23 15:54:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\api\api.js
 */
import 'whatwg-fetch';
import 'es6-promise';

//let qs = require('qs');


export function request(url, options) {
  options.credentials = 'include';
  options.headers = {
    'Accept': 'application/json, text/plain, */*',
  };

  if (options.method === 'POST' || options.method === 'PUT') {
   //根据后端接受什么形式的数据选择对应的body与headers
    options.body = JSON.stringify(options.body)
    options.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
    }
    /* options.body = qs.stringify(options.body);
       options.headers={
       'Accept': 'application/json, text/plain, *!/!*',
       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
       }
     */
  }
  return new Promise((resolve, reject) => {
    fetch(url, options).then(res => {
      return res.json();
    }).then(data => {
      resolve(data)
    }).catch(err => {
      //捕获异常
      console.log(err.msg);
      reject(err);
    })
  })
}