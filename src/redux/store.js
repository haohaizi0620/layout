/*
 * @Author: your name
 * @Date: 2020-01-06 14:09:19
 * @LastEditTime: 2020-01-06 14:14:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\store.js
 */
import {createStore} from 'redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);
export const cptIndexarr=[];

export default store;