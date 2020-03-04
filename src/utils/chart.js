/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-28 18:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
import store from '../redux/store';
import {getSpecify} from '../api/api';
// import dmapgl  from './dmap-gl-dev.js';
import {
    addCptOptionsList,
    editCptOptionsList
} from '../redux/actions/showLayerDatas';

let chartTestData = require('../datasource/chartTestData.json');
let mapTestData = require('../datasource/mapTestData.json');
// import 'http://172.26.50.89/TileServer/dmap4.0/css/dmap4.0.css';

const chartData = require('../datasource/chartDatas.json');
/**
 * @description: 创建一个对应的图表
 * @param  {String} chartName 图标的拼音首字母小写
 * @param  {Number} id 生成的图表对应的当前时间戳的id
 * @param  {Layout} _this  代表layout组件的this
 * @param  {String} chartState 代表当前图表是改变数据还是不改变数据   noUpdate不改变数据   update 改变数据
 * @return:  正常添加一个图表,否则就是移动位置改变大小，如果没有找到当前图表对应的接口id直接返回
 */
export function chartOption(chartName, id, _this, chartState,otherObj) {
    var arr = window.arr ? window.arr : [];
    var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
    var flag = false; //是否存在
    var addIndex = _this.state.cptChartIdList.length-1;
     //如果存在进行更新大小或者替换数据,不存在请求数据加载图层
    if (arr) {
        arr.forEach(function (e, item) {
            if (e == id) {
                flag = true;
                return false;
            }
        });
    }
    if(otherObj&&otherObj.state=="leftAdd"){
        let layerObj = otherObj.data;
        if (!flag) {
            arr.push(id);
            window.arr = arr;
            addChart(layerObj,id,addIndex,_this);     
        }else{
                let newOptions = store.getState().showLayerDatas.cptOptionsList[_this.state.cptIndex].layerOption;
                let tempThisObj = document.getElementById(id);

                var thType = layerObj.thType;
                if("0" == thType){//图表
                    var e_instance = tempThisObj.getAttribute("_echarts_instance_");
                    if (chartState == "update") {
                        new window.dmapgl.commonlyCharts(id, {
                            data: newOptions
                        });
                    } else {
                        if(window.echarts.getInstanceById(e_instance)){
                            window.echarts.getInstanceById(e_instance).resize();
                        }
                    }
                }else if("1" == thType){//wms或wfs
                    let mapObj = mapObjArr[_this.state.cptIndex]
                    if(mapObj&&mapObj.layerId == id){
                        if (chartState == "update") {
                                
                        } else {
                            if(mapObj.layerMap){
                                mapObj.layerMap.resize();
                            }
                        }
                    }
                }      
        }
    }else{
        let layerType = "chart";
        let chartId = 101;
        chartData.map(item => {
            if (item.id == chartName) {
                layerType = item.layerType;
                chartId = item.chartId;
            }
        })
        var layerObj = document.getElementById(id).parentNode;
        if (!flag) {
            if(layerType=="text"||layerType=="border"||layerType=="iframe"){
                arr.push(id);
                mapObjArr.push({
                    layerId: id,
                    layerMap: {}
                });
                window.arr = arr;
                window.mapObjArr = mapObjArr;
                let tempSaveObj = {};
                if(layerType=="border"){
                    // layerObj.style.border = "1px solid red";
                    layerObj.style.borderWidth = '1px';
                    layerObj.style.borderStyle = 'solid';
                    layerObj.style.borderColor = 'red';
                    tempSaveObj = {
                        borderWidth:'1',
                        borderStyle:'solid',
                        borderColor:'rgba(255, 47, 3 ,1)'
                    }
                }else if(layerType=="text"){
                    tempSaveObj = {
                        textCenter:'标题',
                        fontFamily:'auto',
                        fontSize:30,
                        fontColor:'rgba(255,255,255,1)',
                        fontWeight:'normal',
                        textAlign:"center",
                        writingMode:"horizontal-tb",
                        hyperlinkCenter:"",
                        isNewWindow:false,
                        
                    };
                }else if(layerType=="iframe"){
                    tempSaveObj = {
                        iframeUrl:""
                    }
                }
                store.dispatch(addCptOptionsList(chartId,tempSaveObj));
                _this.updateGlobalEditData();
            }else if(layerType=="chart"||layerType=="map"||layerType=="chartMap"){
                        let tempIndex = Math.ceil(Math.random()*3)-1;
                        var data = chartTestData[tempIndex];
                        var a;
                        var map;
                        var tempMap = null;
                        if (layerType == "map"||layerType=="chartMap") {
                            store.dispatch(addCptOptionsList(chartId, []))
                            map = new window.dmapgl.Map({
                                container :id,
                                zoom : 8,
                                minZoom : 8,
                                maxZoom : 20,
                                fadeDuration : 0,
                                center : [ 503428.7804260254, 345586.30670166016 ],
                                preserveDrawingBuffer:true,
                                style : 'zyzx://formal_blue/styles/style.json',
                                //style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json', //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
                                //localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei Regular","SimSun,Regular"',
                            });
                            map.on('load', function() {
                                getSpecify(chartId).then(result => {
                                    let tempOptionObj = {
                                        cptIndex:addIndex,
                                        layerOptions:result
                                      }
                                      store.dispatch(editCptOptionsList(tempOptionObj));
                                      _this.updateGlobalEditData();
                                }).catch(error => {
                                    console.info(error);     
                                });
                            });
                        } else if (layerType == "chart") {
                                a = new window.dmapgl.commonlyCharts(id, {
                                    data: data
                                });
                                store.dispatch(addCptOptionsList(chartId, data))
                        }
                        arr.push(id);
                        mapObjArr.push({
                            layerId: id,
                            layerMap: map
                        });
                        window.arr = arr;
                        window.mapObjArr = mapObjArr;
            }else{
                
            }
        } else {
            if(layerType=="text"||layerType=="border"){
                
            }else if(layerType=="chart"||layerType=="map"||layerType=="chartMap"){
                let newOptions = store.getState().showLayerDatas.cptOptionsList[_this.state.cptIndex].layerOption;
                let tempThisObj = document.getElementById(id);
                if (layerType == "chart") {
                    var e_instance = tempThisObj.getAttribute("_echarts_instance_");
                    if (chartState == "update") {
                        new window.dmapgl.commonlyCharts(id, {
                            data: newOptions
                        });
                    } else {
                        if(window.echarts.getInstanceById(e_instance)){
                            window.echarts.getInstanceById(e_instance).resize();
                        }
                    }
                } else if (layerType == "map"||layerType=="chartMap") {
                    let mapObj = mapObjArr[_this.state.cptIndex]
                    if(mapObj.layerId == id){
                        if (chartState == "update") {
                                
                        } else {
                            if(mapObj.layerMap){
                                mapObj.layerMap.resize();
                            }
                        }
                    }
                }     
            }else{
                
            }
        }
    }
}




export function showChartsOption(chartsList){
    if(chartsList&&chartsList[0]){
        var arr = window.arr ? window.arr : [];
        var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
        chartsList.map((item,index) => {
            let chartId = item.chartId;
            let timeKey = item.timeKey;
            arr.push(timeKey);
            mapObjArr.push({
                layerId: timeKey,
                layerMap:{}
            });
            store.dispatch(addCptOptionsList(chartId, []));
            getSpecify(chartId)
                    .then(function (result) {
                        if(result.data){
                            console.log("接口没有数据")
                        }else{
                            if(result&&result[0]){
                                new window.dmapgl.commonlyCharts(timeKey, {
                                    data: result
                                });
                            }
                        }
                        let tempOptionObj = {
                            cptIndex:index,
                            layerOptions:result
                          }
                         store.dispatch(editCptOptionsList(tempOptionObj));
                       
            }).catch(e => console.log("error", e));   
        })
        window.mapObjArr = mapObjArr;
        window.arr = arr;
    }
}

/**
 * 添加图表
 * @param data 图表数据
 * @param n 序号
 */
function addChart(data,timeId,addIndex,_this){
    var thType = data.thType;
    var catalogId = data.id;
    var map = {};
	if("0" == thType){//图表
		var type1 = data.type?data.type:'';//图表类型（饼、柱。。等）
		if('THEMEPIE_CHART' == type1 ||'THEMERING_CHART' == type1 ){
			/*
			 * 一般图表
			 * THEMEPIE_CHART（一般饼状图）
			 * THEMERING_CHART（一般圆环图）
			 */
            store.dispatch(addCptOptionsList(catalogId, []))
			getSpecify(catalogId).then(result => {
                var a = new window.dmapgl.commonlyCharts(timeId,{data:result});
                let tempOptionObj = {
                    cptIndex:addIndex,
                    layerOptions:result
                  }
                 store.dispatch(editCptOptionsList(tempOptionObj));
                 _this.updateGlobalEditData();
            }).catch(error => {
                console.info(error);     
            });
		}
	}else if("1" == thType){//wms或wfs
        var service = data.service;
		var layername = data.layername;
		var name = data.name;
		var renderer = data.renderer?data.renderer:'';//wms样式
		map = new window.dmapgl.Map({
			container :timeId,
			zoom : 8,
			minZoom : 8,
			maxZoom : 20,
			fadeDuration : 0,
			center : [ 503428.7804260254, 345586.30670166016 ],
			preserveDrawingBuffer:true,
			style : 'zyzx://formal_blue/styles/style.json',
			//style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json', //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
			//localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei Regular","SimSun,Regular"',
        });
        store.dispatch(addCptOptionsList(catalogId, []))
		if(data.show == "1"){
			map.on('load', function() {
                getSpecify(catalogId).then(result => {
                    let tempOptionObj = {
                        cptIndex:addIndex,
                        layerOptions:result
                      }
                     store.dispatch(editCptOptionsList(tempOptionObj));
                     _this.updateGlobalEditData();
                }).catch(error => {
                    console.info(error);     
                });
    		});
		}else if(data.show == "2"){
			map.on('load', function() {
                getSpecify(catalogId).then(result => {
                    let tempOptionObj = {
                        cptIndex:addIndex,
                        layerOptions:result
                      }
                     store.dispatch(editCptOptionsList(tempOptionObj));
                     _this.updateGlobalEditData();
                }).catch(error => {
                    console.info(error);     
                });
    		});
		}
    }
    var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
    mapObjArr.push({
        layerId: timeId,
        layerMap:map
    });
    window.mapObjArr = mapObjArr;
}