/*
 * @Author: your name
 * @Date: 2020-02-25 16:49:24
 * @LastEditTime: 2020-02-28 14:55:39
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

export function getKSHChart(getKshObj) {
  return request({
    //http://localhost:8080/data/thematic/GetKSHChart.do
    url: 'http://localhost:8080/data/thematic/GetKSHChart.do',
    method: 'post',
    data:Qs.stringify(getKshObj)
  });
}

export function addOneLayer(addLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/addKSHChart.do',
    method: 'post',
    data:Qs.stringify(addLayerObj)
  });
}


export function delOneLayer(delLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/DelKSHChart.do',
    method: 'post',
    data:Qs.stringify(delLayerObj)
  });
}


export function editOneLayer(editLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/Edit.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}
export function editKSHChartPosition(editLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/editKSHChartPosition.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}
export function editKSHChartData(editLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/Edit.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}

export function addPageImage(PageImageObj){
  return request({
    url: 'http://localhost:8080/data/share/saveImage.do',
    method: 'post',
    data:Qs.stringify(PageImageObj)
  });
}


export function getAllZTT() {
  return request({
    url: 'http://localhost:8080/data/thematic/GetAllZTT.do',
    method: 'get'
  });
}


export function getShareById(shareID) {
  return request({
    url: 'http://localhost:8080/data/share/getShareById.do?id='+shareID,
    method: 'get'
  });
}
export function getSpecify(catalogId) {
  return request({
    url: `http://121.8.161.110:8082/service/Thematic?request=GetSpecify&id=${catalogId}&user=public&password=public123`,
    method: 'get'
  });
}





