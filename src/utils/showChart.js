/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-24 10:57:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
/**
 * @description: 创建一个对应的图表
 * @param  {String} chartName 图标的拼音首字母小写
 * @param  {Number} id 生成的图表对应的当前时间戳的id
 * @param  {Layout} _this  代表layout组件的this
 * @param  {String} chartState 代表当前图表是改变数据还是不改变数据   noUpdate不改变数据   update 改变数据
 * @return:  正常添加一个图表,否则就是移动位置改变大小，如果没有找到当前图表对应的接口id直接返回
 */
export function saveChartsOption(chartName, id,cptOptions) {
    
    let layerType = "chart";
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
                            fetch(`http://121.8.161.110:8082/service/Thematic?request=GetSpecify&id=${cptOptions.id}&user=testV4&password=testV4123`)
                                    .then(response => response.json())
                                    .then(function (data) {
                                        if(data&&data[0]){
                                            new window.dmapgl.commonlyCharts(id, {
                                                data: data
                                            });
                                        }
                                     }).catch(e => console.log("error", e));
                           
                        }
            }else{
                
            }
        
}