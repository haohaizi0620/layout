/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-24 17:02:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
import store from '../redux/store';
// import dmapgl  from './dmap-gl-dev.js';
import {
    addCptOptionsList
} from '../redux/actions/showLayerDatas';
import echarts from 'echarts' 
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
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
    let layerType = "chart";
    let chartId = 101;
    chartData.map(item => {
        if (item.id == chartName) {
            layerType = item.layerType;
            chartId = item.chartId;
        }
    })
        var arr = window.arr ? window.arr : [];
        var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
        var flag = false; //是否存在
        //如果存在进行更新大小或者替换数据,不存在请求数据加载图层
        if (arr) {
            arr.forEach(function (e, item) {
                if (e == id) {
                    flag = true;
                    return false;
                }
            });
        }
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
            }else if(layerType=="chart"||layerType=="map"||layerType=="chartMap"){
                // var url = `http://172.24.254.94/service/Thematic?request=GetSpecify&id=${chartId}&user=testV4&password=testV4123`;
                // fetch(url)
                //     .then(response => response.json())
                //     .then(function (data) {
                        //将当前的图表数据保存起来
                        // chartTestData;mapTestData
                        let tempIndex = Math.ceil(Math.random()*3)-1;
                        var data = chartTestData[tempIndex];
                        var a;
                        var map;
                        var tempMap = null;
                        if (layerType == "map"||layerType=="chartMap") {
                            /* map = new window.dmapgl.Map({
                                container: id,
                                zoom: 10,
                                minZoom: 8,
                                maxZoom: 19,
                                fadeDuration: 0,
                                trackResize: true,
                                center: [503428.7804260254, 305586.30670166016],
                                style:'http://localhost:8080/data/Vector/formal_blue/styles/style.json',
                                // style: 'http://172.24.254.94:8080/formal_criterion/styles/root.json', //'zyzx://vector_standard/styles/style.json',// 'http://172.26.50.89/Help4Gov/Vector/vector_standard/styles/style.json',  //  
                                localIdeographFontFamily: ' "Microsoft YaHei Bold","Microsoft YaHei Regular","SimSun,Regular"',
                            }); */
                            /* map.on('load', function () {
                                // fetch('http://172.24.254.94/service/Thematic?request=GetSpecify&id=156&resultType=geojson&schema=public')
                                // fetch('http://172.24.254.94/service/Thematic?request=GetSpecify&id=156&resultType=geojson&schema=public&user=testV4&password=testV4123')
                                //     .then(response => response.json())
                                //     .then(function (data) {
                                        data = mapTestData;
                                        if(data&&data[0]){
                                            var s = new window.dmapgl.EchartsTool(data[0],map);
                                        }
                                    // }).catch(e => console.log("error", e));
                            }); */
                        } else if (layerType == "chart") {
                           let tempOption =  {
                                title:{
                                  text:'用户骑行订单',
                                  textStyle:{
                                    color:'white'
                                  }
                                },
                                tooltip:{   //展示数据
                                  trigger:'axis'
                                },
                                xAxis:{
                                  data:['周一','周二','周三','周四','周五','周六','周日']
                                },
                                yAxis:{
                                  type:'value'
                                },
                                series:[
                                  {
                                    name:'订单量',
                                    type:'bar',
                                    data:[1000,2000,1500,3000,2000,1200,800]
                                  }
                                ]
                            }
                            var myChart;
                            if(otherObj.state=="leftAdd"){
                                myChart = echarts.init(document.getElementById(id)); 
                                myChart.setOption(tempOption); 
                                store.dispatch(addCptOptionsList(chartId, tempOption))
                                /* fetch(`http://121.8.161.110:8082/service/Thematic?request=GetSpecify&id=${otherObj.data.id}&user=public&password=public123`)
                                .then(response => response.json())
                                .then(function (result) {
                                    if(result&&result[0]){
                                        a = new window.dmapgl.commonlyCharts(id, {
                                            data: result
                                        });
                                        store.dispatch(addCptOptionsList(chartId, result))
                                    }
                                 }).catch(e => console.log("error", e)); */
                            }else{
                                // a = new window.dmapgl.commonlyCharts(id, {
                                //     data: data
                                // });
                                myChart = echarts.init(document.getElementById(id)); 
                                myChart.setOption(tempOption); 
                                store.dispatch(addCptOptionsList(chartId, tempOption))
                            }
                           
                        }
                        arr.push(id);
                        mapObjArr.push({
                            layerId: id,
                            layerMap: map
                        });
                        window.arr = arr;
                        window.mapObjArr = mapObjArr;
                    // })
                    // .catch(e => console.log("error", e));
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
                        window.echarts.getInstanceById(e_instance).resize();
                    }
                } else if (layerType == "map"||layerType=="chartMap") {
                    let tempMapObjArrs = window.mapObjArr;
                    tempMapObjArrs.forEach(item => {
                        if (item.layerId == id) {
                            if (chartState == "update") {
                                
                            } else {
                                item.layerMap.resize();
                            }
        
                        }
                    });
                }     
            }else{
                
            }
        }
}




export function saveChartsOption(OptionId,cptOptions){
            let layerType = "chart";
            var a;
            if(layerType=="text"||layerType=="border"||layerType=="iframe"){
                let tempSaveObj = {};
                if(layerType=="border"){
                    
                }else if(layerType=="text"){
                   
                }else if(layerType=="iframe"){
                   
                }
            }else if(layerType=="chart"||layerType=="map"||layerType=="chartMap"){
                        //将当前的图表数据保存起来
                        if (layerType == "map"||layerType=="chartMap") {
                           
                        } else if (layerType == "chart") {
                               
                           
                        }
            }else{
                
            }
         
}