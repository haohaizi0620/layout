/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-19 11:54:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import Router from './router/router'
ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
