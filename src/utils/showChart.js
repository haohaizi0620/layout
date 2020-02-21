/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-20 10:01:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
const chartData = require('../datasource/chartDatas.json');
/**
 * @description: 创建一个对应的图表
 * @param  {String} chartName 图标的拼音首字母小写
 * @param  {Number} id 生成的图表对应的当前时间戳的id
 * @param  {Layout} _this  代表layout组件的this
 * @param  {String} chartState 代表当前图表是改变数据还是不改变数据   noUpdate不改变数据   update 改变数据
 * @return:  正常添加一个图表,否则就是移动位置改变大小，如果没有找到当前图表对应的接口id直接返回
 */
export function chartOption(chartName, id,cptOptions) {
    let layerType = "chart";
    let chartId = 101;
    chartData.map(item => {
        if (item.id == chartName) {
            layerType = item.layerType;
            chartId = item.chartId;
        }
    })
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
                           new window.dmapgl.commonlyCharts(id, {
                                data: cptOptions.layerOption
                            });
                        }
            }else{
                
            }
        
}