/*
 * @Author: your name
 * @Date: 2020-02-25 16:49:24
 * @LastEditTime: 2020-03-23 16:36:41
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

export function getShareDesc(getKshObj) {
  return request({
    url: 'http://localhost:8080/data/share/getShareDesc.do',
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



//用来获取背景的数据的id,如果不存在进行添加。
export function getBgIndex(getLayerObj){
  return request({
    url: 'http://localhost:8080/data/cell/getCellByPars.do',
    method: 'post',
    data:Qs.stringify(getLayerObj)
  });
}

export function getOtherLayer(getLayerObj){
  return request({
    url: 'http://localhost:8080/data/cell/getCells.do',
    method: 'post',
    data:Qs.stringify(getLayerObj)
  });
}

export function addOneOtherLayer(addLayerObj){
  return request({
    url: 'http://localhost:8080/data/cell/addCell.do',
    method: 'post',
    data:Qs.stringify(addLayerObj)
  });
}

export function editOneOtherLayer(updLayerObj){
  return request({
    url: 'http://localhost:8080/data/cell/updateCell.do',
    method: 'post',
    data:Qs.stringify(updLayerObj)
  });
}
export function delOneOtherLayer(delLayerObj){
  return request({
    url: 'http://localhost:8080/data/cell/deleteCell.do',
    method: 'post',
    data:Qs.stringify(delLayerObj)
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


export function editLayerSortNum(editLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/editLayerSortNum.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}

export function editLayerSortTopOrBottom(editLayerObj){
  return request({
    url: 'http://localhost:8080/data/thematic/editLayerSortTopOrBottom.do',
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

export function getMapDataWFS(layerName){
  return request({
    url: `/data/GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257025.703,582446.812,414679.125&searchType=recsearch&typename= ${layerName}`,
    method: 'get'
  });
}
export function getRecursionMap(url){
  return request({
    url: url,
    method: 'get'
  });
}




export function getShareObj(shareObj) {
  return request({
    url: 'http://localhost:8080/share/getSharesById',
    method: 'post',
    data:Qs.stringify(shareObj)
  });
}

export function getShareCells(shareObj) {
  return request({
    url: 'http://localhost:8080/share/getCells',
    method: 'post',
    data:Qs.stringify(shareObj)
  });
}



