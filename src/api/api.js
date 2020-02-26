/*
 * @Author: your name
 * @Date: 2020-02-25 16:49:24
 * @LastEditTime: 2020-02-26 15:04:30
 * @LastEditors: Please set LastEditors
 * @Description: 用来进行提供调用的接口
 * @FilePath: \layout - 副本 (2) - 副本\src\api\api.js
 */
import request from './request';
import serviceUrl from './serviceAPI.config';
import Qs from 'qs';
export function selectGetOneMainLayer(index) {
  return request(serviceUrl.selectGetOneMainLayer + '/' + index, { method: 'GET', mode: 'cors' });
}
export function selectPostOneMainLayer(data) {
  return request(serviceUrl.selectPostOneMainLayer, { method: 'POST', body: Qs.stringify(data) });
}
//接口2方法
export function addMainLayer(data) {
  return request(serviceUrl.addMainLayer, { method: 'POST', body: Qs.stringify(data) });
}

export function test() {
  return request({
    url: '/findAllStudent',
    method: 'get'
  });
}

export function getKSHChart() {
  return request({
    url: '../../thematic/GetKSHChart.do',
    method: 'get'
  });
}

export function addOneLayer(addLayerObj){
  return request({
    url: '../../thematic/addKSHChart.do',
    method: 'post',
    data:Qs.stringify(addLayerObj)
  });
}


export function delOneLayer(delLayerObj){
  return request({
    url: '../../thematic/DelKSHChart.do',
    method: 'post',
    data:Qs.stringify(delLayerObj)
  });
}


export function editOneLayer(editLayerObj){
  return request({
    url: '../../thematic/editKSHChart.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}


export function addPageImage(PageImageObj){
  return request({
    url: '../../share/saveImage.do',
    method: 'post',
    data:Qs.stringify(PageImageObj)
  });
}


