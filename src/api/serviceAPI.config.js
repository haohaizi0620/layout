/*
 * @Author: your name
 * @Date: 2020-02-18 14:13:46
 * @LastEditTime: 2020-02-23 15:37:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\api\serviceAPI.config.js
 */

/***
 * 
 *统一定义接口，有利于维护 
 * 
 **/
 
const HISTORY= 'http://127.0.0.1:8888/';
const URL ={
    selectPostOneMainLayer:HISTORY+'selectPostOneMainLayer',//接口1
    selectGetOneMainLayer:HISTORY+'selectGetOneMainLayer',
    addMainLayer:HISTORY+'addMainLayer' //接口2

}
export default URL
