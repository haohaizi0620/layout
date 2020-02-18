/*
 * @Author: your name
 * @Date: 2020-01-06 14:09:11
 * @LastEditTime : 2020-01-06 18:04:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\reducers.js
 */
import counter from './reducers/counter';
import showLayerDatas from './reducers/showLayerDatas';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action),
        showLayerDatas:showLayerDatas(state.showLayerDatas, action)
    }
}