/*
 * @Author: your name
 * @Date: 2020-02-25 16:49:24
 * @LastEditTime: 2020-03-27 18:22:17
 * @LastEditors: Please set LastEditors
 * @Description: 用来进行提供调用的接口
 * @FilePath: \layout - 副本 (2) - 副本\src\api\api.js
 */
import request from './request';
import serviceUrl from './serviceAPI.config';
import Qs from 'qs';
import typeObj from '../router/type';
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
//var cptIndexarr=[];
let url;
let deployPrev;
let localPrev;
if ("/data/" === typeObj.project){
  deployPrev = "http://172.26.50.89/data/";
  localPrev = "http://127.0.0.1:8080/data/";
}else {
  deployPrev = "http://172.26.50.89/share/";
  localPrev = "http://127.0.0.1:8081/share/";
}

if (typeObj.issue){
  url = deployPrev;
}else {
  url = localPrev;
}
/*const deployPrev = "http://172.26.50.89/data/";
const localPrev = "http://127.0.0.1:8080/data/";

const deploySharePrev = "http://172.26.50.89/share/";
const localSharePrev = "http://127.0.0.1:8081/share/";
const defaultSharePrev = deployPrev;*/

const defaultPrev = url;


export function getKSHChart(getKshObj) {
  return request({
    url: defaultPrev+'thematic/GetKSHChart.do',
    method: 'post',
    data:Qs.stringify(getKshObj)
  });
}

export function getShareDesc(getKshObj) {
  return request({
    url: defaultPrev+'share/getShareDesc.do',
    method: 'post',
    data:Qs.stringify(getKshObj)
  });
}


export function addOneLayer(addLayerObj){
  return request({
    url: defaultPrev+'thematic/addKSHChart.do',
    method: 'post',
    data:Qs.stringify(addLayerObj)
  });
}



//用来获取背景的数据的id,如果不存在进行添加。
export function getBgIndex(getLayerObj){
  return request({
    url: defaultPrev+'cell/getCellByPars.do',
    method: 'post',
    data:Qs.stringify(getLayerObj)
  });
}

export function getOtherLayer(getLayerObj){
  return request({
    url: defaultPrev+'cell/getCells.do',
    method: 'post',
    data:Qs.stringify(getLayerObj)
  });
}

export function addOneOtherLayer(addLayerObj){
  return request({
    url: defaultPrev+'cell/addCell.do',
    method: 'post',
    data:Qs.stringify(addLayerObj)
  });
}

export function editOneOtherLayer(updLayerObj){
  return request({
    url: defaultPrev+'cell/updateCell.do',
    method: 'post',
    data:Qs.stringify(updLayerObj)
  });
}
export function delOneOtherLayer(delLayerObj){
  return request({
    url: defaultPrev+'cell/deleteCell.do',
    method: 'post',
    data:Qs.stringify(delLayerObj)
  });
}



export function delOneLayer(delLayerObj){
  return request({
    url: defaultPrev+'thematic/DelKSHChart.do',
    method: 'post',
    data:Qs.stringify(delLayerObj)
  });
}


export function editOneLayer(editLayerObj){
  return request({
    url: defaultPrev+'thematic/Edit.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}
export function editKSHChartPosition(editLayerObj){
  return request({
    url: defaultPrev+'thematic/editKSHChartPosition.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}


export function editLayerSortNum(editLayerObj){
  return request({
    url: defaultPrev+'thematic/editLayerSortNum.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}

export function editLayerSortTopOrBottom(editLayerObj){
  return request({
    url: defaultPrev+'thematic/editLayerSortTopOrBottom.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}

export function editKSHChartData(editLayerObj){
  return request({
    url: defaultPrev+'thematic/Edit.do',
    method: 'post',
    data:Qs.stringify(editLayerObj)
  });
}

export function addPageImage(PageImageObj){
  return request({
    url: defaultPrev+'share/saveImage.do',
    method: 'post',
    data:Qs.stringify(PageImageObj)
  });
}


export function getAllZTT() {
  return request({
    url: defaultPrev+'thematic/GetAllZTT.do',
    method: 'get'
  });
}


export function getShareById(shareID) {
  return request({
    url: defaultPrev+'share/getShareById.do?id='+shareID,
    method: 'get'
  });
}
export function getSpecify(catalogId) {
  var schema;
  if ("/share/" === typeObj.project){
    schema = getUrlParam("user");
  }else {
    schema = window.parent.document.getElementById("userName").innerHTML
  }
  return request({
    url: defaultPrev+`JSThematic?request=GetSpecify&id=${catalogId}&schema=${schema}`,
    method: 'get'
  });
}

export function getSpecifyGeojson(catalogId) {
  var schema;
  if ("/share/" === typeObj.project){
    schema = getUrlParam("user");
  }else {
    schema = window.parent.document.getElementById("userName").innerHTML
  }
  return request({
    url: defaultPrev+`JSThematic?request=GetSpecify&id=${catalogId}&resultType=geojson&schema=${schema}`,
    method: 'get'
  });
}

export function getMapDataWFS(layerName){
  return request({
    url: defaultPrev+`GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257025.703,582446.812,414679.125&searchType=recsearch&typename= ${layerName}`,
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
    url: defaultPrev+'getSharesById',
    method: 'post',
    data:Qs.stringify(shareObj)
  });
}

export function getShareCells(shareObj) {
  return request({
    url: defaultPrev+'getCells',
    method: 'post',
    data:Qs.stringify(shareObj)
  });
}



function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null)
    return unescape(r[2]);
  return null; // 返回参数值
}
