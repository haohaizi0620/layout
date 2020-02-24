/*
 * @Author: your name
 * @Date: 2020-02-18 14:13:17
 * @LastEditTime: 2020-02-18 16:58:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\api\api.js
 */

import server from './server';
import url from './serviceAPI.config';
import Qs from 'qs';
//接口1方法
export function selectMainLayer(data){
    return server({
        url: url.selectMainLayer,
        method: 'post',
        dataType: "json",
	    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: Qs.stringify(data)
    })
}
export function selectGetOneMainLayer(layerId){
    return server({
        url: url.selectGetOneMainLayer+"/"+layerId,
        method: 'get',
        dataType: "json",
	    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        // data: {layerId:layerId}
    })
}




//接口2方法
export function addMainLayer(data){
    return server({
        url: url.addMainLayer,
        method: 'post',
        dataType: "json",
	    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: Qs.stringify(data)
    })
}
